// // Wait for the DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", function() {
//     // Event listener for the resource toggle button
//     const toggleBtn = document.getElementById("toggleResourcesBtn");
//     if (toggleBtn) {
//         toggleBtn.addEventListener("click", toggleResources);
//     }

//     // Event listener for the calculate button
//     const calculateButton = document.getElementById('calculateButton');
//     if (calculateButton) {
//         calculateButton.addEventListener('click', function(event) {
//             event.preventDefault();
//             console.log("Button clicked!");
//             calculate(); // Call your calculation function
//         });
//     } else {
//         console.log("Button not found");
//     }

//     // Event listener for populating the tier dropdown with baseTimeData
//     const tierSelect = document.getElementById('tier');
//     if (tierSelect) {
//         baseTimeData.forEach(item => {
//             const option = document.createElement('option');
//             option.value = item.tier;
//             option.textContent = `Tier ${item.tier}`;
//             tierSelect.appendChild(option);
//         });
//     } else {
//         console.error('Dropdown with id "tier" not found');
//     }
// });




// // Fetch base time data
// async function fetchBaseTimeData() {
//     try {
//         const response = await fetch('/assets/calculator/data/base_time.json');
//         if (!response.ok) throw new Error('Failed to load base time data');
        
//         const baseTimeData = await response.json();
//         console.log('Base Time Data:', baseTimeData);
//         return baseTimeData;
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Fetch and populate dropdown for tiers and use the data elsewhere
// async function loadAndPopulateDropdown() {
//     try {
//         // Fetch the base time data once
//         const baseTimeData = await fetchBaseTimeData();

//         // Now use the baseTimeData to populate the dropdown
//         const tierSelect = document.getElementById('tier');
//         baseTimeData.forEach(item => {
//             const option = document.createElement('option');
//             option.value = item.tier;
//             option.textContent = `Tier ${item.tier}`;
//             tierSelect.appendChild(option);
//         });

//         // You can also use the baseTimeData for other purposes here
//         // For example, you can store the base time for each tier in an object or use it to calculate something else
//         console.log('Base Time for Tier 6:', baseTimeData.find(item => item.tier === 6)?.time); // Example usage

//     } catch (error) {
//         console.error('Error during data processing or dropdown population:', error);
//     }
// }

// // Call the function to load and populate the dropdown
// loadAndPopulateDropdown();

// async function fetchResourceCosts(troopType, tier, trainingLevel) {
//     let url = '';
    
//     // Determine which JSON file to load based on troop type
//     if (troopType === 'infantry') {
//         url = '/assets/calculator/data/infantry.json';
//     } else if (troopType === 'lancers') {
//         url = '/assets/calculator/data/lancers.json';
//     } else if (troopType === 'marksmen') {
//         url = '/assets/calculator/data/marksmen.json';
//     } else if (troopType === 't11') {
//         url = '/assets/calculator/data/t11_rss.json';
//     }

//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error(`Failed to load ${troopType} data`);
        
//         const troopData = await response.json();
//         console.log(troopData);  // Log the fetched data structure for debugging
        
//         // Handle troopData based on the expected format
//         if (troopType !== 't11') {
//             // If troopData is an array, we can use find to get the tier
//             if (Array.isArray(troopData)) {
//                 const tierData = troopData.find(item => item.tier === tier);
//                 if (!tierData) {
//                     console.error(`Tier ${tier} not found for troop type ${troopType}`);
//                     return null;
//                 }
//                 return tierData.resource_cost;
//             } else {
//                 console.error(`${troopType} data is not in expected array format`);
//                 return null;
//             }
//         } else {
//             // For T11, fetch the data based on the training level
//             const troopTypeData = troopData[troopType];
//             if (Array.isArray(troopTypeData)) {
//                 const levelData = troopTypeData.find(item => item.level === trainingLevel);
//                 if (!levelData) {
//                     console.error(`Level ${trainingLevel} not found for T11 ${troopType}`);
//                     return null;
//                 }
//                 return {
//                     meat: levelData.meat,
//                     wood: levelData.wood,
//                     coal: levelData.coal,
//                     iron: levelData.iron
//                 };
//             } else {
//                 console.error(`T11 data is not in expected array format`);
//                 return null;
//             }
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }




// // Step 1: Get Input Values
// function getInputValues() {
//     let troopsToTrain = parseInt(document.getElementById('troopsToTrain').value);
//     let trainingCapacity = parseInt(document.getElementById('trainingCapacity').value);
//     let tier = parseInt(document.getElementById('tier').value);
//     let capacityCityBonus = document.getElementById('capacityCityBonus').checked ? 2 : 1; // 2 for enabled, 1 for disabled
//     let presidentBonus = parseFloat(document.getElementById('presidentBonus').value) / 100;
//     let additionalBonus = parseFloat(document.getElementById('additionalBonus').value) / 100;
//     let trainingLevel = parseInt(document.getElementById('trainingLevel').value);
//     let troopType = document.getElementById('troopType').value;
//     let meat = parseInt(document.getElementById('meat').value);
//     let wood = parseInt(document.getElementById('wood').value);
//     let coal = parseInt(document.getElementById('coal').value);
//     let iron = parseInt(document.getElementById('iron').value);

//     // console.log('Input Values:', {
//     //     troopsToTrain,
//     //     trainingCapacity,
//     //     tier,
//     //     capacityCityBonus,
//     //     presidentBonus,
//     //     additionalBonus,
//     //     trainingLevel,
//     //     troopType,
//     //     meat,
//     //     wood,
//     //     coal,
//     //     iron
//     // });

//     return {
//         troopsToTrain,
//         trainingCapacity,
//         tier,
//         capacityCityBonus,
//         presidentBonus,
//         additionalBonus,
//         trainingLevel,
//         troopType,
//         meat,
//         wood,
//         coal,
//         iron
//     };
// }

// // Alternative Step 1
// // Get input values from the form
// // function getInputValues() {
// //     const form = document.getElementById('troopTrainingForm');
// //     const formData = new FormData(form);

// //     return {
// //         troopsToTrain: parseInt(formData.get('troopsToTrain')),
// //         trainingCapacity: parseInt(formData.get('trainingCapacity')),
// //         tier: parseInt(formData.get('tier')),
// //         capacityCityBonus: formData.has('capacityCityBonus') ? 1 : 0,
// //         presidentBonus: formData.has('presidentBonus') ? 1 : NaN,
// //         additionalBonus: parseFloat(formData.get('additionalBonus')),
// //         trainingLevel: parseInt(formData.get('trainingLevel')),
// //         troopType: formData.get('troopType'),
// //         meat: parseInt(formData.get('meat')),
// //         wood: parseInt(formData.get('wood')),
// //         coal: parseInt(formData.get('coal')),
// //         iron: parseInt(formData.get('iron'))
// //     };
// // }

// // Step 2: Calculate Total Training Speed (including bonuses)
// function calculateTrainingSpeed(capacityCityBonus, presidentBonus, additionalBonus) {
//     let baseTrainingSpeed = 100 / 100;  // Base speed is 100% for simplicity
//     let totalTrainingSpeed = baseTrainingSpeed * (1 + capacityCityBonus) * (1 + presidentBonus) * (1 + additionalBonus);

//     console.log('Calculated Total Training Speed:', totalTrainingSpeed);

//     return totalTrainingSpeed;
// }

// // Step 3: Training Multiplier (assumed modifier)
// function calculateTrainingMultiplier() {
//     let trainingMultiplier = 1 / (1 + 0.25);  // Assuming 0.25 as the input modifier
//     console.log('Training Multiplier:', trainingMultiplier);
//     return trainingMultiplier;
// }

// // Step 4: Max Capacity considering Capacity City Bonus
// function calculateMaxCapacity(trainingCapacity, capacityCityBonus) {
//     let maxCapacity = capacityCityBonus === 2 ? trainingCapacity * 3 : trainingCapacity;
//     console.log('Calculated Max Capacity:', maxCapacity);
//     return maxCapacity;
// }

// // Step 5: Base Time (from predefined base time data based on tier)
// async function getBaseTime(tier) {
//     const baseTimeData = await fetchBaseTimeData();

//     // Find the base time for the given tier
//     const baseTime = baseTimeData.find(item => item.tier === tier);
//     if (!baseTime) {
//         console.error(`Base time not found for tier ${tier}`);
//         return null;
//     }

//     console.log('Base Time for Tier', tier, ':', baseTime.time);
//     return baseTime.time;
// }

// // Step 6: Calculate Adjusted Resource Costs based on troop type and bonuses
// async function calculate() {
//     console.log('Starting Calculation of RSS Cost');
//     // Get input values from the form
//     const { troopsToTrain, trainingCapacity, tier, capacityCityBonus, presidentBonus, additionalBonus, trainingLevel, troopType, meat, wood, coal, iron } = getInputValues();

//     // Fetch the base time for the selected tier
//     const baseTime = await getBaseTime(tier);
//     if (!baseTime) return; // Stop if no base time is found

//     // Base cost calculation (adjust as necessary for your formula)
//     let baseCost = baseTime * troopsToTrain;
//     let adjustedCost = baseCost * (1 + additionalBonus / 100);
//     // Log the results for debugging
//     console.log('Base Cost:', baseCost);
//     console.log('Adjusted Cost:', adjustedCost);

//     // Display the results (modify as needed)
//     displayResults(troopsToTrain, baseCost, adjustedCost);
// }

// // function calculateAdjustedCosts(baseCost, cityBonus, presBonus, addBonus) {
// //     let adjustedCost = baseCost;
// //     if (cityBonus === 2) adjustedCost *= 0.95; // 5% discount for city bonus
// //     if (presBonus) adjustedCost *= 0.90; // 10% discount for president bonus
// //     adjustedCost *= (1 + addBonus); // Apply additional bonus
// //     console.log('Adjusted Cost:', adjustedCost);
// //     return adjustedCost;
// // }

// // Step 7: Display Results
// // function displayResults(troopsToTrain, totalTrainingSpeed, trainingMultiplier, maxCapacity, baseTime, adjustedCost) {
// //     let resultsDiv = document.getElementById('results');
// //     resultsDiv.innerHTML = `
// //         <p><strong>Total Training Speed:</strong> ${Math.round(totalTrainingSpeed * 100)}%</p>
// //         <p><strong>Training Multiplier:</strong> ${trainingMultiplier.toFixed(2)}</p>
// //         <p><strong>Max Capacity:</strong> ${maxCapacity}</p>
// //         <p><strong>Base Time for Tier ${tier}:</strong> ${baseTime} hours</p>
// //         <p><strong>Adjusted Cost for ${troopsToTrain} Troops:</strong> ${adjustedCost}</p>
// //     `;
// //     console.log('Results Displayed:', {
// //         TotalTrainingSpeed: Math.round(totalTrainingSpeed * 100),
// //         TrainingMultiplier: trainingMultiplier.toFixed(2),
// //         MaxCapacity: maxCapacity,
// //         BaseTime: baseTime,
// //         AdjustedCost: adjustedCost
// //     });
// // }

// function displayResults(troopsToTrain, baseTime, totalTrainingSpeed, baseCost, adjustedCost, maxCapacity) {
//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = `
//         <p><strong>Troops to Train:</strong> ${troopsToTrain}</p>
//         <p><strong>Base Time for Tier (minutes):</strong> ${baseTime}</p>
//         <p><strong>Total Training Speed:</strong> ${totalTrainingSpeed}</p>
//         <p><strong>Max Capacity:</strong> ${maxCapacity}</p>
//         <p><strong>Base Cost:</strong> ${baseCost}</p>
//         <p><strong>Adjusted Cost (with Bonuses):</strong> ${adjustedCost}</p>
//     `;
// }

// // Function to Toggle Resource Details Visibility
// function toggleResources() {
//     const resourceContainer = document.getElementById("resource-container");
//     if (resourceContainer.classList.contains("hidden")) {
//         resourceContainer.classList.remove("hidden");
        
//         // Fetch resources based on selected troop type and tier
//         const troopType = document.getElementById("troopTypeSelect").value;  // Get selected troop type
//         const tier = parseInt(document.getElementById("tierSelect").value);  // Get selected tier
        
//         // Fetch and display the resources
//         fetchResources(troopType, tier);
//     } else {
//         resourceContainer.classList.add("hidden"); // Hide the container
//     }
// }

// // Fetch resources needed based on troop type and tier
// function fetchResources(troopType, tier) {
//     // Path to the JSON files based on troop type
//     const jsonFiles = {
//         infantry: 'assets/calculator/data/infantry.json',
//         lancers: 'assets/calculator/data/lancers.json',
//         marksmen: 'assets/calculator/data/marksmen.json',
//     };

//     // Fetch the corresponding JSON file
//     fetch(jsonFiles[troopType])
//         .then(response => response.json())
//         .then(data => {
//             // Find the resource data for the selected tier
//             const troopData = data[troopType].find(item => item.tier === tier);
            
//             if (troopData) {
//                 const resources = troopData.resource_cost;
//                 displayResources(resources);
//             } else {
//                 // If no data found for that tier
//                 document.getElementById("resourceDetails").innerHTML = "No data available for this tier.";
//             }
//         })
//         .catch(error => {
//             console.error("Error fetching resources:", error);
//             document.getElementById("resourceDetails").innerHTML = "Failed to load resource data.";
//         });
// }

// // Display the resource details in the resource container
// function displayResources(resources) {
//     let resourceHTML = `
//         <p>Meat: ${resources.meat}</p>
//         <p>Wood: ${resources.wood}</p>
//         <p>Coal: ${resources.coal}</p>
//         <p>Iron: ${resources.iron}</p>
//     `;
//     // Insert the resource data into the 'resourceDetails' div
//     document.getElementById("resourceDetails").innerHTML = resourceHTML;
// }




// // // Main Calculate Function
// // function calculate() {
// //     console.log('Starting Calculation...');

// //     // Step 1: Get input values
// //     const {
// //         troopsToTrain,
// //         trainingCapacity,
// //         tier,
// //         capacityCityBonus,
// //         presidentBonus,
// //         additionalBonus,
// //         trainingLevel,
// //         troopType,
// //         meat,
// //         wood,
// //         coal,
// //         iron
// //     } = getInputValues();

// //     // Step 2: Calculate total training speed
// //     let totalTrainingSpeed = calculateTrainingSpeed(capacityCityBonus, presidentBonus, additionalBonus);

// //     // Step 3: Training multiplier
// //     let trainingMultiplier = calculateTrainingMultiplier();

// //     // Step 4: Max capacity
// //     let maxCapacity = calculateMaxCapacity(trainingCapacity, capacityCityBonus);

// //     // Step 5: Base time for the tier
// //     let baseTime = getBaseTime(tier);

// //     // Step 6: Adjusted resource costs based on selected troop type and bonuses
// //  //   let baseCost = calculateBaseCost(troopsToTrain, tier, troopType);
// //  //   let adjustedCost = calculateAdjustedCosts(baseCost, capacityCityBonus, presidentBonus, additionalBonus);

// //     // Step 7: Display the results
// //     displayResults(troopsToTrain, totalTrainingSpeed, trainingMultiplier, maxCapacity, baseTime, adjustedCost);

// //     console.log('Calculation Complete.');
// // }























// document.addEventListener("DOMContentLoaded", async function() {
//     // Wait for base time data to be fetched
//     const baseTimeData = await fetchBaseTimeData();
//     if (!baseTimeData) return;

//     // Initialize dropdown with fetched data
//     const tierSelect = document.getElementById('tier');
//     if (tierSelect) {
//         baseTimeData.forEach(item => {
//             const option = document.createElement('option');
//             option.value = item.tier;
//             option.textContent = `Tier ${item.tier}`;
//             tierSelect.appendChild(option);
//         });
//     }

//     // Event listener for the resource toggle button
//     const toggleBtn = document.getElementById("toggleResourcesBtn");
//     if (toggleBtn) {
//         toggleBtn.addEventListener("click", toggleResources);
//     }

//     // Event listener for the calculate button
//     const calculateButton = document.getElementById('calculateButton');
//     if (calculateButton) {
//         calculateButton.addEventListener('click', async function(event) {
//             event.preventDefault();
//             console.log("Button clicked!");
//             await calculate(); // Call your async calculation function
//         });
//     }
// });

// // Fetch base time data
// async function fetchBaseTimeData() {
//     try {
//         const response = await fetch('/assets/calculator/data/base_time.json');
//         if (!response.ok) throw new Error('Failed to load base time data');
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// // Step 1: Get Input Values
// function getInputValues() {
//     return {
//         troopsToTrain: parseInt(document.getElementById('troopsToTrain').value),
//         trainingCapacity: parseInt(document.getElementById('trainingCapacity').value),
//         tier: parseInt(document.getElementById('tier').value),
//         capacityCityBonus: document.getElementById('capacityCityBonus').checked ? 2 : 1,
//         presidentBonus: parseFloat(document.getElementById('presidentBonus').value) / 100,
//         additionalBonus: parseFloat(document.getElementById('additionalBonus').value) / 100,
//         trainingLevel: parseInt(document.getElementById('trainingLevel').value),
//         troopType: document.getElementById('troopType').value,
//         meat: parseInt(document.getElementById('meat').value),
//         wood: parseInt(document.getElementById('wood').value),
//         coal: parseInt(document.getElementById('coal').value),
//         iron: parseInt(document.getElementById('iron').value)
//     };
// }

// // Fetch resources needed based on troop type and tier
// async function fetchResources(troopType, tier) {
//     const jsonFiles = {
//         infantry: '/assets/calculator/data/infantry.json',
//         lancers: '/assets/calculator/data/lancers.json',
//         marksmen: '/assets/calculator/data/marksmen.json',
//     };

//     try {
//         const response = await fetch(jsonFiles[troopType]);
//         const data = await response.json();
//         const troopData = data.find(item => item.tier === tier);

//         if (troopData) {
//             const resources = troopData.resource_cost;
//             displayResources(resources);
//         } else {
//             console.error('No data available for this tier');
//             document.getElementById("resourceDetails").innerHTML = "No data available for this tier.";
//         }
//     } catch (error) {
//         console.error("Error fetching resources:", error);
//         document.getElementById("resourceDetails").innerHTML = "Failed to load resource data.";
//     }
// }

// // Display the resource details in the resource container
// function displayResources(resources) {
//     const resourceHTML = `
//         <p>Meat: ${resources.meat}</p>
//         <p>Wood: ${resources.wood}</p>
//         <p>Coal: ${resources.coal}</p>
//         <p>Iron: ${resources.iron}</p>
//     `;
//     document.getElementById("resourceDetails").innerHTML = resourceHTML;
// }

// // Function to Toggle Resource Details Visibility
// function toggleResources() {
//     const resourceContainer = document.getElementById("resource-container");
//     if (resourceContainer.classList.contains("hidden")) {
//         resourceContainer.classList.remove("hidden");
        
//         // Fetch resources based on selected troop type and tier
//         const troopType = document.getElementById("troopTypeSelect").value;
//         const tier = parseInt(document.getElementById("tierSelect").value);
        
//         fetchResources(troopType, tier);
//     } else {
//         resourceContainer.classList.add("hidden");
//     }
// }

// // Main Calculation Logic
// async function calculate() {
//     console.log('Starting Calculation...');
    
//     const { troopsToTrain, trainingCapacity, tier, capacityCityBonus, presidentBonus, additionalBonus, trainingLevel, troopType, meat, wood, coal, iron } = getInputValues();

//     const baseTime = await getBaseTime(tier);
//     if (!baseTime) return;

//     const totalTrainingSpeed = calculateTrainingSpeed(capacityCityBonus, presidentBonus, additionalBonus);
//     const trainingMultiplier = calculateTrainingMultiplier();
//     const maxCapacity = calculateMaxCapacity(trainingCapacity, capacityCityBonus);

//     const baseCost = baseTime * troopsToTrain;
//     const adjustedCost = baseCost * (1 + additionalBonus);

//     displayResults(troopsToTrain, baseTime, totalTrainingSpeed, baseCost, adjustedCost, maxCapacity);

//     console.log('Calculation Complete.');
// }

// // Calculate Total Training Speed
// function calculateTrainingSpeed(capacityCityBonus, presidentBonus, additionalBonus) {
//     const baseTrainingSpeed = 100 / 100;
//     return baseTrainingSpeed * (1 + capacityCityBonus) * (1 + presidentBonus) * (1 + additionalBonus);
// }

// // Calculate Training Multiplier (assumed modifier)
// function calculateTrainingMultiplier() {
//     return 1 / (1 + 0.25);  // Assuming 0.25 as the input modifier
// }

// // Calculate Max Capacity considering Capacity City Bonus
// function calculateMaxCapacity(trainingCapacity, capacityCityBonus) {
//     return capacityCityBonus === 2 ? trainingCapacity * 3 : trainingCapacity;
// }

// // Get Base Time from pre-fetched data
// async function getBaseTime(tier) {
//     const baseTimeData = await fetchBaseTimeData();
//     const baseTime = baseTimeData.find(item => item.tier === tier);
//     return baseTime ? baseTime.time : null;
// }

// // Display Results
// function displayResults(troopsToTrain, baseTime, totalTrainingSpeed, baseCost, adjustedCost, maxCapacity) {
//     const resultDiv = document.getElementById('result');
//     resultDiv.innerHTML = `
//         <p><strong>Troops to Train:</strong> ${troopsToTrain}</p>
//         <p><strong>Base Time for Tier (minutes):</strong> ${baseTime}</p>
//         <p><strong>Total Training Speed:</strong> ${totalTrainingSpeed}</p>
//         <p><strong>Max Capacity:</strong> ${maxCapacity}</p>
//         <p><strong>Base Cost:</strong> ${baseCost}</p>
//         <p><strong>Adjusted Cost (with Bonuses):</strong> ${adjustedCost}</p>
//     `;
// }






















document.addEventListener("DOMContentLoaded", async function () {
    // Populate troop tiers dynamically
    const baseTimeData = await fetchBaseTimeData();
    if (!baseTimeData) {
        console.error("Base time data not found. Tier dropdown will not be populated.");
        return;
    }

    const tierSelect = document.getElementById('tierSelect');
    populateTierDropdown(baseTimeData, tierSelect);

    // Event listener for Calculate button
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', async () => {
        await calculate(baseTimeData); // Pass baseTimeData to avoid refetching
    });

    // Event listener for Resource toggle button
    const toggleResourcesBtn = document.getElementById('toggleResourcesBtn');
    toggleResourcesBtn.addEventListener('click', toggleResources);
});

// Fetch base time data from JSON
async function fetchBaseTimeData() {
    try {
        const response = await fetch('/assets/calculator/data/base_time.json');
        if (!response.ok) throw new Error("Failed to fetch base time data.");
        return await response.json();
    } catch (error) {
        console.error("Error fetching base time data:", error);
        return null;
    }
}

// Populate tier dropdown based on fetched data
function populateTierDropdown(baseTimeData, dropdown) {
    baseTimeData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.tier;
        option.textContent = `Tier ${item.tier}`;
        dropdown.appendChild(option);
    });
}

// Toggle resource details visibility
function toggleResources() {
    const resourceContainer = document.getElementById("resource-container");
    const troopType = document.getElementById("troopTypeSelect").value;
    const tier = parseInt(document.getElementById("tierSelect").value);

    if (resourceContainer.classList.contains("hidden")) {
        resourceContainer.classList.remove("hidden");
        fetchResources(troopType, tier);
    } else {
        resourceContainer.classList.add("hidden");
    }
}

// Fetch resources based on troop type and tier
async function fetchResources(troopType, tier) {
    const jsonFiles = {
        infantry: '/assets/calculator/data/infantry.json',
        lancers: '/assets/calculator/data/lancers.json',
        marksmen: '/assets/calculator/data/marksmen.json',
    };

    try {
        const response = await fetch(jsonFiles[troopType]);
        const data = await response.json();
        const troopData = data.find(item => item.tier === tier);

        if (troopData) {
            displayResources(troopData.resource_cost);
        } else {
            console.error("No data available for the selected tier.");
            document.getElementById("resourceDetails").textContent = "No data available for the selected tier.";
        }
    } catch (error) {
        console.error("Error fetching resources:", error);
        document.getElementById("resourceDetails").textContent = "Failed to fetch resources.";
    }
}

// Display resource details
function displayResources(resources) {
    const resourceHTML = `
        <p>Meat: ${resources.meat}</p>
        <p>Wood: ${resources.wood}</p>
        <p>Coal: ${resources.coal}</p>
        <p>Iron: ${resources.iron}</p>
    `;
    document.getElementById("resourceDetails").innerHTML = resourceHTML;
}

// Calculate training stats
async function calculate(baseTimeData) {
    const tier = parseInt(document.getElementById('tierSelect').value);
    const troopType = document.getElementById('troopTypeSelect').value;
    const troopsToTrain = parseInt(document.getElementById('troopsToTrain').value);
    const trainingCapacity = parseInt(document.getElementById('trainingCapacity').value);

    const tierData = baseTimeData.find(item => item.tier === tier);
    if (!tierData) {
        console.error("No base time data found for the selected tier.");
        return;
    }

    const baseTime = tierData.time;
    const trainingSpeed = parseInt(document.getElementById('trainingSpeed').value) / 100 || 1;

    const totalTime = (baseTime / trainingSpeed) * troopsToTrain;
    const capacityMultiplier = calculateCapacityMultiplier();

    displayResults(troopsToTrain, baseTime, trainingSpeed, totalTime, capacityMultiplier);
}

// Calculate capacity multiplier based on buffs
function calculateCapacityMultiplier() {
    const buffs = Array.from(document.getElementById('buffs').selectedOptions).map(opt => opt.value);

    if (buffs.includes('vp')) {
        return 200;
    } else if (buffs.includes('minister')) {
        return 300;
    }
    return 100; // Default multiplier
}

// Display calculation results
function displayResults(troopsToTrain, baseTime, trainingSpeed, totalTime, capacityMultiplier) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Troops to Train:</strong> ${troopsToTrain}</p>
        <p><strong>Base Time per Troop:</strong> ${baseTime} minutes</p>
        <p><strong>Training Speed Multiplier:</strong> ${trainingSpeed}</p>
        <p><strong>Total Time:</strong> ${totalTime.toFixed(2)} minutes</p>
        <p><strong>Capacity Multiplier:</strong> ${capacityMultiplier}</p>
    `;
}
