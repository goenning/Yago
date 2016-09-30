module.exports = {
  entry: "./test/www/App.test.ts",
  output: {
    path: __dirname + "/dist/test/www",
    filename: "bundle.test.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { 
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    "react": "React",
    "jquery": "jQuery",
    "react-dom": "ReactDOM"
  },
  ts: {
    compilerOptions: {
      declaration: false
    }
  }
};