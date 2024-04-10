const webpack = require("webpack");
const path = require("path");
const deps = require("./package.json").dependencies;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: './src/main.ts',
    output: {
        uniqueName: "remoteMfe",
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        asyncChunks: true,
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: "async",
        },
        flagIncludedChunks: true,
        mergeDuplicateChunks: true,
        minimize: true,
    },
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

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "remoteMfe",
            filename: "remoteEntry.js",
            exposes: {
                './Todo': "./src/components/Todo.vue",
            },


        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "index.html"),
            inject: true
        }),
        new NodePolyfillPlugin(),

    ],
    devServer: {
        port: "3001",
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