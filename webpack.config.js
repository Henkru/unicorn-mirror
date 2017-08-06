const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = [
    {
        name: 'Client',
        devtool: '#eval-source-map',
        entry: './client/index.js',
        output: {
            path: path.resolve('dist/'),
            filename: 'index_bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
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
            ]
        },
        plugins: [HtmlWebpackPluginConfig],
        devServer: {
            contentBase: path.join(__dirname, "dist")
        }
    }
]