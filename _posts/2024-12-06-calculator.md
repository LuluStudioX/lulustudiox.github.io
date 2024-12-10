---
layout: post
title: "Troop Training Cost Calculator"
date: 2024-12-06
categories: [Tools, Calculator]
---

<script src="{{ '/assets/calculator/trainingcalculator.js' | relative_url }}"></script>
<!-- <link rel="stylesheet" href="{{ '/assets/calculator_styles.scss' | relative_url }}"> -->
<link rel="stylesheet" href="{{ '/assets/css/styles.css' | relative_url }}">



<div class="form-container">
  <h1>Troop Training Calculator</h1>
  <form id="troopTrainingForm">

    <!-- Row 1 -->
    <div class="form-row">
      <div>
        <label for="troopTypeSelect">Troop Type</label>
        <select id="troopTypeSelect">
          <option value="infantry">Infantry</option>
          <option value="lancers">Lancers</option>
          <option value="marksmen">Marksmen</option>
        </select>
      </div>
      <div>
        <label for="tierSelect">Troop Tier</label>
        <select id="tierSelect">
          <!-- Dynamically populated using JS -->
        </select>
      </div>
      <div>
        <label for="buffs">Buffs</label>
        <select id="buffs" multiple>
          <option value="vp">Vice President (70% Speed, 200 Capacity)</option>
          <option value="minister">Minister of Education (75% Speed, 300 Capacity)</option>
        </select>
      </div>
    </div>

    <!-- Row 2 -->
    <div class="form-row">
      <div>
        <label for="trainingSpeed">Training Speed (%)</label>
        <input type="number" id="trainingSpeed" placeholder="Enter training speed">
      </div>
      <div>
        <label for="trainingCapacity">Training Capacity</label>
        <input type="number" id="trainingCapacity" placeholder="Enter capacity">
      </div>
    </div>

    <!-- Row 3 -->
    <div class="form-row">
      <div>
        <label for="troopsToTrain">Wanted Troops</label>
        <input type="number" id="troopsToTrain" placeholder="Enter troops to train">
      </div>
      <div>
        <label for="speedups">Speedups <span class="tooltip" title="Add total minutes of speedups.">(?)</span></label>
        <input type="number" id="speedups" placeholder="Enter speedups in minutes">
      </div>
    </div>

    <button id="calculateButton" type="button">Calculate</button>
    <button id="toggleResourcesBtn" type="button">See Resources Needed</button>

  </form>

  <div id="resource-container" class="hidden">
    <h3>Resource Details</h3>
    <div id="resourceDetails">No data available.</div>
  </div>

  <div id="result"></div>
</div>






