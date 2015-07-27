var domready = require('domready');
var raf = require('raf');
var ColorUI = require('./ui');
var Sound = require('./sound');
var Input = require('./input');


/**
 * Called when the DOM is ready
 */
domready(function() {
  var url = 'assets/sand.mp3';
  var el = document.body;
  var ctx;

  // Test the capabilities of the phone
  // There should be available
  //  - WebAudioContext
  //  - DeviceMotion
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();
  } catch(e) {
    return alert('your device does not support audiocontext, maybe try newest chrome!');
  }

  if(!window.DeviceMotionEvent) {
    return alert('Hmm, your device does not support DeviceMotion. This is needed :(');
  }
  ctx = null;


  var input = new Input({ dom: el });
  var ui = new ColorUI({ dom: el, });
  var sound = new Sound({
    url: url,
    volumne: 0.5
  });

  // Event bindings. Bind events that are emitted by
  // input module that controlls the sound and ui
  input.on('start', function() {
    sound.onStart();
  });
  input.on('move', function() {
    sound.onMove();
    ui.draw();
  });
  input.on('not-moving', function() {
    sound.onNotMove();
  });
  input.on('end', function() {
    sound.onEnd();
  });

  /**
   * EventHandler function for DeviceMotion
   *
   * @param {DeviceMotionEvent} e
   */
  function deviceMotionHandler(e) {
    e.preventDefault();
    ui.handleMotionEvent(e);
    input.handleMotionEvent(e);
  }

  /**
   * EventHandler function for DevieOrientation
   *
   * @param {DeviceOrientationEvent} e
   */
  function devOrientHandler(e) {
    e.preventDefault();
    input.handleOrientationEvent(e);
  }

  // DOM event binding
  if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', devOrientHandler, false);
  }
});

