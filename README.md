# dududu
Dance with your phone

## What is this?
Little mobile experiment for testing deviceMotion and deviceOrientation together with WebAudio

## Demo
Visit GitHub Pages of this repository [Demo](http://ikkewa.github.io/dududu/) with your 
mobile device, touch the display and shake your phone.
You should hear a sound and the display should be colorful as it can be

## What I learned from this?

 - work with deviceOrientation and deviceMotion
 - WebAudio and all gotchas
 - WebAudio can not simply "pause" an audio, replay it or set "playbackRate" to 0.000001 (0 not valid)
 - impotance of meta tag "viewport" as touch events did not work as expected without it
 - chrome debugging with usb connected phone devices ([see chrome docs](https://developer.chrome.com/devtools/docs/remote-debugging)
 - gulp workflow (dev, build, dist)
 
 
## What did not work as expected?

 - gh-pages as submodules, tried multiple times. branched gh-pages with submodule


## LICENSE of source code
MIT
