var domready = require('domready');
var raf = require('raf');
var ColorUI = require('./ui');
var Sound = require('./sound');
var Input = require('./input');


domready(function() {

  var url = 'assets/sand.mp3';
  var el = document.body;
  var ctx;

  // init and setup
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


  var input = new Input({
    dom: el
  });

  var ui = new ColorUI({
    dom: el,
  });

  var sound = new Sound({
    url: url,
    volumne: 0.5
  });


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

  function deviceMotionHandler(e) {
    e.preventDefault();
    ui.handleMotionEvent(e);
    input.handleMotionEvent(e);
  }

  function devOrientHandler(e) {
    e.preventDefault();
    input.handleOrientationEvent(e);
  }



  if(window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', devOrientHandler, false);
  }
});

