'use strict';

var livecon = new WebSocket('ws://localhost:35729/livereload');
livecon.onerror = function(err) {
  console.log('LiveReload Error', err);
};

livecon.onmessage = function(ev) {
  if(ev && ev.data) {
    var data = JSON.parse(ev.data);
    if(data && data.command === 'reload') {
      window.location.reload();
    }
  }
};

