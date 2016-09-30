module.exports = {
  entry: "./src/www/index.tsx",
  output: {
    path: __dirname + "/dist/src/www",
    filename: "bundle.js",
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
      },
      { 
        test: /\.(html|png|min\.css|woff|woff2|eot|ttf|svg|jpg|gif)$/, 
        loader: "file?name=[path][name].[ext]&context=src/www" 
      },
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