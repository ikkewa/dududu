
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;

module.exports = Input;

function Input(opts) {
  EventEmitter.call(this);
  opts = opts || {};

  this.dom = opts.dom;

  this.isMoving = false;
  this.lastOrient = {a: 0, b: 0};
  this.lastGrav = {x: 0, b: 0};

  this.dom.addEventListener('touchstart', this.onTouchStart.bind(this), false);
  this.dom.addEventListener('touchmove', this.onTouchMove.bind(this), false);
  this.dom.addEventListener('touchend', this.onTouchEnd.bind(this), false);

  this.dom.onselectstart = function() {return false;};
}

inherits(Input, EventEmitter);

Input.prototype.handleMotionEvent = function onDeviceMotion(e) {
  var x = Math.abs((e.acceleration.x || 0).toFixed(1));
  if(Math.abs(this.lastGrav.x - x) > 3) {
    if(!this.isMoving) {
      this.isMoving = true;
    }
  }

  this.lastGrav.x = x;
};

Input.prototype.handleOrientationEvent = function handleOrientationEvent(e) {
  var a = parseFloat(e.alpha).toFixed(2);
  var b = parseFloat(e.beta).toFixed(2);
  if(Math.abs(this.lastOrient.a - a) > 1 || Math.abs(this.lastOrient.b - b) > 1) {
    this.isMoving = true;
  } else {
    this.isMoving = false;
  }

  this.lastOrient.a = a;
  this.lastOrient.b = b;
};

Input.prototype.onTouchStart = function onTouchStart(e) {
  e.preventDefault();
  this.emit('start');
};

Input.prototype.onTouchMove = function onTouchMove(e) {
  e.preventDefault();
  if(this.isMoving) {
    this.emit('move');
  } else {
    this.emit('not-moving');
  }
};

Input.prototype.onTouchEnd = function onTouchEnd(e) {
  e.preventDefault();
  this.emit('end');
};
