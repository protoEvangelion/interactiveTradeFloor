const path = require('path')
const { FLOORPLAN_PAGES } = require('./src/appConfig')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	FLOORPLAN_PAGES.map(page => {
		const floorplanPage = Object.assign({}, page, {
			component: path.resolve(page.component),
		})
		console.log('FORLKJSDFLKJDF', floorplanPage)
		createPage(floorplanPage)
	})
}

exports.modifyBabelrc = ({ babelrc }) => ({
	...babelrc,
	...(process.env.NODE_ENV !== 'development' && {
		plugins: babelrc.plugins.concat(['transform-regenerator', 'transform-runtime']),
	}),
})
