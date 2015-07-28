
module.exports = Sound;

/**
 * Class to handle the loading of a sound
 * and playing it back.
 * Pauses the sound and restarts it if needed.
 *
 * @param {Object} opts optios
 */
function Sound(opts) {
  opts = opts || {};

  this.volume = opts.volume || 0.5;
  this.url = opts.url;

  this.ctx = new AudioContext();
  this.muteRate = 0.000000001;
  this.playRate = 1;

  if(this.ctx.createGain) {
    this.gainNode = this.ctx.createGain();
  } else {
    this.gainNode = this.ctx.createGainNode(); // for old webkit version
  }
  this.gainNode.gain.value = this.volume;
  this.gainNode.connect(this.ctx.destination);

  this.loadSource(this.url, this.onSoundLoaded.bind(this));
}

/**
 * Loads the sound file from the remove location
 * and calls a callback with the source when done.
 *
 * Implments a caching mechanism, by storing the loaded
 * sound in a local variable, which can be used for the
 * next createBufferSource() call
 *
 * @param {String} url the url of the sound file
 * @param {Function} cb Callback called when sound is loaded
 */
Sound.prototype.loadSource = function loadSource(url, cb) {
  if(this.storedBuffer) {
    return cb(null, this.createSource(this.storedBuffer).bind(this));
  }

  var _this = this;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function onLoad() {
    _this.ctx.decodeAudioData(
      request.response,
      function onSuccess(buf) {
        _this.storedBuffer = buf;
        return cb(null, _this.createSource(buf));
      },
      function onError(err) {
        console.log('error loading sound :(');
      }
    );
  };

  request.send();
};

/**
 * Helper function to create the buffersource
 * from the arraybuffer.
 *
 * @param {Buffer} buf the sound as buffer
 * @return {AudioBufferSourceNode} playable ready sound context
 */
Sound.prototype.createSource = function createSource(buf) {
  var source = this.ctx.createBufferSource();
  source.buffer = buf;
  source.connect(this.gainNode);
  source.loop = true;
  source.looping = true; // for old webkit version

  if(!source.start) {
    source.start = source.noteOn;
  }
  if(!source.stop) {
    source.stop = source.noteOff;
  }

  return source;
};

/**
 * Interal callback after a sound was initially loaded
 * from the remote location
 *
 * @param {Error} err
 * @param {AudioBufferSourceNode} sound
 */
Sound.prototype.onSoundLoaded = function onSoundLoaded(err, sound) {
  if(err) {
    return console.log('Oops, error loading sound :(');
  }

  this.sound = sound;
  this.sound.playbackRate.value = this.muteRate;
  this.sound.start(0);
};


/**
 * Starts to play the sound by setting
 * the playback speed to 1 (normal speed)
 *
 * @param {Event} e
 */
Sound.prototype.onStart = function onStart(e) {
  this.sound.playbackRate.value = this.playRate;
};

/**
 * Stops the playback of the sound
 *
 * @param {Event} e
 */
Sound.prototype.onEnd = function onEnd(e) {
  if(this.sound) {
    this.sound.playbackRate.value = this.muteRate;
  }
};

/**
 * Handler to make sure, that the playback rate
 * is at normal speed when the phone is moving
 *
 * @param {Event} e
 */
Sound.prototype.onMove = function onMove(e) {
  this.sound.playbackRate.value = this.playRate;
};

/**
 * Handler when the phone is not moving anymore
 *
 * Reduces the speed of the sound to indicate the
 * user that he is not moving (enough) the phone
 */
Sound.prototype.onNotMove = function onNotMove() {
  this.sound.playbackRate.value -= 0.2;
};
