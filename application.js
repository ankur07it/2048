function selectGame() {
  let mode;
  let size;
  let finalScore;
  let view = new ViewManager();
  if (view.validateAllValues()) {
    mode = view.getMode();
    size = view.getSize();
    finalScore = view.getScore();
    if (mode === "ui") {
      view.showGameCanvas();
    } else {
      view.showConsoleMode();
    }
    let game = new GameManager(mode, parseInt(size), parseInt(finalScore));
    game.gameSetup();
  } else {
    view.showError();
  }
}
