const webpack = require("webpack");
const path = require("path");
const deps = require("./package.json").dependencies;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    output: {
        publicPath: 'auto',
      },
      optimization: {
        splitChunks: false,
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
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
          }),
        new ModuleFederationPlugin({
            name: "remoteMfe",
            filename: "remoteEntry.js",
            exposes: {
                './TodoPlus': "./src/components/TodoPlus.vue",
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

}