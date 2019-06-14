const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/public/scripts/index.js',
        indexCss: './src/public/styles/index.css',
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'src/dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
        new CopyPlugin([
            {
                from: 'src/public/*.ico',
                to: 'favicon.ico',
                flatten: true,
            },
            {
                from: 'src/public/images',
                to: 'images/',
            }
        ])
    ],
};
