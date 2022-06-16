const path = require('path');

module.exports = (env) => ({
  mode: !env.prodction ? 'development' : 'production',
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
});