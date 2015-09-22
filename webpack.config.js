module.exports = {
    entry: "./public/javascripts/src/main.jsx",
    output: {
        filename: "./public/javascripts/build/bundle.js",
        sourceMapFilename: "[file].map"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}
