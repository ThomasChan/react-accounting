var path = require('path');
var webpack = require('webpack')

module.exports = {
	cache: true,
	devtool: 'eval',
	entry: [
    	// 'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist',
		pathinfo: true
	},
	module: {
		loaders: [
		    {
		      test: /\.css?$/,
		      loaders : [
		        'style-loader',
		        'css-loader'
		      ]
		    },
		    {
		      test: /\.less?$/,
		      loaders : [
		        'style-loader',
		        'css-loader',
		        'less-loader?{"sourceMap":true}'
		      ],
		      include: __dirname
		    },
			{
				test: /\.js?$/,
				exclude: /node-modules/,
				loaders: ['babel?compact=false']
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
    	// new webpack.HotModuleReplacementPlugin(),
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
                // ,drop_console: true
            },
            sourceMap: false,
            mangle: false,
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
