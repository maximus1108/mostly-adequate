const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
      //append webpack-dev-server and hot module replacement to entry point
      //to allow for auto reloading when any dependancy is updated.
      "webpack-dev-server/client?http://localhost:8080/",
      "webpack/hot/dev-server",

      //entry point for app
      "./ch-6/index.js"
    ],    
    output: {
        //Set location for where bundled js should be served
        path: __dirname,
        filename: "main.js"
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'index.html'),
            excludeAssets: [/\.s?css/]
        })
    ]
};