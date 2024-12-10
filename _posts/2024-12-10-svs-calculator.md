---
layout: post
title: "SVS Calculator"
date: 2024-12-10
categories: [GameTools, Calculator]
tags: [svs calculator]
toc: false
---

<div class="calculator-container">
    <div class="tabs">
        <button class="tab-button" data-tab="dashboard">Dashboard</button>
        <button class="tab-button" data-tab="day1">Day 1</button>
        <button class="tab-button" data-tab="day2">Day 2</button>
        <button class="tab-button" data-tab="day3">Day 3</button>
        <button class="tab-button" data-tab="day4">Day 4</button>
        <button class="tab-button" data-tab="day5">Day 5</button>
    </div>

    <!-- Dashboard Tab -->
    <div id="dashboard" class="tab-content">
        <h2>Dashboard</h2>
        <div id="dashboardResults">
            <!-- Total Points -->
            <p>Total Points: <span id="totalPoints">0</span></p>
            <!-- Individual Points -->
            <p>Points per Day:</p>
            <ul id="pointsPerDay">
                <li>Day 1: <span id="day1Points">10</span></li> <!-- Random value -->
                <li>Day 2: <span id="day2Points">20</span></li> <!-- Random value -->
                <li>Day 3: <span id="day3Points">30</span></li> <!-- Random value -->
                <li>Day 4: <span id="day4Points">40</span></li> <!-- Random value -->
                <li>Day 5: <span id="day5Points">50</span></li> <!-- Random value -->
            </ul>
            <!-- Optional Stats -->
            <div id="optionalStats">
                <p>Power Increase: <span id="powerIncrease">N/A</span></p>
                <p>Stats Increase: <span id="statsIncrease">N/A</span></p>
            </div>
        </div>
        <!-- Export/Import Buttons -->
        <button id="exportData">Export Data</button>
        <input type="file" id="importData" accept=".json">
    </div>

    <!-- Day 1 Tab -->
    <div id="day1" class="tab-content">
        <h2>Day 1 Calculations</h2>
        <p>Total Day 1 Points: <span id="totalDay1Points">10</span></p>

        <!-- Chief Charms Calculator -->
        <div class="calculator-section">
            <h3>Chief Charms Calculator</h3>
            <div class="input-group">
                <label for="chiefCharm1">Chief Charm Item 1:</label>
                <input type="number" id="chiefCharm1" placeholder="Enter value for Charm 1">
            </div>
            <div class="input-group">
                <label for="chiefCharm2">Chief Charm Item 2:</label>
                <input type="number" id="chiefCharm2" placeholder="Enter value for Charm 2">
            </div>
            <div class="input-group">
                <label for="chiefCharm3">Chief Charm Item 3:</label>
                <input type="number" id="chiefCharm3" placeholder="Enter value for Charm 3">
            </div>

            <!-- Fire Crystal Calculator -->
            <h3>Fire Crystal Calculator</h3>
            <div class="input-group">
                <label for="fireCrystalBuilding1">Building 1:</label>
                <input type="number" id="fireCrystalBuilding1" placeholder="Enter value for Building 1">
            </div>

            <!-- Speedups Calculator -->
            <h3>Speedups Calculator</h3>
            <div class="input-group">
                <label for="constructionSpeedup">Construction Speedup:</label>
                <input type="number" id="constructionSpeedup" placeholder="Enter value for Construction Speedup">
            </div>
        </div>
    </div>

    <!-- Day 2 Tab -->
    <div id="day2" class="tab-content">
        <h2>Day 2 Calculations</h2>
        <p>Total Day 2 Points: <span id="totalDay2Points">20</span></p>

        <!-- Lucky Wheel Calculator -->
        <h3>Lucky Wheel Calculator</h3>
        <div class='input-group'>
            <label for='luckyWheelSpins'>Number of Spins:</label>
            <input type='number' id='luckyWheelSpins' placeholder='Enter number of spins'>
        </div>

        <!-- Fire Crystal Calculator (again) -->
        <h3>Fire Crystal Calculator (again)</h3>
        <!-- Repeat input fields as needed -->

        <!-- Gathering Calculator -->
        <h3>Gathering Calculator</h3>
        <!-- Input fields for gathering actions (4 times) -->
        
        <!-- Hero Shard Calculator -->
        <h3>Hero Shard Calculator</h3>
        <!-- Input fields for hero shards (19 heroes) -->
    </div>

    <!-- Day 3 Tab -->
    <div id='day3' class='tab-content'>
      <h2>Day 3 Calculations</h2>
      <p>Total Day 3 Points: <span id='totalDay3Points'>30</span></p>

      <!-- Lucky Wheel Calculator (again) -->
      <h3>Lucky Wheel Calculator (again)</h3>

      <!-- Beast Hunting Calculator -->
      <h3>Beast Hunting Calculator</h3>

      <!-- Chief Charms Calculator (again) -->
      <h3>Chief Charms Calculator (again)</h3>

      <!-- Hero Shard Calculator (again) -->
      <h3>Hero Shard Calculator (again)</h3>

      <!-- Pets Calculator -->
      <h3>Pets Calculator</h3>
    </div>

    <!-- Day 4 Tab -->
    <div id='day4' class='tab-content'>
       <h2>Day 4 Calculations</h2>
       <p>Total Day 4 Points: <span id='totalDay4Points'>40</span></p>

       <!-- Chief Charms Calculator (again) -->
       <h3>Chief Charms Calculator (again)</h3>

       <!-- Essence Stones Calculator -->
       <h3>Essence Stones Calculator</h3>

       <!-- Exclusive Hero Weapon Widgets Calculator -->
       <h3>Exclusive Hero Weapon Widgets Calculator</h3>

       <!-- Troop Training Calculator (reuse previous code) -->
       <h3>Troop Training Calculator (reuse previous code)</h3>

       <!-- Troop Promoting Calculator (reuse previous code) -->
       <h3>Troop Promoting Calculator (reuse previous code)</h3>
    </div>

    <!-- Day 5 Tab -->
     <div id='day5' class='tab-content'>
       <h2>Day 5 Calculations</h2>
       <p>Total Day 5 Points: <span id='totalDay5Points'>50</span></p>

       <!-- Essence Stones Calculator (again) -->
       <h3>Essence Stones Calculator (again)</h3>

       <!-- Fire Crystal Calculator (again) -->
       <h3>Fire Crystal Calculator (again)</h3>

       <!-- Exclusive Hero Weapon Widgets Calculator (again) -->
       <h3>Exclusive Hero Weapon Widgets Calculator (again)</h3>

       <!-- Speedups Calculator (again) -->
       <h3>Speedups Calculator (again)</h3>

       <!-- Chief Gear Calculator (6 gears available) -->
       <h3>Chief Gear Calculator (6 gears available)</h3>
     </div>


</div>
<link rel='stylesheet' href='{{ '/assets/css/svs_styles.css' | relative_url }}'>
<script src='{{ '/assets/js/svs-calculator.js' | relative_url }}'></script>



