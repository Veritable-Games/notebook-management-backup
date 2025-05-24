const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {	
    mode: 'development', // or 'production'
    entry: path.resolve(__dirname, 'main.js'),
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Re-enable babel loader for proper transpilation
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(glb|gltf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/models',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|otf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            three: path.resolve(__dirname, 'node_modules/three'),
        },
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false,
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "vm": require.resolve("vm-browserify"),
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9003,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
        }),
    ],
};
