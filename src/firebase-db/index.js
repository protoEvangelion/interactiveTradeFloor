import * as firebase from 'firebase'
import '@firebase/functions'

import { FIREBASE_CONFIG } from '../../secretVariables'

if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_CONFIG)
}

const auth = firebase.auth()
const db = firebase.database()
const functions = firebase.functions()

const provider = new firebase.auth.GoogleAuthProvider()

export { auth, db, functions, provider }
