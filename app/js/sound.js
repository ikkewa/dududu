
module.exports = Sound;

function Sound(opts) {
  opts = opts || {};

  this.volume = opts.volume || 0.5;
  this.url = opts.url;

  this.ctx = new AudioContext();
  this.muteRate = 0.000000001;
  this.playRate = 1;

  this.gainNode = this.ctx.createGain();
  this.gainNode.gain.value = this.volume;
  this.gainNode.connect(this.ctx.destination);

  this.loadSource(this.url, this.onSoundLoaded.bind(this));
}

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

Sound.prototype.createSource = function createSource(buf) {
  var source = this.ctx.createBufferSource();
  source.buffer = buf;
  source.connect(this.gainNode);
  source.loop = true;

  return source;
};

Sound.prototype.onSoundLoaded = function onSoundLoaded(err, sound) {
  if(err) {
    return console.log('Oops, error loading sound :(');
  }

  this.sound = sound;
  this.sound.playbackRate.value = this.muteRate;
  this.sound.start(0);
};


Sound.prototype.onStart = function onStart(e) {
  this.sound.playbackRate.value = this.playRate;
};

Sound.prototype.onEnd = function onEnd(e) {
  if(this.sound) {
    this.sound.playbackRate.value = this.muteRate;
  }
};

Sound.prototype.onMove = function onMove(e) {
  this.sound.playbackRate.value = this.playRate;
};

Sound.prototype.onNotMove = function onNotMove() {
  this.sound.playbackRate.value -= 0.2;
};
