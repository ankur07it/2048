function UserInputManager() {
  this.events = {};
  this.listen();
}

UserInputManager.prototype.on = function(event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

UserInputManager.prototype.emit = function(event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function(callback) {
      callback(data);
    });
  }
};

UserInputManager.prototype.listen = function() {
  let self = this;
  let map = {
    37: 1, // Left
    38: 3, // Up
    39: 2, // Right
    40: 4, // Down
    49: 1, // Left
    50: 2, // Right
    51: 3, // Up
    52: 4  // Down
  };
  window.addEventListener("keydown", function(event) {
    var mapped = map[event.which];
    if (mapped !== undefined) {
      self.emit("move", mapped);
    }
  });
};