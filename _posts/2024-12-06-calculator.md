---
layout: post
title: "Troop Training Cost Calculator"
date: 2024-12-06
categories: [WhiteoutSurvival, Tools, Calculator]
tags: [troops calculator]
toc: false
---

<div class="calculator-container">
   <form id="calculatorForm">
      <div class="label-row">
         <div class="input-group">
            <label for="trainingSpeed">Training Speed:</label>
            <input type="number" id="trainingSpeed" step="0.01" required>
         </div>
         <div class="input-group">
            <label for="trainingCapacity">Training Capacity:</label>
            <input type="number" id="trainingCapacity" required>
         </div>
      </div>

      <!-- Buffs Section -->
      <div class="label-row">
         <button type="button" id="toggleBuffs">Select Buffs</button>
      </div>
      

      <!-- Popup for Buff Selection -->
      <div id="buffsPopup" style="display:none;" class="buffs-popup">
        <h3>Select Buffs</h3>
        <!-- Existing buff options -->
        <div class="buff-option">
            <input type="checkbox" id="growthSkill">
            <label for="growthSkill">Growth Skill (200% Speed & Capacity)</label>
        </div>
        <div class="buff-option">
            <input type="checkbox" id="presidentSkill">
            <label for="presidentSkill">President Skill (30% speed)</label>
        </div>
        <div class="buff-option">
            <input type="checkbox" id="vicePresidentSkill">
            <label for="vicePresidentSkill">Vice President (15% speed)</label>
        </div>
        <div class="buff-option">
            <input type="checkbox" id="ministerOfEducation">
            <label for="ministerOfEducation">Minister of Education (75% speed, +200 capacity)</label>
        </div>
        <!-- New custom buff section -->
        <div class="buff-option custom-buff">
            <input type="checkbox" id="customBuff">
            <label for="customBuff">Custom Buff</label>
            <div class="custom-buff-inputs" style="display:none;">
                <input type="number" id="customSpeedBuff" placeholder="Speed %" min="0">
                <input type="number" id="customCapacityBuff" placeholder="Capacity" min="0">
            </div>
        </div>
        <button type="button" id="submitBuffs">Submit Selection</button>
      </div>

      <div class="label-row">
         <div class="input-group">
            <label for="troopType">Troop Type:</label>
            <div class="custom-select">
               <select id="troopType" required>
                  <option value="infantry">Infantry</option>
                  <option value="lancer">Lancer</option>
                  <option value="marksmen">Marksmen</option>
               </select>
            </div>
         </div>

         <div class="input-group">
            <label for="troopTier">Troop Tier:</label>
            <div class="custom-select">
               <select id="troopTier" required>
                  <!-- Options will be populated dynamically -->
               </select>
            </div>
         </div>
      </div>

      <div class="label-row">
         <label for="wantedTroops">Wanted Troops:</label>
         <input type="number" id="wantedTroops" required>
      </div>

      <button type="submit">Calculate</button>
   </form>

   <!-- Results displayed here -->
   <div id="results" style="display:none;" class="results"></div>
</div>

<link rel="stylesheet" href="{{ '/assets/css/troops_calculator.css' | relative_url }}">
<script src="{{ '/assets/js/calculator.js' | relative_url }}"></script>