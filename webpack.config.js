const Path = require("path");

const Package = require("./package.json");

function resolve(path) {
  return Path.resolve(__dirname, path);
}

module.exports = {
  mode: `production`,
  entry: [resolve(`./index.js`)],
  output: {
    path: resolve(`dist`),
    filename: `roo.min.js`, // `${Package.name}.js`,
    libraryTarget: `var`
  },
  optimization: {
    minimize: true
  },
  externals: {}
};
