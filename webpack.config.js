const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports ={
    mode: 'development',
    entry: {
        filename: path.resolve(__dirname, 'src/style.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        assetModuleFilename: '[name][ext]'
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
    devServer: {
        port: 9000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Minesweeper',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
}