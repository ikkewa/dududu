
var buildPath = './build/';
var distPath = './dist/';
var appPath = './app/';
var assetsPath = './assets/';

module.exports = {
  appPath: appPath,
  buildPath: buildPath,
  distPath: distPath,

  dist: {
    srcPath: buildPath + 'index.html',
    distPath: distPath
  },

  clean: {
    srcPath: [
      distPath + '*',
      buildPath + '*'
    ]
  },

  styles: {
    srcPath: appPath + 'stylesheets/style.styl',
    watchPath: appPath + 'stylesheets/**/*.styl',
    buildPath: buildPath + 'css',
    distPath: distPath + 'css',
  },

  markup: {
    srcPath: [
      appPath + '*.jade'
    ],
    buildPath: buildPath,
    distPath: distPath
  },

  jshint: {
    srcPath: [
      appPath + '**/*.js'
    ]
  },

  copyjs: {
    srcPathBuild: [
      assetsPath + 'js/devreload.js'
    ],
    srcPathDist: [
    ],
    buildPath: buildPath + 'js',
    distPath: distPath + 'js'
  },

  copyassets: {
    srcPath: [
      assetsPath + 'sounds/**/*',
      assetsPath + 'images/dance.gif'
    ],
    buildPath: buildPath + 'assets/',
    distPath: distPath + 'assets/'
  },

  browserify: {
    entryPoint: appPath + 'js/index.js',
    buildPath: buildPath + 'js',
    distPath: distPath + 'js'
  }
};
