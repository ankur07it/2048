const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let size;
let finalScore;
let startTiles = 2;
let deck;
let score = 0;
userInput();

function userInput() {
  var self = this;
  r1.question("Winning Score. ", res => {
    self.finalScore = res;
    r1.question("Size of the matrix. ", answer => {
      self.size = answer;
      gameSetup();
    });
  });
}

function getRandomArrayPosition(array) {
  let item = array[Math.floor(Math.random() * array.length)];
  return item;
}

function isEqual(value, other) {
  let type = Object.prototype.toString.call(value);
  if (type !== Object.prototype.toString.call(other)) return false;
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;
  let valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
  let otherLen = type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;
  var compare = function(item1, item2) {
    var itemType = Object.prototype.toString.call(item1);
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    } else {
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  return true;
}

function blankGrid() {
  let blankGrid;
  if (this.size == 8) {
    blankGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
  } else {
    blankGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  }
  return blankGrid;
}

function returnAvailableCards() {
  let availablePosition = [];
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (deck[x][y] === 0) {
        availablePosition.push({
          x: x,
          y: y
        });
      }
    }
  }
  return availablePosition;
}

function insertCard(randomCard, value, deck) {
  deck[randomCard.x][randomCard.y] = value;
  return deck;
}

function flipCard(deck) {
  for (var x = 0; x < this.size; x++) {
    deck[x].reverse();
  }
  return deck;
}

function rotateDeck(deck, direction) {
  let newDeck = blankGrid();
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (direction === 1) {
        newDeck[x][y] = deck[y][x];
      } else {
        newDeck[y][x] = deck[x][y];
      }
    }
  }
  return newDeck;
}

function moveCard(row) {
  let arr = row.filter(val => val);
  let noDataItems = this.size - arr.length;
  let noDataArray = Array(noDataItems).fill(0);
  arr = noDataArray.concat(arr);
  return arr;
}

function combineCards(row, score) {
  score = score;
  for (let i = this.size - 1; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a === b) {
      row[i] = a + b;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return {
    row: row,
    score: score
  };
}

function addStartTiles() {
  for (var i = 0; i < startTiles; i++) {
    addRandomCard();
  }
  consoleDeck(deck, this.size);
}

function gameSetup() {
  deck = blankGrid();
  addStartTiles();
}

function addRandomCard() {
  let availablePosition = returnAvailableCards();
  if (availablePosition.length > 0) {
    let randomCard = getRandomArrayPosition(availablePosition);
    let value = Math.random() > 0.1 ? 2 : 4;
    deck = insertCard(randomCard, value, deck);
  }
}

function move(direction) {
  let flipped = false;
  let rotated = false;
  let start = true;
  switch (parseInt(direction)) {
    case 4:
      // Down
      // Do Nothing
      break;
    case 3:
      // Up
      deck = flipCard(deck);
      flipped = true;
      break;
    case 2:
      // Right
      deck = rotateDeck(deck, 1);
      rotated = true;
      break;
    case 1:
      // Left
      deck = rotateDeck(deck, 1);
      deck = flipCard(deck);
      flipped = true;
      rotated = true;
      break;
    default:
      start = false;
  }
  if (start) {
    keepPlaying(flipped, rotated, deck);
  }
  consoleDeck(deck, this.size);
}

function keepPlaying(flipped, rotated, deck, dir) {
  let destinationArray = Array.from(deck);
  for (let x = 0; x < this.size; x++) {
    deck[x] = operate(deck[x]);
  }
  if (!isEqual(deck, destinationArray)) {
    addRandomCard();
  }
  if (flipped) {
    deck = flipCard(deck);
  }
  if (rotated) {
    deck = rotateDeck(deck, -1);
  }
  if (isGameOver()) {
    console.log("GAME OVER");
    r1.close();
  }
  if (isGameWon()) {
    console.log("GAME WON");
    r1.close();
  }
}

function operate(row) {
  row = moveCard(row);
  row = combine(row, score);
  row = moveCard(row);
  return row;
}

function combine(row) {
  let data = combineCards(row, score);
  score = data.score;
  return data.row;
}

function isGameWon() {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (deck[x][y] === this.finalScore) {
        return true;
      }
    }
  }
  return false;
}

function isGameOver() {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (deck[x][y] === 0) {
        return false;
      }
      if (x !== this.size - 1 && deck[x][y] === deck[x + 1][y]) {
        return false;
      }
      if (y !== this.size - 1 && deck[x][y] === deck[x][y + 1]) {
        return false;
      }
    }
  }
  return true;
}

function consoleDeck(deck, size) {
  let concatString = "";
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      concatString += JSON.stringify(deck[y][x]);
      concatString += " ";
    }
    console.log(concatString);
    concatString = "";
  }
  userInput2();
}

function userInput2() {
  r1.question("Type 1, 2, 3, 4 to indicate left, right, up, down. ", res => {
    move(res);
  });
}
