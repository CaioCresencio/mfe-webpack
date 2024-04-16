const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
    
    mode: "development",
    entry: './src/index.ts',
    output: {
        publicPath: 'auto', // <- ERROR: Avoid modifying webpack output.publicPath directly. Use the "publicPath" option instead.
      },
      optimization: {
        splitChunks: false,
      },
    cache: false,
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    target: 'web',
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true,
                    },
                },
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            },

            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                },
            }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "host",
            filename: "remoteEntry.js",
            remotes: {
                remoteMfe: `remoteMfe@http://localhost:3001/remoteEntry.js`,
            },
            shared: {
              ...deps
            },
         
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "index.html"),
            inject: true
        }),
    ],
    devServer: {
        port: "3002",
        static: {
            directory: path.join(__dirname, "index.html"),
        },
        historyApiFallback: true,
        compress: true,
        client: {
            progress: true,
            reconnect: 5,
            overlay: {
                errors: true,
                warnings: false,
            },
        }, headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
    }

}