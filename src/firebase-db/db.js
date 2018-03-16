import { db } from './'

export const getBooths = (city = 'la') =>
  db
    .ref(`${city}/`)
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.log(`Error preloading ${city} booths`, err))
