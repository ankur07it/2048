function GridManager(size, deck, score) {
  this.size = size;
  this.deck = deck;
  this.score = score;
}

GridManager.prototype.blankGrid = function() {
  let blankGrid;
  if (this.size === 8) {
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
};

GridManager.prototype.returnAvailableCards = function(deck) {
  let availablePosition = [];
  this.deck = deck;
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (this.deck[x][y] === 0) {
        availablePosition.push({
          x: x,
          y: y
        });
      }
    }
  }
  return availablePosition;
};

GridManager.prototype.insertCard = function(randomCard, value, deck) {
  this.deck = deck;
  this.deck[randomCard.x][randomCard.y] = value;
  return this.deck;
};

GridManager.prototype.flipCard = function(deck) {
  this.deck = deck;
  for (var x = 0; x < this.size; x++) {
    this.deck = deck;
    this.deck[x].reverse();
  }
  return this.deck;
};

GridManager.prototype.rotateDeck = function(deck, direction) {
  this.deck = deck;
  let newDeck = this.blankGrid();
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (direction === 1) {
        newDeck[x][y] = this.deck[y][x];
      } else {
        newDeck[y][x] = this.deck[x][y];
      }
    }
  }
  return newDeck;
};

GridManager.prototype.moveCard = function(row) {
  let arr = row.filter(val => val);
  let noDataItems = this.size - arr.length;
  let noDataArray = Array(noDataItems).fill(0);
  arr = noDataArray.concat(arr);
  return arr;
};

GridManager.prototype.combineCards = function(row, score) {
  this.score = score;
  for (let i = this.size - 1; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a === b) {
      row[i] = a + b;
      this.score += row[i];
      row[i - 1] = 0;
    }
  }
  return {
    row: row,
    score: this.score
  };
};
