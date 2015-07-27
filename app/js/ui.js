
module.exports = ColorUI;

var round = Math.round;
var abs = Math.abs;

/**
 * Class to calculate the color if the screen
 * based on the movement of the phone
 *
 * Also draws the color the given DOM element
 *
 * @param {Object} opts options
 */
function ColorUI(opts) {
  this.dom = opts.dom || document.body;
  // acceleration
  this.ax = 0;
  this.ay = 0;
  this.az = 0;
  this.aa = 0;
  this.ab = 0;
  this.ag = 0;
}

/**
 * Handles the DeviceMotionEvent and uses
 * the acceleration values to calc the accelation
 * on each axis and with the rotation data the other.
 *
 * @param {DeviceMotionEvent} e
 */
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

/**
 * Draws the screen background and font color
 * based on the acceleration values
 *
 * The background color is tuned to look nice.
 * the conf color is the inversed color of the
 * background color, so a high contrast should be visible
 */
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

/**
 * Create a color based on the acceleration alpha/beta/gamme
 * values and returns a array of integers for RGB
 *
 * @param {Number} a acceleration alpha
 * @param {Number} b acceleration beta
 * @param {Number} g acceleration gamma
 * @return {Array} if ints [r, g, b]
 */
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

