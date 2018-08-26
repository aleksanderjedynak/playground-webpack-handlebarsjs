const { resolve } = require('path');
const etwp = require('extract-text-webpack-plugin');

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
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                // use:[
                //     {loader: "style-loader"},
                //     {loader: "css-loader"},
                //     {loader: "sass-loader"}
                // ],
                use: etwp.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            },
            // {
            //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            //     use: {
            //         loader: "file-loader",
            //     }
            // },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options:{
                        limit: 10000,
                        name: "[name].[ext]",
                    },
                }
            }

        ]
    },

    plugins: [
        // new etwp({}),
        new etwp("main.css")
    ]

    
};