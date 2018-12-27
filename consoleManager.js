function ConsoleManager(deck) {
  this.deck = deck;
}

ConsoleManager.prototype.consoleDeck = function(deck, size) {
  this.deck = deck;
  let concatString = "";
  console.clear();
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      concatString += JSON.stringify(this.deck[y][x]);
      concatString += ' ';
    }
    console.log(concatString);
    concatString = "";
  }
};