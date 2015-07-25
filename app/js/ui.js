
module.exports = ColorUI;

var round = Math.round;
var abs = Math.abs;

function ColorUI(opts) {
  this.dom = opts.dom || document.body;
  // velocity
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  // acceleration
  this.ax = 0;
  this.ay = 0;
  this.az = 0;
  this.aa = 0;
  this.ab = 0;
  this.ag = 0;
  // rotation
  this.ra = 0;
  this.rb = 0;
  this.rg = 0;
  this.rr = 0;
}

ColorUI.prototype.handleMotionEvent = function handleEvent(e) {
  var acc = e.accelerationIncludingGravity;
  var rr = e.rotationRate;
  this.ax = round(abs(acc.x * 1));
  this.ay = round(abs(acc.y * 1));
  this.az = round(abs(acc.z * 1));

  if(rr !== null) {
    this.aa = round(rr.alpha);
    this.ab = round(rr.beta);
    this.ag = round(rr.gamma);
  }
};

ColorUI.prototype.draw = function draw() {
  var color = this.makeColor(this.aa, this.ab, this.ag);

  this.dom.style.backgroundColor = '#' +
    (color[0].toString(16)).substr(1) +
    (color[1].toString(16)).substr(1) +
    (color[2].toString(16)).substr(1);

  this.dom.style.color = '#'+
    ((512 -color[0]).toString(16)).substr(1) +
    ((512 -color[1]).toString(16)).substr(1) +
    ((512 -color[2]).toString(16)).substr(1);
};

ColorUI.prototype.makeColor = function makeColor(a, b, g) {
  var red = abs(a*100) % 255;
  var green = abs(b*100) % 255;
  var blue = abs(g*100) % 255;
  var bright = 60;

  return [
    (0|(1<<8) + red + (256 - red) * bright / 100),
    (0|(1<<8) + green + (256 - green) * bright / 100),
    (0|(1<<8) + blue + (256 - blue) * bright / 100)
  ];
};

