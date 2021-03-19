const { argv } = require('yargs');

module.exports = api => {
	const env = argv.env || [];
	const mode = !!env.find(value => value === 'mode=dev')
		? 'development'
		: 'production';

	// This caches the Babel config by environment.
	api.cache.using(() => mode);

	return {
		presets: [
			'@babel/typescript',
			['@babel/env', { modules: false }],
			'@babel/preset-react'
		],
		plugins: [
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-export-namespace-from',
			'@babel/plugin-proposal-throw-expressions',
			'@babel/proposal-object-rest-spread',
			[
				'@babel/plugin-transform-spread',
				{
					loose: true
				}
			],
			// Applies the react-refresh Babel plugin on non-production modes only
			mode !== 'production' && 'react-refresh/babel'
		].filter(Boolean)
	};
};
