const { resolve } = require('path');
const webpack = require('webpack');
const etwp = require('extract-text-webpack-plugin');
const HtmwWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env){

    var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;
    
    return {
        /** rozdzialamy aby mieć app i vendors */ 
        // entry: "./src/js/app.js",
        entry: {
            app: "./src/js/app.js",
            vendors: ["jquery"]
        },

        output: {
            publicPath: dev ? "/dist/" : "",
            path: resolve(__dirname, "dist/"),
            // filename: "bundle.js"
            /** tak aby miec chunkhash w nazwach plikow -> przydaje sie na produkcje */
            filename: prod ? "[name].[chunkhash].js" : "[name].js" 
        },

        devtool: prod ? "source-map" : "cheap-module-eval-source-map",

        module: {
            rules:[
                {
                    /** javascript, kompilacja do js5, importowanie plikow */
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options:{
                            presets: ["es2015"],
                            plugins: ["syntax-dynamic-import"]
                        }
                    }
                },
                {
                    /** handlebars */
                    test: /\.hbs$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "handlebars-loader"
                    }
                },
                {
                    /** scss */
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    /** tutaj uzywamy plugina loaderow do styli*/
                    // use:[
                    //     {loader: "style-loader"},
                    //     {loader: "css-loader"},
                    //     {loader: "sass-loader"}
                    // ],
                    /** extract-text-webpack-plugin z loaderami */
                    use: etwp.extract({
                        fallback: "style-loader",
                        use: "css-loader!sass-loader",
                    })
                },
                /** file-loader dziala podobnie jak url-loder*/
                // {
                //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                //     use: {
                //         loader: "file-loader",
                //     }
                // },
                {
                     /** url-loader ma wiecej opcji niz file-loader*/
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
            /** tak podczepiamy extract-text-webpack-plugin */
            new etwp("main.css"),
            /** ten plagin jesli mu nie podamy template sam wygeneruje plik index.html*/
            new HtmwWebpackPlugin({
                template: "./src/index.html",
            }),
            /** wyciągamy jQuery z app i zostawimay tylko w vendors*/
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendors",
            }),
            /** moduly bez importow  */
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            }),
        ]

    };
};