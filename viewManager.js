function ViewManager(size, deck, score) {
  this.size = size;
  this.deck = deck;
  this.score = score;
}

ViewManager.prototype.drawGame = function(deck, score) {
  this.deck = deck;
  this.score = score;
  let c = window.document.getElementById("myCanvas");
  c.width = this.size * 100;
  c.height = this.size * 100;
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  let width = 100;
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      ctx.strokeRect(x * width, y * width, width, width);
      ctx.stroke();
      this.fillGrid(x, y, width, ctx, this.deck[x][y]);
    }
  }
  window.document.body.appendChild(c);
  window.document.getElementById("score").innerHTML = "Score: " + this.score;
};

ViewManager.prototype.fillGrid = function(x, y, width, ctx, val) {
  if (val !== 0) {
    ctx.textAlign = "center";
    ctx.font = "40px Arial";
    ctx.strokeText(val, x * width + width / 2, y * width + width / 2);
  }
};

ViewManager.prototype.showGameCanvas = function() {
  window.document.getElementById("gameCanvas").style.visibility = "visible";
  window.document.getElementById("gamepanel").remove();
  window.document.getElementById("error").remove();
  window.document.getElementById("consolePanel").remove();
};

ViewManager.prototype.showConsoleMode = function() {
  window.document.getElementById("gameCanvas").remove();
  window.document.getElementById("gamepanel").remove();
  window.document.getElementById("error").remove();
  window.document.getElementById("consolePanel").style.visibility = "visible";
};

ViewManager.prototype.validateAllValues = function() {
  if (
    window.document.querySelector('input[name="mode"]:checked') &&
    window.document.querySelector('input[name="matrix"]:checked') &&
    window.document.querySelector('input[name="score"]:checked')
  ) {
    return true;
  }
  return false;
};

ViewManager.prototype.getMode = function() {
  return window.document.querySelector('input[name="mode"]:checked').value;
};

ViewManager.prototype.getSize = function() {
  return window.document.querySelector('input[name="matrix"]:checked').value;
};

ViewManager.prototype.getScore = function() {
  return window.document.querySelector('input[name="score"]:checked').value;
};

ViewManager.prototype.showError = function() {
  window.document.getElementById("error").style.visibility = "visible";
};
