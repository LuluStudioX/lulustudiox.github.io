document.addEventListener('DOMContentLoaded', function () {
  // Log when the JavaScript file is loaded
  console.log("JavaScript file 'svs-calculator.js' loaded.");

  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedTab = tab.getAttribute('data-tab');
      contents.forEach((content) => {
        content.style.display = content.id === selectedTab ? 'block' : 'none';
      });

      // Update active tab styling
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Optionally, you can initialize calculations for the selected tab here
      // initCalculationsForTab(selectedTab);

      // Update total points in the dashboard
      updateTotalPoints();
    });
  });

  // Show the dashboard by default
  document.getElementById('dashboard').style.display = 'block';

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

// Log when styles are loaded
console.log("Stylesheet 'svs_styles.css' loaded.");
