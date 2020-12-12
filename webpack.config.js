const { resolve } = require("path")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: resolve(__dirname, "src/main.js"),
    output: {
        path: resolve(__dirname),
        filename: "featherweb.js"
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    }
}