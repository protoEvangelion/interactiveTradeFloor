import * as firebase from 'firebase'
import '@firebase/functions'

const prodConfig = {
	apiKey: 'AIzaSyBaZ-rCxkURyyMtj1nlc8URhOS4UMI1URs',
	authDomain: 'tradeshow-163804.firebaseapp.com',
	databaseURL: 'https://tradeshow-163804.firebaseio.com/',
	projectId: 'tradeshow-163804',
	storageBucket: '',
	messagingSenderId: '574611677035',
}

const devConfig = {
	apiKey: 'AIzaSyBaZ-rCxkURyyMtj1nlc8URhOS4UMI1URs',
	authDomain: 'tradeshow-163804.firebaseapp.com',
	databaseURL: 'https://tradeshow-163804.firebaseio.com/',
	projectId: 'tradeshow-163804',
	storageBucket: '',
	messagingSenderId: '574611677035',
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.database()
const functions = firebase.functions()

const provider = new firebase.auth.GoogleAuthProvider()

export { auth, db, functions, provider }
