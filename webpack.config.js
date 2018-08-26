const { resolve } = require('path');

module.exports = {

    entry: "./src/js/app.js",
    output: {
        publicPath: "/dist/",
        path: resolve(__dirname, "dist/"),
        filename: "bundle.js"
    },

    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets: ["es2015"]
                    }
                }
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: {
                    loader: "handlebars-loader"
                }
            }
        ]
    }
    
};