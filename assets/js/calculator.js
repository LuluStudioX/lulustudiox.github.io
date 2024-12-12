document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculatorForm');
    const results = document.getElementById('results');
    const troopTierSelect = document.getElementById('troopTier');
    const toggleBuffsButton = document.getElementById('toggleBuffs');
    const buffsPopup = document.getElementById('buffsPopup');
    const submitBuffsButton = document.getElementById('submitBuffs');
    const closeBuffsButton = document.getElementById('closeBuffsPopup');
    const selectedBuffsDisplay = toggleBuffsButton;

    let rawResourceValues = {};
    let selectedBuffs = [];

    // Function to set a cookie
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    // Function to get a cookie
    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    }

    // Load saved values from cookies
    const savedTrainingSpeed = getCookie('trainingSpeed');
    const savedTrainingCapacity = getCookie('trainingCapacity');
    const savedWantedTroops = getCookie('wantedTroops');

    if (savedTrainingSpeed) document.getElementById('trainingSpeed').value = savedTrainingSpeed;
    if (savedTrainingCapacity) document.getElementById('trainingCapacity').value = savedTrainingCapacity;
    if (savedWantedTroops) document.getElementById('wantedTroops').value = savedWantedTroops;

    // Fetch JSON data
    const baseTimePromise = fetch('/assets/data/woc_base_data/base_time.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching base_time.json:', error));
    
    const infantryPromise = fetch('/assets/data/woc_base_data/infantry.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching infantry.json:', error));
    
    const lancerPromise = fetch('/assets/data/woc_base_data/lancer.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching lancer.json:', error));
    
    const marksmenPromise = fetch('/assets/data/woc_base_data/marksmen.json')
      .then(response => response.json())
      .catch(error => console.error('Error fetching marksmen.json:', error));
    
    Promise.all([baseTimePromise, infantryPromise, lancerPromise, marksmenPromise])
        .then(([baseTimeData, infantryData, lancerData, marksmenData]) => {
            // Populate troop tier options
            if (Array.isArray(baseTimeData)) {
                baseTimeData.forEach(tier => {
                    const option = document.createElement('option');
                    option.value = tier.tier;
                    option.textContent = `Tier ${tier.tier}`;
                    troopTierSelect.appendChild(option);
                });
            } else {
                console.error('baseTimeData is not an array:', baseTimeData);
            }
            
            // Initialize custom dropdowns
            initCustomDropdowns();
            
            // Setup mutually exclusive buffs
            setupMutuallyExclusiveBuffs();
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form values
                const trainingSpeed = parseFloat(document.getElementById('trainingSpeed').value);
                const trainingCapacity = parseFloat(document.getElementById('trainingCapacity').value);
                const troopType = document.getElementById('troopType').value;
                const troopTier = parseInt(document.getElementById('troopTier').value);
                const wantedTroops = parseInt(document.getElementById('wantedTroops').value);

                // Save inputs to cookies
                setCookie('trainingSpeed', trainingSpeed, 30); // Save for 30 days
                setCookie('trainingCapacity', trainingCapacity, 30);
                setCookie('wantedTroops', wantedTroops, 30);

                // Calculate buffs based on selected options
                let speedBuffPercentage = 0;
                let capacityBuffPercentage = 0;
                let flatCapacityIncrease = 0;

                selectedBuffs.forEach(buff => {
                    if (buff.startsWith('Custom Buff')) {
                        const [speedBuff, capacityBuff] = buff.match(/\d+/g);
                        speedBuffPercentage += parseInt(speedBuff);
                        flatCapacityIncrease += parseInt(capacityBuff);
                    } else {
                        switch (buff) {
                            case 'Growth Skill':
                                speedBuffPercentage += 200;
                                capacityBuffPercentage += 200;
                                break;
                            case 'President Skill':
                                speedBuffPercentage += 30;
                                break;
                            case 'Vice President':
                                speedBuffPercentage += 15;
                                break;
                            case 'Minister of Education':
                                speedBuffPercentage += 75;
                                flatCapacityIncrease += 200;
                                break;
                        }
                    }
                });

                // Calculate effective training speed and capacity
                const totalSpeedPercentage = trainingSpeed + speedBuffPercentage;
                const effectiveTrainingCapacity = Math.max(trainingCapacity, 1) * (1 + capacityBuffPercentage / 100) + flatCapacityIncrease;

                // Calculate training multiplier and max capacity
                const trainingMultiplier = 1 / (1 + (totalSpeedPercentage / 100));
                const maxCapacity = Math.floor(effectiveTrainingCapacity);

                // Ensure wantedTroops is not less than maxCapacity
                const adjustedWantedTroops = Math.max(wantedTroops, maxCapacity);

                // Get base time for the selected tier
                const baseTime = baseTimeData.find(tier => tier.tier === troopTier).time;

                // Calculate total training time
                const totalTrainingSeconds = baseTime * trainingMultiplier * adjustedWantedTroops;

                // Format times
                const formatTime = seconds => {
                    const d = Math.floor(seconds / (3600*24));
                    const h = Math.floor(seconds % (3600*24) / 3600);
                    const m = Math.floor(seconds % 3600 / 60);
                    const s = Math.floor(seconds % 60);
                    return `${d}d ${h}h ${m}m ${s}s`;
                };
                
                const totalWantedTroopTimeFormatted = formatTime(totalTrainingSeconds);
                
                // Find resource costs
                let troopData;

                if (troopType === 'infantry') {
                    troopData = infantryData.infantry; 
                } else if (troopType === 'lancer') {
                    troopData = lancerData.lancer; 
                } else if (troopType === 'marksmen') {
                    troopData = marksmenData.marksmen; 
                }
                
                if (troopData) {
                    const resourceCost = troopData.find(t => t.tier === troopTier).resource_cost;
                    
                    rawResourceValues = {
                        meat: resourceCost.meat * adjustedWantedTroops,
                        wood: resourceCost.wood * adjustedWantedTroops,
                        coal: resourceCost.coal * adjustedWantedTroops,
                        iron: resourceCost.iron * adjustedWantedTroops
                    };
                    
                    // Calculate number of sessions needed
                    const sessionsNeeded = Math.ceil(adjustedWantedTroops / maxCapacity);

                    // Format resources with K/M notation
                    function formatNumber(num) {
                        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
                        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
                        return num.toString();
                    }

                    // Update results in #results section
                    results.innerHTML = `
                        You can train: <strong><i>${maxCapacity}</i></strong> <strong>${troopType.charAt(0).toUpperCase() + troopType.slice(1)}</strong> Tier <strong><i>${troopTier}</i></strong> per session.<br>
                        Training <strong><i>${adjustedWantedTroops}</i></strong> troops will take <strong><i>${totalWantedTroopTimeFormatted}</i></strong>.<br>
                        It will take <strong><i>${sessionsNeeded}</i></strong> Sessions and costs:<br>
                        🥩 ${formatNumber(rawResourceValues.meat)} | 🪵 ${formatNumber(rawResourceValues.wood)} | ⚒️ ${formatNumber(rawResourceValues.coal)} | 🪨 ${formatNumber(rawResourceValues.iron)}.
                    `;
                    
                    results.style.display = 'block';
                } else {
                    console.error('Troop data not found for type:', troopType);
                }
            });

            // Buff toggle functionality
            toggleBuffsButton.addEventListener('click', function(e) {
              e.preventDefault();
              if (buffsPopup.style.display === 'block') {
                  buffsPopup.style.display = 'none';
                  toggleBuffsButton.textContent = `Apply or Select Buffs`;
              } else {
                  buffsPopup.style.display = 'block';
                  toggleBuffsButton.textContent = `Close Buff Selection`;
              }
            });

            submitBuffsButton.addEventListener('click', function() {
                selectedBuffs.length = 0;

                document.querySelectorAll('.buff-option input[type=checkbox]').forEach(checkbox => {
                    if (checkbox.checked) {
                        if (checkbox.id === 'customBuff') {
                            const speedBuff = document.getElementById('customSpeedBuff').value;
                            const capacityBuff = document.getElementById('customCapacityBuff').value;
                            selectedBuffs.push(`Custom Buff (${speedBuff}% speed, +${capacityBuff} capacity)`);
                        } else {
                            selectedBuffs.push(checkbox.labels[0].innerText.split(" (")[0]);
                        }
                    }
                });

                updateSelectedBuffDisplay();
                buffsPopup.style.display = 'none';
            });

            closeBuffsButton.addEventListener('click', function() {
              buffsPopup.style.display = 'none';
            });

            function updateSelectedBuffDisplay() {
              if (selectedBuffs.length > 0) {
                  toggleBuffsButton.textContent = `${selectedBuffs.length} Buff(s) Applied: ${selectedBuffs.join(', ')}`;
              } else {
                  toggleBuffsButton.textContent = `Apply or Select Buffs`;
              }
            }

            // Custom buff checkbox event listener
            document.getElementById('customBuff').addEventListener('change', function() {
                const customBuffInputs = document.querySelector('.custom-buff-inputs');
                customBuffInputs.style.display = this.checked ? 'flex' : 'none';
            });
        })
        .catch(error => console.error('Error in Promise.all:', error));

    function initCustomDropdowns() {
        document.querySelectorAll('.custom-select select').forEach(select => {
            const wrapper = document.createElement('div');
            wrapper.className = 'select-wrapper';
            select.parentNode.insertBefore(wrapper, select);
            wrapper.appendChild(select);

            const customSelect = document.createElement('div');
            customSelect.className = 'select-selected';
            customSelect.textContent = select.options[select.selectedIndex].textContent;
            wrapper.appendChild(customSelect);

            const optionsList = document.createElement('div');
            optionsList.className = 'select-items select-hide';
            
            for (let option of select.options) {
                const optionItem = document.createElement('div');
                optionItem.textContent = option.textContent;
                optionItem.addEventListener('click', function() {
                    select.value = option.value;
                    customSelect.textContent = option.textContent;
                    this.parentNode.classList.add('select-hide');
                    select.dispatchEvent(new Event('change'));
                });
                optionsList.appendChild(optionItem);
            }
            
            wrapper.appendChild(optionsList);

            customSelect.addEventListener('click', function(e) {
                e.stopPropagation();
                this.nextSibling.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
        });

        document.addEventListener('click', closeAllSelect);
    }

    function closeAllSelect(elmnt) {
        const items = document.getElementsByClassName('select-items');
        const selected = document.getElementsByClassName('select-selected');
        for (let i = 0; i < selected.length; i++) {
            if (elmnt != selected[i]) {
                selected[i].classList.remove('select-arrow-active');
            }
        }
        for (let i=0; i<items.length; i++) { 
          if(elmnt != items[i]) { 
              items[i].classList.add("select-hide"); 
          } 
        }
    }

    function setupMutuallyExclusiveBuffs() {
        const vicePresidentSkillCheckbox =
          document.getElementById("vicePresidentSkill");
        const ministerOfEducationCheckbox =
          document.getElementById("ministerOfEducation");

        vicePresidentSkillCheckbox.addEventListener("change", function () {
          if (this.checked) ministerOfEducationCheckbox.checked=false; 
        });

        ministerOfEducationCheckbox.addEventListener("change", function () { 
          if(this.checked) vicePresidentSkillCheckbox.checked=false; 
        });
      }
});