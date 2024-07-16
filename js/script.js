let borderlandsScore = 0;

const gridSize = 11;
const map = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const seasonDurations = 7;

const mountains = [
  { row: 2, column: 2 },
  { row: 4, column: 9 },
  { row: 6, column: 4 },
  { row: 9, column: 10 },
  { row: 10, column: 6 }
];

const seasonMissions = {
  'Spring': ['A', 'B'],
  'Summer': ['B', 'C'],
  'Autumn': ['C', 'D'],
  'Winter': ['D', 'A']
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

const selectedMissions = getRandomMissions(missions, 4);

const elementImages = {
  'water': 'assets/tiles/water.png',
  'town': 'assets/tiles/village.png',
  'forest': 'assets/tiles/forest.png',
  'farm': 'assets/tiles/farm.png'
};

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

let seasonScores = {
  'Spring': { 'A': 0, 'B': 0, 'total': 0 },
  'Summer': { 'B': 0, 'C': 0, 'total': 0 },
  'Autumn': { 'C': 0, 'D': 0, 'total': 0 },
  'Winter': { 'D': 0, 'A': 0, 'total': 0 }
};
let currentTimeUnits = 0;
let seasonTimeUnits = 0;
let selectedElement = null;
let timeUnits = 28;
let currentSeasonIndex = 0;
let currentSeasonTotalPoints = 0;

mountains.forEach(mountain => {
  map[mountain.row - 1][mountain.column - 1] = 'mountain';
});


function scoreEdgeOfTheForest(map) {
  let score = 0;
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (rowIndex === 0 || rowIndex === map.length - 1 || colIndex === 0 || colIndex === row.length - 1) {
        if (cell === 'forest') {
          score += 1;
          console.log(`Scored 1 point for forest at edge [${rowIndex}, ${colIndex}]. Current score: ${score}`);
        }
      }
    });
  });
  return score;
}
function scoreSleepyValley(map) {
  let score = 0;
  map.forEach((row, rowIndex) => {
    const forestCount = row.filter(cell => cell === 'forest').length;
    if (forestCount === 3) {
      score += 4;
      console.log(`Scored 4 points for Sleepy Valley on row ${rowIndex}. Current score: ${score}`);
    }
  });
  return score;
}
function scoreWateringPotatoes(map) {
  let score = 0;
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'water') {
        const adjacentPositions = [
          { row: rowIndex - 1, col: colIndex },
          { row: rowIndex + 1, col: colIndex },
          { row: rowIndex, col: colIndex - 1 },
          { row: rowIndex, col: colIndex + 1 }
        ];
        const isAdjacentToFarm = adjacentPositions.some(pos =>
          map[pos.row] && map[pos.row][pos.col] === 'farm'
        );
        if (isAdjacentToFarm) {
          score += 2;
          console.log(`Scored 2 points for Watering Potatoes at [${rowIndex}, ${colIndex}]. Current score: ${score}`);
        }
      }
    });
  });
  return score;
}
function scoreBorderlands(map) {
  let score = 0;
  map.forEach((row, rowIndex) => {
    if (row.every(cell => cell !== 0)) {
      score += 6;
      borderlandsScore += 6;
      console.log(`Scored 6 points for a full row in Borderlands at row ${rowIndex + 1}.`);
      const borderlandsScorelabel = document.querySelector('#borderlands-score')
      borderlandsScorelabel.textContent = borderlandsScore;
    }
  });
  for (let colIndex = 0; colIndex < map[0].length; colIndex++) {
    let fullColumn = true; // Assume the column is full
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
      if (map[rowIndex][colIndex] === 0) {
        fullColumn = false;
        break;
      }
    }
    if (fullColumn) {
      score += 6;
      borderlandsScore += 6;
      console.log(`Scored 6 points for a full column in Borderlands at column ${colIndex + 1}.`);
      const borderlandsScorelabel = document.querySelector('#borderlands-score')
      borderlandsScorelabel.textContent = borderlandsScore;
    }
  }
  return score;
}
function scoreTreeLine(map) {
  let maxLength = 0;

  for (let col = 0; col < map[0].length; col++) {
    let currentLength = 0;
    for (let row = 0; row < map.length; row++) {
      if (map[row][col] === 'forest') {
        currentLength++;
        maxLength = Math.max(maxLength, currentLength);
      } else {
        currentLength = 0;
      }
    }
  }

  const score = maxLength * 2;
  console.log(`Tree Line: Longest vertical forest scored ${score} points.`);
  return score;
}
function scoreWateringCanal(map) {
  let score = 0;

  for (let col = 0; col < map[0].length; col++) {
    let farmCount = 0;
    let waterCount = 0;
    for (let row = 0; row < map.length; row++) {
      if (map[row][col] === 'farm') farmCount++;
      if (map[row][col] === 'water') waterCount++;
    }
    if (farmCount === waterCount && farmCount > 0) {
      score += 4;
      console.log(`Watering Canal: Column ${col} with equal farm and water fields scored 4 points.`);
    }
  }
  return score;
}
function scoreWealthyTown(map) {
  let score = 0;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'town') {
        const adjacentTypes = new Set();
        [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ].forEach(pos => {
          if (pos.r >= 0 && pos.r < map.length && pos.c >= 0 && pos.c < map[0].length) {
            const adjacentCell = map[pos.r][pos.c];
            if (adjacentCell && adjacentCell !== 'mountain' && adjacentCell !== 0) {
              adjacentTypes.add(adjacentCell);
            }
          }
        });
        if (adjacentTypes.size >= 3) {
          score += 3;
          console.log(`Wealthy Town: Town field at (${rowIndex}, ${colIndex}) adjacent to ${adjacentTypes.size} terrain types scored 3 points.`);
        }
      }
    });
  });

  return score;
}
function scoreMagiciansValley(map) {
  let score = 0;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'water') {
        const adjacentPositions = [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ];
        adjacentPositions.forEach(pos => {
          if (pos.r >= 0 && pos.r < map.length && pos.c >= 0 && pos.c < map[0].length && map[pos.r][pos.c] === 'mountain') {
            score += 3;
            console.log(`Magicians' Valley: Water field at (${rowIndex}, ${colIndex}) next to mountain scored 3 points.`);
          }
        });
      }
    });
  });

  return score;
}
function scoreEmptySite(map) {
  let score = 0;

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        const adjacentPositions = [
          { r: rowIndex - 1, c: colIndex },
          { r: rowIndex + 1, c: colIndex },
          { r: rowIndex, c: colIndex - 1 },
          { r: rowIndex, c: colIndex + 1 }
        ];
        const isAdjacentToVillage = adjacentPositions.some(pos => map[pos.r] && map[pos.r][pos.c] === 'town');
        if (isAdjacentToVillage) {
          score += 2;
          console.log(`Empty Site: Empty field at (${rowIndex}, ${colIndex}) adjacent to town scored 2 points.`);
        }
      }
    });
  });

  return score;
}
function scoreTerracedHouse(map) {
  let score = 0;

  map.forEach(row => {
    let currentLength = 0;
    let maxLength = 0;

    row.forEach(cell => {
      if (cell === 'town') {
        currentLength++;
        maxLength = Math.max(maxLength, currentLength);
      } else {
        if (currentLength > 0) {
          console.log(`Terraced House: A contiguous horizontal line of ${currentLength} town fields scored ${currentLength * 2} points.`);
        }
        currentLength = 0;
      }
    });

    if (maxLength > 0) {
      score += maxLength * 2;
    }
  });

  return score;
}
function scoreOddNumberedSilos(map) {
  let score = 0;

  for (let col = 0; col < map[0].length; col++) {
    if ((col + 1) % 2 !== 0) {
      let isFullColumn = true;

      for (let row = 0; row < map.length; row++) {
        if (map[row][col] === 0 || map[row][col] === 'mountain') {
          isFullColumn = false;
          break;
        }
      }

      if (isFullColumn) {
        score += 10;
        console.log(`Odd Numbered Silos: Full column ${col} scored 10 points.`);
      }
    }
  }

  return score;
}
function scoreRichCountryside(map) {
  let score = 0;

  map.forEach(row => {
    const terrainTypes = new Set(row.filter(cell => cell !== 0 && cell !== 'mountain'));
    if (terrainTypes.size >= 5) {
      score += 4;
      console.log(`Rich Countryside: Row with ${terrainTypes.size} different terrain types scored 4 points.`);
    }
  });

  return score;
}
function scoreEncirclingMountains(map) {
  let encircleScore = 0;

  mountains.forEach((mountain, index) => {
    const adjacentPositions = [
      { row: mountain.row - 1, column: mountain.column }, // 上
      { row: mountain.row + 1, column: mountain.column }, // 下
      { row: mountain.row, column: mountain.column - 1 }, // 左
      { row: mountain.row, column: mountain.column + 1 }, // 右
      { row: mountain.row - 1, column: mountain.column - 1 }, // 左上
      { row: mountain.row - 1, column: mountain.column + 1 }, // 右上
      { row: mountain.row + 1, column: mountain.column - 1 }, // 左下
      { row: mountain.row + 1, column: mountain.column + 1 }  // 右下
    ];
    
    const isEncircled = adjacentPositions.every(pos => 
      pos.row >= 0 && pos.row < gridSize && 
      pos.column >= 0 && pos.column < gridSize && 
      map[pos.row][pos.column] !== 0
    );

    if (isEncircled) {
      encircleScore += 1;
      console.log(`Encircling Mountains: Mountain at (${mountain.row}, ${mountain.column}) is fully encircled. Scored 1 point.`);
    }
  });

  if (encircleScore > 0) {
  }

  return encircleScore;
}

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
    "Edge of the forest": "assets/missions_eng/EdgeOfTheForest.png",
    "Sleepy valley": "assets/missions_eng/SleepyValley.png",
    "Watering potatoes": "assets/missions_eng/WateringPotatoes.png",
    "Borderlands": "assets/missions_eng/Borderlands.png",
    "Tree line": "assets/missions_eng/TreeLine.png",
    "Watering canal": "assets/missions_eng/WateringCanal.png",
    "Wealthy town": "assets/missions_eng/WealthyTown.png",
    "Magicians' valley": "assets/missions_eng/MagiciansValley.png",
    "Empty site": "assets/missions_eng/EmptySite.png",
    "Terraced house": "assets/missions_eng/RowOfHouses.png",
    "Odd numbered silos": "assets/missions_eng/OddNumberedSilos.png",
    "Rich countryside": "assets/missions_eng/RichCountryside.png"
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

function updateSeasonPoints(season, points) {
  const seasonPointsSpan = document.getElementById(season.toLowerCase()).querySelector('.points');
  if (seasonPointsSpan) {
    seasonPointsSpan.textContent = points;
    console.log(`Updated season points for ${season}. New score: ${points}`);
  }
}
function updateTotalPoints(points) {
  const totalPointsElement = document.getElementById('totalPoints');
  if (totalPointsElement) {
    totalPointsElement.textContent = `Total: ${points} points`;
  }
}

const seasonToMissionsMap = {
  'Spring': [selectedMissions[0].title, selectedMissions[1].title],
  'Summer': [selectedMissions[1].title, selectedMissions[2].title],
  'Autumn': [selectedMissions[2].title, selectedMissions[3].title],
  'Winter': [selectedMissions[3].title, selectedMissions[0].title]
};

function calculateMissionScores(map, selectedMissions) {
  if(currentSeasonIndex == 4){currentSeasonIndex = 3}
  const currentSeason = seasons[currentSeasonIndex];
  const activeMissions = seasonToMissionsMap[currentSeason];

  const scores = {};
  selectedMissions.forEach(mission => {
  if (activeMissions.includes(mission.title)) {
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
    }else {
      scores[mission.title] = 0;
    }
  });

  return scores;
}


function calculateFinalScore() {
  let finalScore = 0;
  for (const season in seasonScores) {
    finalScore += seasonScores[season].total;
  }
  return finalScore;
}

function updateMissionScores() {
  const missionScores = calculateMissionScores(map, selectedMissions);
  displayMissionScores(missionScores);
}

function displayMissionScores(scores) {
  Object.entries(scores).forEach(([mission, score], index) => {
    let missionScoreElement = document.getElementById(`missionScore-${mission.replace(/\s/g, '')}`);
    if (!missionScoreElement) {
      missionScoreElement = document.createElement('div');
      missionScoreElement.id = `missionScore-${mission.replace(/\s/g, '')}`;
      missionScoreElement.classList.add('missionScore');
      const missionInfo = document.getElementById(`mission-${String.fromCharCode('a'.charCodeAt(0) + index)}`);
      missionInfo.appendChild(missionScoreElement);
    }
    missionScoreElement.textContent = `${score} points`;
  });
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
function updateScores(){
  updateMissionScores();

  const currentMissionScores = calculateMissionScores(map, selectedMissions);
  const encircleScore = scoreEncirclingMountains(map);
  const pointsEarned = sumMissionScores(currentMissionScores) + encircleScore;
  
  const lastSeason = seasons[currentSeasonIndex-1];
  seasonScores[lastSeason].total += pointsEarned;
  updateSeasonPoints(lastSeason, seasonScores[lastSeason].total);
  
  updateTotalPoints(calculateFinalScore());
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
    timeUnits -= element.time;
    updateTimeUnitsDisplay();
    
    checkForSeasonEnd();
    
    selectedElement = selectRandomElement(elements);
    if (selectedElement) {
      displayElementInfo(selectedElement);
      displayNextElement(selectedElement);
    } else {
      endGame();
    }

    updateAfterPlacement();

    return true;
  } else {
    alert('Cannot place element here.');
    if (!canPlaceAnyElement()) {
      endGame();
    }
    return false;
  }
}

function selectAndDisplayNewElement() {
  selectedElement = selectRandomElement(elements);
  displayElementInfo(selectedElement);
  displayNextElement(selectedElement);
}

function displayNextElement(element) {
  const elementShapeContainer = document.getElementById('elementShapeContainer');
  elementShapeContainer.innerHTML = '';
  const rows = element.shape.length;
  const cols = element.shape[0].length;

  elementShapeContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)` ;

  element.shape.forEach(row => {
    row.forEach(cell => {
      const shapeCell = document.createElement('div');
      shapeCell.classList.add('elementCell');
      if (cell === 1) {
        shapeCell.classList.add(element.type);
        elementShapeContainer.appendChild(shapeCell);
      } else {
        shapeCell.style.visibility = 'hidden';
        elementShapeContainer.appendChild(shapeCell);
      }
    });
  });
}

function applyTransformations(shape, rotation, mirrored) {
  let transformedShape = shape;
  for (let i = 0; i < rotation; i++) {
    transformedShape = rotateShape(transformedShape);
  }
  if (mirrored) {
    transformedShape = mirrorShape(transformedShape);
  }
  return transformedShape;
}


function updateGridDisplay() {
  const cells = document.querySelectorAll('.grid .cell');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    if (row >= 0 && row < map.length && col >= 0 && col < map[row].length) {
      const cellType = map[row][col];
      cell.className = 'cell';

      if (cellType !== 0) {
        cell.classList.add(cellType);
      }

      if (mountains.some(mountain => mountain.row - 1 === row && mountain.column - 1 === col)) {
        cell.classList.add('mountain');
      }
    } else {
      console.error('Map cell is out of bounds at:', row, col);
    }
  });
}

function canPlaceAnyElement() {
  for (let element of elements) {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (isValidPlacement(map, element.shape, { row, column: col })) {
          return true;
        }
      }
    }
  }
  return false;
}


function updateAfterPlacement() {
  selectAndDisplayNewElement();
  checkEndGameCondition();
  if (!canPlaceAnyElement()) {
    endGame();
  }
}

function tryToPlaceElement(position) {
  if (selectedElement && isValidPlacement(map, selectedElement.shape, position)) {
    placeElement(map, selectedElement, position);
    timeUnits -= selectedElement.time;
    updateGridDisplay();
    updateAfterPlacement();
  } else {
    alert('Cannot place element here.');
  }
}

function selectElementToPlace(elementIndex) {
  const element = elements[elementIndex];
  if (element) {
    selectedElement = element;
    displayElementInfo(element);
    displayNextElement(element);
  }
}

function hasEnoughTimeUnits(element) {
  return timeUnits >= element.time;
}

function selectRandomElement(elements) {
  const availableElements = elements.filter(element => !element.placed);
  if (availableElements.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * availableElements.length);
  return availableElements[randomIndex];
}


function initGame() {
  shuffleArray(elements);
  selectedElement = selectRandomElement(elements);

  currentSeasonTotalPoints = 0;
  displayElementInfo(selectedElement);
  displayNextElement(selectedElement);
  displayMissionImages(selectedMissions);
  updateTimeUnitsDisplay();
  updateMissionScores();

  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row.toString();
      cell.dataset.col = col.toString();

      if (mountains.some(mountain => mountain.row - 1 === row && mountain.column - 1 === col)) {
        cell.classList.add('mountain');
      }
      
      gameBoard.appendChild(cell);
    }
  }

  addCellEventListeners();
  updateSeasonAndMissionDisplay();
  updateCurrentSeasonLabel();
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

  shape.forEach((shapeRow, i) => {
    shapeRow.forEach((shapeCol, j) => {
      if (shapeCol === 1) {
        const gridRow = row + i;
        const gridCol = col + j;
        const cellToHighlight = document.querySelector(`.grid .cell[data-row="${gridRow}"][data-col="${gridCol}"]`);
        if (cellToHighlight && !cellToHighlight.classList.contains('mountain')) {
          cellToHighlight.classList.add('shape-preview');
        }
      }
    });
  });
}

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
    updateGridDisplay();
    applyPlacedStyle(row, col, selectedElement);

    const currentSeason = seasons[currentSeasonIndex];
    const encircleScore = scoreEncirclingMountains(map);
    seasonScores[currentSeason].total += encircleScore;
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

function addCellEventListeners() {
  const cells = document.querySelectorAll('.grid .cell');
  cells.forEach(cell => {
    const row = parseInt(cell.getAttribute('data-row'), 10);
    const col = parseInt(cell.getAttribute('data-col'), 10);

    cell.addEventListener('mouseover', showPreview);
    cell.addEventListener('mouseout', clearPreview);
    cell.addEventListener('click', placeShape);
  });
}

function updateGridDisplay() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const mapValue = map[row][col];
    cell.className = 'cell';
    if (mapValue !== 0) {
      cell.classList.add(mapValue);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGame();
  addCellEventListeners();
  updateSeasonAndMissionDisplay();
  updateTimeUnitsDisplay();
});


function endGame() {
  const missionScores = calculateMissionScores(map, selectedMissions);
  displayMissionScores(missionScores);
  const encircleScore = scoreEncirclingMountains(map);
  const finalScore = calculateFinalScore() + encircleScore;
  displayFinalScores(finalScore);

  alert('Game Over! Check your scores.');
  const borderlandsScorelabel = document.querySelector('#borderlands-score')
  borderlandsScorelabel.textContent = borderlandsScore;
}

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

function checkEndGameCondition() {
  if (timeUnits <= 0 || elements.every(e => e.placed)) {
    endGame();
  }
}


function handleCellClick() {
}

function displayElementInfo(element) {
  const elementTypeDisplay = document.getElementById('currentElementType');
  const elementTimeDisplay = document.getElementById('currentElementTime');

  if (elementTypeDisplay && elementTimeDisplay) {
    if (element) {
      elementTypeDisplay.textContent = element.type;
      elementTimeDisplay.textContent = element.time.toString();
    }
  } else {
    console.error('Element display elements not found in the DOM.');
  }
}


function advanceSeason() {
  const currentSeason = seasons[currentSeasonIndex];
  const missionsForSeason = seasonMissions[currentSeason];
  missionsForSeason.forEach(missionKey => {
    const scoreFunction = window[`score${missionKey}`];
    if (scoreFunction) {
      seasonScores[currentSeason][missionKey] = scoreFunction(map);
    }
  });

  const seasonTotal = Object.values(seasonScores[currentSeason]).reduce((a, b) => a + b);
  seasonScores[currentSeason].total = seasonTotal;

  updateSeasonPoints(currentSeason, seasonTotal);
  updateSeasonAndMissionDisplay();
  currentSeasonIndex++;
  updateCurrentSeasonLabel();
  seasonTimeUnits = seasonTimeUnits % 7 == 0 ? 0 : 1;
  updateElapsedTimeDisplay();


}

function updateSeasonPoints(season, points) {
  console.log("updateSeasonPoints")
  const seasonPointsElement = document.getElementById(season.toLowerCase());
  if (seasonPointsElement) {
    const pointsSpan = seasonPointsElement.querySelector('.points');
    if (pointsSpan) {
      pointsSpan.textContent = points;
    }
  }
}

function checkForSeasonEnd() {
  currentTimeUnits += selectedElement.time;
  seasonTimeUnits += selectedElement.time;
  updateElapsedTimeDisplay();
  if (currentTimeUnits >= seasonDurations * (currentSeasonIndex + 1)) {
    advanceSeason();
    updateScores();
  }
  updateSeasonAndMissionDisplay(); 
}

function updateTimeUnitsDisplay() {
  const timeUnitsDisplay = document.getElementById('currentElementTime');
  if (timeUnitsDisplay) {
    timeUnitsDisplay.textContent = currentTimeUnits.toString();
  } else {
    console.error('timeUnitsDisplay element not found');
  }
}


function updateElapsedTimeDisplay() {
  const elapsedTimeDisplay = document.getElementById('elapsedTime');
  if (elapsedTimeDisplay) {
    elapsedTimeDisplay.textContent = `${seasonTimeUnits}`;
  }
}


function updateSeasonAndMissionDisplay() {
  console.log("updateSeasonAndMissionDisplay");

  const missionInfoDisplay = document.getElementById('missionInfo');
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
  return Object.values(seasonScore).reduce((total, score) => total + score, 0);
}