import * as firebase from 'firebase'

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

const db = firebase.database()
const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
