const { join } = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/client.js'
  },
  output: {
    filename: 'client.js',
    path: join(process.cwd(), 'dist')
  }
};
