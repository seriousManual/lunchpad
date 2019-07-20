const path = require('path');

module.exports = {
  entry: './src/indexBrowser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lunchpad.min.js',
    library: 'lunchpad',
    libraryTarget: 'umd'
  }
};