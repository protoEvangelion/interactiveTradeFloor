const admin = require('firebase-admin')
const functions = require('firebase-functions')

// var serviceAccount = require('path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// })

exports.emailTeam = functions.https.onCall((data, context) => {
	return {
		auth: {
			uid: context.auth.uid,
			name: context.auth.token.name || null,
			email: context.auth.token.email || null,
		},
	}
})
