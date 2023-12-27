const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		bundle: [
			'./src/index.js',
			'./src/lib/cross-document-references-macro.js', // Macro extensions
			'./src/lib/git-macro.js',
			'./src/lib/inter-document-references-macro.js',
			'./src/lib/man-macro.js',
			'./src/lib/packages-macro.js',
			'./src/lib/sectnumoffset-treeprocessor.js',
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			chunks: ['bundle'],
			inject: 'body',
		}),
		new HtmlWebpackPlugin({
			template: './public/pages/help.html',
			filename: 'pages/help.html',
			chunks: [],
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'public/styles', to: 'styles' },
				{ from: 'public/config.json', to: 'config.json' },
				{ from: 'public/favicon.ico', to: 'favicon.ico' },
				{ from: 'public/.nojekyll', to: '.nojekyll', toType: 'file'},
			],
		}),
	],
}
