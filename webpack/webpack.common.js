const paths = require('./paths');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract css to files

module.exports = {
	// Where webpack looks to start building the bundle
	entry: [paths.src + '/index.tsx'],

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/'
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css'
		}),

		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.src + '/assets',
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store']
					}
				}
			]
		}),

		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: '',
			// favicon: paths.src + '/assets/images/favicon.png',
			template: paths.public + '/index.html', // template file
			filename: 'index.html' // output file
		})
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},

			{
				test: /\.mp4$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/videos'
						}
					}
				]
			},

			{
				test: /\.(ttf|eot|woff|woff2|svg|png)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/fonts/',
						esModule: false
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {
			'~': paths.src
		}
	}
};
