import { db } from './'

export const preloadLABooths = () =>
  db
    .ref('la/')
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(err => console.log('Error preloading la booths', err))
