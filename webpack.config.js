var webpack = require('webpack')

module.exports = {
	devtool: 'inline-eval-cheap-source-map',
	entry: './assets/index.jsx',
	output: {
		path: './dist/js/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.jsx?$/,
				exclude: /node-modules/,
				loaders: ['babel?compact=false']
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true
                ,drop_console: true
            },
            sourceMap: false,
            // mangle: false,
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
	]
}
