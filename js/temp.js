const gridSize = 11;
let selectedElement = null;
let timeUnits = 28; // Start with 28 time units
const map = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
let currentSeasonIndex = 0;
let currentSeasonTotalPoints = 0;

const mountains = [
  { row: 2, column: 2 },
  { row: 4, column: 9 },
  { row: 6, column: 4 },
  { row: 9, column: 10 },
  { row: 10, column: 6 }
];

const seasonDurations = 7;
let currentTimeUnits = 0;

const seasonMissions = {
  'Spring': ['A', 'B'],
  'Summer': ['B', 'C'],
  'Autumn': ['C', 'D'],
  'Winter': ['D', 'A']
};

let seasonScores = {
  'Spring': { 'A': 0, 'B': 0, 'total': 0 },
  'Summer': { 'B': 0, 'C': 0, 'total': 0 },
  'Autumn': { 'C': 0, 'D': 0, 'total': 0 },
  'Winter': { 'D': 0, 'A': 0, 'total': 0 }
};



const missions = 
{
  "basic": [
    {
      "title": "Edge of the forest",
      "description": "You get one point for each forest field adjacent to the edge of your map."
    },
    {
      "title": "Sleepy valley",
      "description": "For every row with three forest fields, you get four points."
    },
    {
      "title": "Watering potatoes",
      "description": "You get two points for each water field adjacent to your farm fields."
    },
    {
      "title": "Borderlands",
      "description": "For each full row or column, you get six points."
    }
  ],
  "extra": [
    {
      "title": "Tree line",
      "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
    },
    {
      "title": "Watering canal",
      "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
    },
    {
      "title": "Wealthy town",
      "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
    },
    {
      "title": "Magicians' valley",
      "description": "You get three points for your water fields adjacent to your mountain fields."
    },
    {
      "title": "Empty site",
      "description": "You get two points for empty fields adjacent to your village fields."
    },
    {
      "title": "Terraced house",
      "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
    },
    {
      "title": "Odd numbered silos",
      "description": "For each of your odd numbered full columns you get 10 points."
    },
    {
      "title": "Rich countryside",
      "description": "For each row with at least five different terrain types, you will receive four points."
    }
  ],
}

const elements = [
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
  }
];

const selectedMissions = getRandomMissions(missions, 4);

mountains.forEach(mountain => {
  map[mountain.row - 1][mountain.column - 1] = 'mountain';
});

function getRandomMissions(missions, count) {
  const allMissions = [...missions.basic, ...missions.extra];
  const shuffledMissions = shuffleArray(allMissions);
  return shuffledMissions.slice(0, count);
}

function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function displayMissionImages(selectedMissions) {
  const missionImages = {
    "Edge of the forest": "img/EdgeOfTheForest.png",
    "Sleepy valley": "img/SleepyValley.png",
    "Watering potatoes": "img/WateringPotatoes.png",
    "Borderlands": "img/Borderlands.png",
    "Tree line": "img/TreeLine.png",
    "Watering canal": "img/WateringCanal.png",
    "Wealthy town": "img/WealthyTown.png",
    "Magicians' valley": "img/MagiciansValley.png",
    "Empty site": "img/EmptySite.png",
    "Terraced house": "img/RowOfHouses.png",
    "Odd numbered silos": "img/OddNumberedSilos.png",
    "Rich countryside": "img/RichCountryside.png"
  };

  selectedMissions.forEach((mission, index) => {
    const missionDiv = document.getElementById(`mission-${String.fromCharCode('a'.charCodeAt(0) + index)}`);
    missionDiv.style.backgroundImage = `url(${missionImages[mission.title]})`;
    missionDiv.title = mission.title;
  });
}

function updateCurrentSeasonLabel() {
  const currentSeasonLabel = document.getElementById('currentSeasonLabel');
  if (currentSeasonLabel) {
    currentSeasonLabel.textContent = `Current season: ${seasons[currentSeasonIndex]}`;
  }
}


function scoreEdgeOfTheForest(map) {
  let score = 0;
  // Loop through all rows
  map.forEach((row, rowIndex) => {
    // Loop through all columns in the current row
    row.forEach((cell, colIndex) => {
      // Check if the current cell is on the edge of the map
      if (rowIndex === 0 || rowIndex === map.length - 1 || colIndex === 0 || colIndex === row.length - 1) {
        // If the cell is a 'forest' type, increment the score
        if (cell === 'forest') {
          score += 1;
        }
      }
    });
  });
  return score; // Return the total score for Edge of the Forest mission
}

function scoreSleepyValley(map) {
  let score = 0;
  map.forEach(row => {
    const forestCount = row.filter(cell => cell === 'forest').length;
    if (forestCount === 3) {
      score += 4;
    }
  });
  return score;
}

function scoreWateringPotatoes(map) {
  let score = 0;
  // Loop through the entire map
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      // Check if the current cell is a 'water' field
      if (cell === 'water') {
        // Define the positions adjacent to the current 'water' field
        const adjacentPositions = [
          { row: rowIndex - 1, col: colIndex }, // Up
          { row: rowIndex + 1, col: colIndex }, // Down
          { row: rowIndex, col: colIndex - 1 }, // Left
          { row: rowIndex, col: colIndex + 1 }  // Right
        ];
        // Check if any of the adjacent positions have a 'farm' field
        const isAdjacentToFarm = adjacentPositions.some(pos =>
          // Check if the position is within the bounds of the map and is a 'farm' field
          map[pos.row] && map[pos.row][pos.col] === 'farm'
        );
        // If there's at least one 'farm' field adjacent to the 'water', add 2 points
        if (isAdjacentToFarm) {
          score += 2;
        }
      }
    });
  });
  // After checking all cells, return the total score for this mission
  return score;
}

function scoreBorderlands(map) {
  let score = 0;
  // Check rows for fullness
  map.forEach(row => {
    if (row.every(cell => cell !== 0)) { // If every cell in the row is not 0 (empty), it's a full row
      score += 6;
    }
  });
  // Check columns for fullness
  for (let colIndex = 0; colIndex < map[0].length; colIndex++) {
    let fullColumn = true; // Assume the column is full
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
      if (map[rowIndex][colIndex] === 0) { // If any cell in the column is 0 (empty), it's not full
        fullColumn = false;
        break;
      }
    }
    if (fullColumn) { // If after checking the entire column it's full, add 6 points
      score += 6;
    }
  }
  return score; // Return the total score for Borderlands mission
}


// Update the total score for the current season
function updateSeasonPoints(season, points) {
  const seasonPointsSpan = document.getElementById(season.toLowerCase()).querySelector('.points');
  if (seasonPointsSpan) {
    seasonPointsSpan.textContent = points;
  }
}

function updateTotalPoints(points) {
  const totalPointsElement = document.getElementById('totalPoints');
  if (totalPointsElement) {
    totalPointsElement.textContent = `Total: ${points} points`;
  }
}

function resetTotalPointsForNewSeason() {
  const totalPointsElement = document.getElementById('totalPoints');
  if (totalPointsElement) {
    totalPointsElement.textContent = 'Total: 0 points';
    // 新しいシーズンのスコアをリセットします
    const newSeason = seasons[currentSeasonIndex];
    seasonScores[newSeason] = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'total': 0 };
  } else {
    console.error('Element not found: totalPoints');
  }
}


function scoreTreeLine(map) {
  let maxLength = 0;

  // Iterate over each column to find the longest continuous vertical forest
  for (let col = 0; col < map[0].length; col++) {
    let currentLength = 0;
    for (let row = 0; row < map.length; row++) {
      // If the cell is a 'forest', increment the current length count
      if (map[row][col] === 'forest') {
        currentLength++;
        // If the current length is greater than the maximum length found so far, update it
        maxLength = Math.max(maxLength, currentLength);
      } else {
        // Reset current length count if the cell is not 'forest'
        currentLength = 0;
      }
    }
  }

  // The score is twice the length of the longest continuous vertical forest
  return maxLength * 2;
}

function scoreWateringCanal(map) {
  let score = 0;

  // Iterate through each column to check the number of 'farm' and 'water' fields
  for (let col = 0; col < map[0].length; col++) {
    let farmCount = 0;
    let waterCount = 0;
    for (let row = 0; row < map.length; row++) {
      // Count the number of 'farm' fields
      if (map[row][col] === 'farm') {
        farmCount++;
      }
      // Count the number of 'water' fields
      if (map[row][col] === 'water') {
        waterCount++;
      }
    }
    // If the counts are equal and greater than zero, add four points to the score
    if (farmCount === waterCount && farmCount > 0) {
      score += 4;
    }
  }

  // Return the total score for the "Watering canal" mission
  return score;
}

function scoreWealthyTown(map) {
  let score = 0;

  // Loop through each cell in the map
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      // Check if the cell is a 'town'
      if (cell === 'town') {
        const adjacentTypes = new Set();
        // Check all adjacent cells for different terrain types
        [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ].forEach(pos => {
          // Make sure the position is within the map boundaries
          if (pos.r >= 0 && pos.r < map.length && pos.c >= 0 && pos.c < map[0].length) {
            const adjacentCell = map[pos.r][pos.c];
            // Ignore empty cells and mountains for the terrain type count
            if (adjacentCell && adjacentCell !== 'mountain' && adjacentCell !== 0) {
              adjacentTypes.add(adjacentCell);
            }
          }
        });
        // If there are at least three different terrain types adjacent, increment score
        if (adjacentTypes.size >= 3) score += 3;
      }
    });
  });

  // Return the total score for the "Wealthy town" mission
  return score;
}

function scoreMagiciansValley(map) {
  let score = 0;

  // Loop through each cell in the map
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      // Check if the cell is a 'water' field
      if (cell === 'water') {
        // Check all adjacent cells for mountains
        const adjacentPositions = [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ];
        // If any adjacent cell is a 'mountain', add points
        adjacentPositions.forEach(pos => {
          if (pos.r >= 0 && pos.r < map.length && pos.c >= 0 && pos.c < map[0].length && map[pos.r][pos.c] === 'mountain') {
            score += 3;
          }
        });
      }
    });
  });

  // Return the total score for "Magicians' valley"
  return score;
}

function scoreEmptySite(map) {
  let score = 0;

  // Loop through the map to check for empty fields adjacent to village fields
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      // Check if the cell is empty
      if (cell === 0) {
        // Define positions adjacent to the current cell
        const adjacentPositions = [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ];
        // Check if any adjacent cell is a village field
        const isAdjacentToVillage = adjacentPositions.some(pos =>
          map[pos.r] && map[pos.r][pos.c] === 'town'
        );
        // If adjacent to a village field, increment score
        if (isAdjacentToVillage) {
          score += 2;
        }
      }
    });
  });

  // Return the total score for "Empty site"
  return score;
}

function scoreTerracedHouse(map) {
  let score = 0;

  // Loop through each row to find the longest contiguous village fields horizontally
  map.forEach(row => {
    let currentLength = 0; // Length of the current contiguous village fields
    let maxLength = 0; // Maximum length found in this row

    row.forEach(cell => {
      if (cell === 'town') {
        currentLength++; // Increment length for contiguous village field
        maxLength = Math.max(maxLength, currentLength); // Update max length if current is longer
      } else {
        currentLength = 0; // Reset length if interruption found
      }
    });

    // Add points for the longest contiguous village fields in this row
    score += maxLength * 2;
  });

  return score; // Return the total score for "Terraced house"
}

function scoreOddNumberedSilos(map) {
  let score = 0;

  // Loop through each column
  for (let col = 0; col < map[0].length; col++) {
    // Check only odd numbered columns (1-indexed for user, 0-indexed internally)
    if ((col + 1) % 2 !== 0) {
      let isFullColumn = true;

      // Check if every cell in the column is filled and not a mountain
      for (let row = 0; row < map.length; row++) {
        if (map[row][col] === 0 || map[row][col] === 'mountain') {
          isFullColumn = false;
          break;
        }
      }

      // If the column is fully filled, add points
      if (isFullColumn) {
        score += 10;
      }
    }
  }

  return score; // Return the total score for "Odd numbered silos"
}

function scoreRichCountryside(map) {
  let score = 0;

  // Iterate over each row
  map.forEach(row => {
    // Create a set to store unique terrain types
    const terrainTypes = new Set();

    // Add each cell's content to the set if it's not '0' (empty) or 'mountain'
    row.forEach(cell => {
      if (cell !== 0 && cell !== 'mountain') {
        terrainTypes.add(cell);
      }
    });

    // If there are at least 5 unique terrain types, increment the score by 4
    if (terrainTypes.size >= 5) {
      score += 4;
    }
  });

  return score; // Return the total score for "Rich countryside"
}


function calculateMissionScores(map, selectedMissions) {
  const scores = {};
  selectedMissions.forEach(mission => {
    switch (mission.title) {
      case 'Edge of the forest':
        scores[mission.title] = scoreEdgeOfTheForest(map);
        break;
      case 'Sleepy valley':
        scores[mission.title] = scoreSleepyValley(map);
        break;
      case 'Watering potatoes':
        scores[mission.title] = scoreWateringPotatoes(map);
        break;
      case 'Borderlands':
        scores[mission.title] = scoreBorderlands(map);
        break;
      case 'Tree line':
        scores[mission.title] = scoreTreeLine(map);
        break;
      case 'Watering canal':
        scores[mission.title] = scoreWateringCanal(map);
        break;
      case 'Wealthy town':
        scores[mission.title] = scoreWealthyTown(map);
        break;
      case 'Magicians\' valley':
        scores[mission.title] = scoreMagiciansValley(map);
        break;
      case 'Empty site':
        scores[mission.title] = scoreEmptySite(map);
        break;
      case 'Terraced house':
        scores[mission.title] = scoreTerracedHouse(map);
        break;
      case 'Odd numbered silos':
        scores[mission.title] = scoreOddNumberedSilos(map);
        break;
      case 'Rich countryside':
        scores[mission.title] = scoreRichCountryside(map);
        break;
      default:
        console.error(`Scoring function for mission "${mission.title}" not found.`);
        break;
    }
  });
  return scores;
}


function calculateFinalScore() {
  // Sum the total scores from each season
  let finalScore = 0;
  for (const season in seasonScores) {
    finalScore += seasonScores[season].total;
  }
  return finalScore;
}

function displayMissionScores(scores) {
  const missionInfoDiv = document.getElementById('missionInfo');
  if (!missionInfoDiv) {
    console.error('Element not found: missionInfo');
    return;
  }

  // Clear previous mission scores
  missionInfoDiv.innerHTML = '';

  // Display scores for each mission
  for (const [mission, score] of Object.entries(scores)) {
    const missionDiv = document.createElement('div');
    missionDiv.textContent = `${mission}: ${score} points`;
    missionInfoDiv.appendChild(missionDiv);
  }
}
function rotateSelectedElement() {
  if (selectedElement) {
    selectedElement.shape = rotateShape(selectedElement.shape);
    selectedElement.rotation = (selectedElement.rotation + 90) % 360;
    displayNextElement(selectedElement);
  }
}

function mirrorSelectedElement() {
  if (selectedElement) {
    selectedElement.mirrored = !selectedElement.mirrored;
    selectedElement.shape = mirrorShape(selectedElement.shape);
    displayNextElement(selectedElement);
  }
}

document.getElementById('rotateButton').addEventListener('click', rotateSelectedElement);
document.getElementById('mirrorButton').addEventListener('click', mirrorSelectedElement);

function rotateShape(shape) {
  return shape.map((row, i) => row.map((val, j) => shape[shape.length - 1 - j][i]));
}

function mirrorShape(shape) {
  return shape.map(row => row.slice().reverse());
}

function isValidPlacement(map, elementShape, position) {
  for (let i = 0; i < elementShape.length; i++) {
    for (let j = 0; j < elementShape[i].length; j++) {
      if (elementShape[i][j] === 1) {
        let row = position.row + i;
        let col = position.column + j;
        if (row < 0 || row >= gridSize || col < 0 || col >= gridSize || map[row][col] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

function placeElement(map, element, position) {
  if (isValidPlacement(map, element.shape, position)) {
    for (let i = 0; i < element.shape.length; i++) {
      for (let j = 0; j < element.shape[i].length; j++) {
        if (element.shape[i][j] === 1) {
          map[position.row + i][position.column + j] = element.type;
        }
      }
    }
    // Deduct time units for placing the element
    timeUnits -= element.time;
    updateTimeUnitsDisplay();
    
    // After placing the element, calculate the mission scores
    const currentMissionScores = calculateMissionScores(map, selectedMissions);
    const pointsEarned = sumMissionScores(currentMissionScores);
    
    // Update the total points display with the points earned
    updateTotalPoints(pointsEarned);
    
    placeElementAndUpdateSeason(element);
    if (timeUnits <= 0) {
      endGame();
    } else {
      selectedElement = selectRandomElement(elements);
      displayElementInfo(selectedElement);
      displayNextElement(selectedElement);
    }
    return true;
  }
  return false;
}


// This function would be called whenever you need to select a new random element
function selectAndDisplayNewElement() {
  selectedElement = selectRandomElement(elements); // Randomly select a new element
  displayElementInfo(selectedElement); // Update the UI with the new element's info
  displayNextElement(selectedElement); // Update the display of the element's shape
}

function displayNextElement(element) {
  const elementShapeContainer = document.getElementById('elementShapeContainer');
  elementShapeContainer.innerHTML = ''; // Clear the previous shape
  const rows = element.shape.length;
  const cols = element.shape[0].length;

  // Set the grid template columns based on the number of columns in the shape
  elementShapeContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Create and append divs for each cell in the shape
  element.shape.forEach(row => {
    row.forEach(cell => {
      const shapeCell = document.createElement('div');
      shapeCell.classList.add('elementCell');
      if (cell === 1) {
        // Apply a class based on the element's type to color the cell
        shapeCell.classList.add(element.type);
      }
      elementShapeContainer.appendChild(shapeCell);
    });
  });
}

function applyTransformations(shape, rotation, mirrored) {
  let transformedShape = shape;
  // Apply rotation
  for (let i = 0; i < rotation; i++) {
    transformedShape = rotateShape(transformedShape);
  }
  // Apply mirroring
  if (mirrored) {
    transformedShape = mirrorShape(transformedShape);
  }
  return transformedShape;
}


function updateGridDisplay() {
  const cells = document.querySelectorAll('.grid .cell'); // Select all cell divs
  cells.forEach((cell, index) => {
    // Calculate the row and column based on the index
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Ensure the row and column are within the bounds of the map array
    if (row >= 0 && row < map.length && col >= 0 && col < map[row].length) {
      const cellType = map[row][col];

      // Reset the class list for the cell
      cell.className = 'cell';

      // Add the specific class based on the cell's type
      if (cellType !== 0) {
        cell.classList.add(cellType);
      }

      // If the cell is a mountain, add the 'mountain' class
      if (mountains.some(mountain => mountain.row - 1 === row && mountain.column - 1 === col)) {
        cell.classList.add('mountain');
      }
    } else {
      // If the cell is out of bounds, log an error or handle appropriately
      console.error('Map cell is out of bounds at:', row, col);
    }
  });
}




// This function should be called to update the UI after an element is placed
function updateAfterPlacement() {
  timeUnits -= element.time;
  updateTimeUnitsDisplay(); // Update the time units display
  selectAndDisplayNewElement(); // Select and display a new element
  checkEndGameCondition(); // Check if the game should end
}

// This function would be part of your cell click event listener
function tryToPlaceElement(position) {
  if (selectedElement && isValidPlacement(map, selectedElement.shape, position)) {
    placeElement(map, selectedElement, position);
    timeUnits -= selectedElement.time; // Deduct the time units
    updateGridDisplay(); // Reflect the new placement in the UI
    updateAfterPlacement(); // Perform updates after placement
  } else {
    // If the element cannot be placed, provide feedback to the user
    alert('Cannot place element here.');
  }
}

// This function is called when an element is clicked to select it for placement
function selectElementToPlace(elementIndex) {
  const element = elements[elementIndex];
  if (element) {
    selectedElement = element; // Set the selected element to the one clicked
    displayElementInfo(element); // Update the display with this element's info
    displayNextElement(element); // Show the element's shape in the 'nextElement' area
  }
}

// This function checks if there are enough time units left to place an element
function hasEnoughTimeUnits(element) {
  return timeUnits >= element.time;
}

function selectRandomElement(elements) {
  // Filter out elements that have been placed
  const availableElements = elements.filter(element => !element.placed);
  if (availableElements.length === 0) {
    return null; // No more elements to place
  }
  const randomIndex = Math.floor(Math.random() * availableElements.length);
  return availableElements[randomIndex];
}


function initGame() {
  // Shuffle and select the first random element
  shuffleArray(elements);
  selectedElement = selectRandomElement(elements);

  currentSeasonTotalPoints = 0;
  const currentSeason = seasons[currentSeasonIndex];

  currentSeasonTotalPoints = 0;
  updateSeasonTotalPointsDisplay(currentSeason, 0);
  displayElementInfo(selectedElement);
  displayNextElement(selectedElement);
  displayMissionImages(selectedMissions);
  updateTimeUnitsDisplay();

  // Create the game board
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Clear the board before initializing

  // Add cells to the game board
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row.toString();
      cell.dataset.col = col.toString();

      // Check if the current position is a mountain
      if (mountains.some(mountain => mountain.row - 1 === row && mountain.column - 1 === col)) {
        cell.classList.add('mountain');
      }
      
      gameBoard.appendChild(cell);
    }
  }

  addCellEventListeners();
  updateSeasonAndMissionDisplay();
}

function clearPreview() {
  document.querySelectorAll('.preview').forEach(cell => {
    cell.classList.remove('preview', 'water', 'town', 'forest', 'farm');
  });
}

function showPreview(e) {
  const cell = e.target;
  const row = parseInt(cell.dataset.row, 10);
  const col = parseInt(cell.dataset.col, 10);
  const shape = selectedElement.shape;

  // Add preview class to the cells that the shape would occupy
  shape.forEach((shapeRow, i) => {
    shapeRow.forEach((shapeCol, j) => {
      if (shapeCol === 1) {
        const gridRow = row + i;
        const gridCol = col + j;
        const cellToHighlight = document.querySelector(`.grid .cell[data-row="${gridRow}"][data-col="${gridCol}"]`);
        if (cellToHighlight && !cellToHighlight.classList.contains('mountain')) { // Skip mountains
          cellToHighlight.classList.add('shape-preview');
        }
      }
    });
  });
}

// Function to clear the preview
function clearPreview(e) {
  document.querySelectorAll('.grid .cell.shape-preview').forEach(cell => {
    cell.classList.remove('shape-preview');
  });
}


function placeShape(e) {
  const cell = e.target;
  const row = parseInt(cell.dataset.row, 10);
  const col = parseInt(cell.dataset.col, 10);
  const position = { row, column: col };

  if (selectedElement && isValidPlacement(map, selectedElement.shape, position)) {
    placeElement(map, selectedElement, position);
    updateGridDisplay(); // Refresh the grid to show the placed element
    // Handle the selection of the next element and update of time units here
    // Apply the solid placed shape style
    applyPlacedStyle(row, col, selectedElement);
  }
}

function applyPlacedStyle(startRow, startCol, element) {
  element.shape.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1) {
        const cellRow = startRow + rowIndex;
        const cellCol = startCol + colIndex;
        const cell = document.querySelector(`.grid .cell[data-row="${cellRow}"][data-col="${cellCol}"]`);
        if (cell) {
          cell.classList.remove('shape-preview');
          cell.classList.add('shape-placed');
        }
      }
    });
  });
}

// Add event listeners to each cell for element placement
function addCellEventListeners() {
  const cells = document.querySelectorAll('.grid .cell');
  cells.forEach(cell => {
    const row = parseInt(cell.getAttribute('data-row'), 10);
    const col = parseInt(cell.getAttribute('data-col'), 10);

    // Mouseover event to show a transparent shape
    cell.addEventListener('mouseover', showPreview);

    // Mouseout event to clear the preview
    cell.addEventListener('mouseout', clearPreview);

    // Click event to place the element
    cell.addEventListener('click', placeShape);
  });
}

// Function to update the visual representation of the map/grid
function updateGridDisplay() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const mapValue = map[row][col];

    // Clear any previous terrain classes and reapply the 'cell' class
    cell.className = 'cell';
    // Add the class for the current cell's terrain type if it's not empty
    if (mapValue !== 0) {
      cell.classList.add(mapValue);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGame();
  addCellEventListeners();
  updateSeasonAndMissionDisplay();
  updateTimeUnitsDisplay(); // Now it's safe to call this function
});


function endGame() {
  // Calculate scores for each mission
  const missionScores = calculateMissionScores(map, selectedMissions);
  
  // Display scores for each mission
  displayMissionScores(missionScores);
  
  // Calculate the total score over all seasons
  const finalScore = calculateFinalScore();
  
  // Display the final total score
  displayFinalScores(finalScore);

  // Notify the player that the game is over
  alert('Game Over! Check your scores.');
}

// Sum up all mission scores
function sumMissionScores(missionScores) {
  return Object.values(missionScores).reduce((total, score) => total + score, 0);
}

function displayFinalScores(finalScore) {
  const totalPointsElement = document.getElementById('totalPoints');
  if (totalPointsElement) {
    totalPointsElement.textContent = `Total: ${finalScore} points`;
  } else {
    console.error('Element not found: totalPoints');
  }
}

// Function to check if the game should end
function checkEndGameCondition() {
  // Here, we assume that the 'placed' property is set to true on an element object once it's placed
  if (timeUnits <= 0 || elements.every(e => e.placed)) {
    endGame();
  }
}


// Replace the placeholder 'handleCellClick' with the actual click event handler function you have for grid cells
function handleCellClick() {
  // Your cell click handling logic here
}

function displayElementInfo(element) {
  // Make sure the elements exist
  const elementTypeDisplay = document.getElementById('currentElementType');
  const elementTimeDisplay = document.getElementById('currentElementTime');

  // Update the display with the element's information
  if (elementTypeDisplay && elementTimeDisplay) {
    if (element) {
      elementTypeDisplay.textContent = element.type; // The type of the element
      elementTimeDisplay.textContent = element.time.toString();
    }
  } else {
    console.error('Element display elements not found in the DOM.');
  }
}

function updateSeasonTotalPointsDisplay(season, seasonTotal) {
  // Convert the season name to lowercase and concatenate with "Points" to match the ID pattern
  const seasonPointsElement = document.getElementById(`${season.toLowerCase()}`); // Remove 'Points' from the string template
  if (seasonPointsElement) {
    // Find the span with class "points" within the season box and update its content
    const pointsSpan = seasonPointsElement.querySelector('.points');
    if (pointsSpan) {
      pointsSpan.textContent = seasonTotal;
    } else {
      console.error(`Points span not found for season: ${season}`);
    }
  } else {
    console.error(`Element not found for season points display: ${season}`);
  }
}


function addPointsToCurrentSeason(points) {
  currentSeasonTotalPoints += points;
  updateSeasonTotalPointsDisplay();
}

function advanceSeason() {
  // 現在のシーズンのミッションスコアを計算します
  const currentSeason = seasons[currentSeasonIndex];
  const missionsForSeason = seasonMissions[currentSeason];
  missionsForSeason.forEach(missionKey => {
    // ここで各ミッションに対するスコア関数を呼び出します
    const scoreFunction = window[`score${missionKey}`];
    if (scoreFunction) {
      seasonScores[currentSeason][missionKey] = scoreFunction(map);
    }
  });

  // 現在のシーズンの合計スコアを計算します
  const seasonTotal = Object.values(seasonScores[currentSeason]).reduce((a, b) => a + b);
  seasonScores[currentSeason].total = seasonTotal;

  // 現在のシーズンのポイントを表示に反映させます
  updateSeasonPoints(currentSeason, seasonTotal);

  // 次のシーズンに進みます
  currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
  currentTimeUnits = 0; // 新しいシーズンのために時間単位をリセットします

  // 新しいシーズンの合計ポイントをリセットします
  resetTotalPointsForNewSeason();

  // 新しいシーズンの表示を更新します
  updateCurrentSeasonLabel();
}

function updateSeasonPoints(season, points) {
  // シーズン名の小文字を使って適切なHTML要素を選択します
  const seasonPointsElement = document.getElementById(`${season.toLowerCase()}`);
  if (seasonPointsElement) {
    // "points" クラスを持つ <span> 要素を探して内容を更新します
    const pointsSpan = seasonPointsElement.querySelector('.points');
    if (pointsSpan) {
      pointsSpan.textContent = points; // シーズンの合計ポイントを更新します
    } else {
      console.error(`Points span not found for season: ${season}`);
    }
  } else {
    console.error(`Element not found for season points display: ${season}`);
  }
}

function checkForSeasonEnd() {
  currentTimeUnits += selectedElement.time;
  if (currentTimeUnits >= seasonDurations * (currentSeasonIndex + 1)) {
    advanceSeason();
  }
  updateSeasonAndMissionDisplay(); 
}

// Function to update the display of time units
function updateTimeUnitsDisplay() {
  const timeUnitsDisplay = document.getElementById('currentElementTime'); // Corrected ID
  if (timeUnitsDisplay) { // Always good to check if the element exists
    timeUnitsDisplay.textContent = currentTimeUnits.toString();
  } else {
    console.error('timeUnitsDisplay element not found');
  }
}


function placeElementAndUpdateSeason(element) {
  currentTimeUnits += element.time;

  // Check if the end of the season is reached
  if (currentTimeUnits >= seasonDurations) {
    // Perform end of season scoring and setup for next season
    advanceSeason();
    currentTimeUnits = 0; // Reset elapsed time for the new season
  }

  // Update elapsed time display
  updateElapsedTimeDisplay();
}

function updateElapsedTimeDisplay() {
  const elapsedTimeDisplay = document.getElementById('elapsedTime');
  if (elapsedTimeDisplay) {
    elapsedTimeDisplay.textContent = `${currentTimeUnits}`;
  }
}


function updateSeasonAndMissionDisplay() {
  // Assuming you have containers for each season's points with IDs like 'springPoints', 'summerPoints', etc.
  const springPoints = document.getElementById('springPoints');
  const summerPoints = document.getElementById('summerPoints');
  const autumnPoints = document.getElementById('autumnPoints');
  const winterPoints = document.getElementById('winterPoints');

  const missionInfoDisplay = document.getElementById('missionInfo');

  // Check if the elements exist before attempting to update them
  if (springPoints) springPoints.textContent = sumSeasonScores(seasonScores['Spring']) + ' points';
  if (summerPoints) summerPoints.textContent = sumSeasonScores(seasonScores['Summer']) + ' points';
  if (autumnPoints) autumnPoints.textContent = sumSeasonScores(seasonScores['Autumn']) + ' points';
  if (winterPoints) winterPoints.textContent = sumSeasonScores(seasonScores['Winter']) + ' points';

  // Update the mission info display for the current season
  // missionInfoDisplay.innerHTML = ''; // Clear current missions
  const currentSeason = seasons[currentSeasonIndex];
  const currentMissions = seasonMissions[currentSeason];
  currentMissions.forEach(missionKey => {
    const mission = missions.basic.find(m => m.title === missionKey) || missions.extra.find(m => m.title === missionKey);
    if (mission) {
      const missionElement = document.createElement('div');
      missionElement.textContent = `${mission.title}: ${mission.description} (${seasonScores[currentSeason][missionKey]} points)`;
      missionInfoDisplay.appendChild(missionElement);
    }
  });
}

function sumSeasonScores(seasonScore) {
  // Make sure you sum up the mission scores, not a 'total' property
  return Object.values(seasonScore).reduce((total, score) => total + score, 0);
}