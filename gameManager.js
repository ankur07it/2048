function GameManager(mode, size, gameScore) {
  this.mode = mode === "ui" ? true : false;
  this.size = size;
  this.finalScore = gameScore;
  this.startTiles = 2;
  this.deck;
  this.score = 0;
  this.input = new UserInputManager();
  this.input.on("move", this.move.bind(this));
}

GameManager.prototype.addStartTiles = function() {
  for (var i = 0; i < this.startTiles; i++) {
    this.addRandomCard();
  }
  if (!this.mode) {
    this.console.consoleDeck(this.deck, this.size);
  }
};

GameManager.prototype.gameSetup = function() {
  this.grid = new GridManager(this.size, this.deck, this.score);
  this.deck = this.grid.blankGrid();
  this.util = new UtilManager(this.size, this.deck);
  this.view = new ViewManager(this.size, this.deck, this.score);
  this.console = new ConsoleManager(this.deck);
  this.addStartTiles();
};

GameManager.prototype.addRandomCard = function() {
  let availablePosition = this.grid.returnAvailableCards(this.deck);
  if (availablePosition.length > 0) {
    let randomCard = this.util.getRandomArrayPosition(availablePosition);
    let value = Math.random() > 0.1 ? 2 : 4;
    this.deck = this.grid.insertCard(randomCard, value, this.deck);
    if (this.mode) {
      this.view.drawGame(this.deck, this.score);
    }
  }
};

GameManager.prototype.move = function(direction) {
  let flipped = false;
  let rotated = false;
  let start = true;
  switch (direction) {
    case 4:
      // Down
      // Do Nothing
      break;
    case 3:
      // Up
      this.deck = this.grid.flipCard(this.deck);
      flipped = true;
      break;
    case 2:
      // Right
      this.deck = this.grid.rotateDeck(this.deck, 1);
      rotated = true;
      break;
    case 1:
      // Left
      this.deck = this.grid.rotateDeck(this.deck, 1);
      this.deck = this.grid.flipCard(this.deck);
      flipped = true;
      rotated = true;
      break;
    default:
      start = false;
  }
  if (start) {
    this.keepPlaying(flipped, rotated, this.deck);
  }
  if (this.mode) {
    this.view.drawGame(this.deck, this.score);
  } else {
    this.console.consoleDeck(this.deck, this.size);
  }
};

GameManager.prototype.keepPlaying = function(flipped, rotated, deck, dir) {
  this.deck = deck;
  let destinationArray = Array.from(this.deck);
  for (let x = 0; x < this.size; x++) {
    this.deck[x] = this.operate(this.deck[x]);
  }
  if (!this.util.isEqual(this.deck, destinationArray)) {
    this.addRandomCard();
  }
  if (flipped) {
    this.deck = this.grid.flipCard(this.deck);
  }
  if (rotated) {
    this.deck = this.grid.rotateDeck(this.deck, -1);
  }
  if (this.isGameOver()) {
    console.log("GAME OVER");
  }
  if (this.isGameWon()) {
    console.log("GAME WON");
  }
};

GameManager.prototype.operate = function(row) {
  row = this.grid.moveCard(row);
  row = this.combine(row, this.score);
  row = this.grid.moveCard(row);
  return row;
};

GameManager.prototype.combine = function(row) {
  let data = this.grid.combineCards(row, this.score);
  this.score = data.score;
  return data.row;
};

GameManager.prototype.isGameWon = function() {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (this.deck[x][y] === this.finalScore) {
        return true;
      }
    }
  }
  return false;
};

GameManager.prototype.isGameOver = function() {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      if (this.deck[x][y] === 0) {
        return false;
      }
      if (x !== this.size - 1 && this.deck[x][y] === this.deck[x + 1][y]) {
        return false;
      }
      if (y !== this.size - 1 && this.deck[x][y] === this.deck[x][y + 1]) {
        return false;
      }
    }
  }
  return true;
};
