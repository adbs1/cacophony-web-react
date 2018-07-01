const path = require('path');
const webpack = require('webpack');
const config = require('./app.config');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		path.resolve('src/index.js')
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, ''),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
// Don't use .babelrc in `yarn link`-ed dependency's directory and use in current direction instead
				loader: 'babel-loader?babelrc=false&extends=' + path.resolve(__dirname, '.babelrc')
			},
			{
				test: /\.js?/,
				exclude: [/node_modules/, /public/],
				use: [
					"babel-loader",
					{
						loader: 'eslint-loader',
						options: {
							emitError: true
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					//{ loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } },
					{ loader: 'css-loader', options: { importLoaders: 1, modules: false } },
					'postcss-loader'
				]
			}
			,{
				test: /\.scss$/,
				use: [
					'style-loader',
					//{ loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' } },
					{ loader: 'css-loader', options: { importLoaders: 1, modules: false } },

					{ loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					{ loader: 'sass-loader', options: {
						sourceMap: true
					}}
				]
			},
			{
// ASSET LOADER
				test: /\.(woff|woff2|ttf|eot)$/,
				loader: 'file-loader?name=/public/icons/[name].[ext]'
			},
			{
//IMAGE LOADER
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader:'file-loader',
				options: {
					name: '[path][name].[ext]',
//					outputPath: path.resolve('src/public/images/'),
//					publicPath: '/'
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	resolveLoader: {
		modules: [
			'node_modules'
		]
	},
	externals: config
}
