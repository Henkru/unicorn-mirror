const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: "./css/style.css",
    allChunks: true
})

module.exports = [
    {
        name: 'Client',
        devtool: '#eval-source-map',
        entry: './client/index.js',
        output: {
            path: path.resolve('dist/client/'),
            filename: 'index_bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: [
                        path.join(__dirname, 'client'),
                        path.join(__dirname, 'modules')
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: "css-loader"
                    })
                },
                {
                    test: /fonts\/.+\.(ttf|woff2?|eot|svg)$/,
                    loader: "file-loader?name=/fonts/[name].[ext]"
                },
            ]
        },
        plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
    }
]