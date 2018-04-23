const path = require('path')
const { FLOORPLAN_PAGES } = require('./config')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	FLOORPLAN_PAGES.map(page => {
		const floorplanPage = Object.assign({}, page, {
			component: path.resolve('./src/components/index.js'),
			layout: 'index',
		})
		console.log('Createing dynamic page ===>\n', floorplanPage, '\n')

		// https://www.gatsbyjs.org/docs/bound-action-creators/#createPage
		createPage(floorplanPage)
	})
}

exports.modifyBabelrc = ({ babelrc }) => ({
	...babelrc,
	...(process.env.NODE_ENV !== 'development' && {
		plugins: babelrc.plugins.concat(['transform-regenerator', 'transform-runtime']),
	}),
})
