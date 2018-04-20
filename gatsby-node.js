const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	createPage({
		path: '/la',
		component: path.resolve(`./src/components/index.js`),
		layout: `index`,
		context: {
			id: `123456`,
		},
	})
}

exports.modifyBabelrc = ({ babelrc }) => ({
	...babelrc,
	plugins: babelrc.plugins.concat(['transform-regenerator']),
})
