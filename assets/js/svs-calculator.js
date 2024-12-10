document.addEventListener('DOMContentLoaded', function () {
  // Log when the JavaScript file is loaded
  console.log("JavaScript file 'svs-calculator.js' loaded.");

  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  // Function to show the selected tab
  function showTab(selectedTab) {
    contents.forEach((content) => {
      content.style.display = content.id === selectedTab ? 'block' : 'none';
    });

    // Update active tab styling
    tabs.forEach((t) => t.classList.remove('active'));
    const activeTab = Array.from(tabs).find(
      (t) => t.getAttribute('data-tab') === selectedTab
    );
    if (activeTab) {
      activeTab.classList.add('active');
    }
  }

  // Load the active tab from localStorage
  const activeTab = localStorage.getItem('activeTab') || 'dashboard';
  showTab(activeTab);

  // Add click event listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedTab = tab.getAttribute('data-tab');
      showTab(selectedTab);
      // Save the active tab in localStorage
      localStorage.setItem('activeTab', selectedTab);
      // Update total points in the dashboard
      updateTotalPoints();
    });
  });

  // Show the dashboard by default if no active tab is set
  if (!localStorage.getItem('activeTab')) {
    showTab('dashboard');
  }

  function updateTotalPoints() {
    const day1Points = parseInt(
      document.getElementById('day1Points').innerText
    );
    const day2Points = parseInt(
      document.getElementById('day2Points').innerText
    );
    const day3Points = parseInt(
      document.getElementById('day3Points').innerText
    );
    const day4Points = parseInt(
      document.getElementById('day4Points').innerText
    );
    const day5Points = parseInt(
      document.getElementById('day5Points').innerText
    );

    const total =
      day1Points + day2Points + day3Points + day4Points + day5Points;
    document.getElementById('totalPoints').innerText = total;

    // Log the updated total points
    console.log('Total Points updated:', total);
  }
});
