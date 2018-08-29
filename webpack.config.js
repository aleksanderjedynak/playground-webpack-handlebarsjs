const { resolve } = require('path');
const webpack = require('webpack');
const etwp = require('extract-text-webpack-plugin');
const HtmwWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env){

    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;
    
    return {
        // entry: "./src/js/app.js",
        entry: {
            app: "./src/js/app.js",
            vendors: ["jquery"]
        },

        output: {
            publicPath: dev ? "/dist/" : "",
            path: resolve(__dirname, "dist/"),
            // filename: "bundle.js"
            filename: prod ? "[name].[chunkhash].js" : "[name].js" 
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
                    /*tutaj uzywamy plugina loaderow do styli*/
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
                /*file-loader dziala podobnie jak url-loder*/ 
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
            new etwp("main.css"),
            /*ten plagin jesli mu nie podamy template sam wygeneruje plik index.html*/
            new HtmwWebpackPlugin({
                template: "./src/index.html",
            }),
            /*wyciągamy jQuery z app i zostawimay tylko w vendors*/
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors",
            }),
        ]

    };
};