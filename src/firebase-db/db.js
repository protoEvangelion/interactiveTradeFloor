import { db } from './'
import { capFirstLetter, firstLetterIsUpper } from 'constants'

export const getBooths = (city = 'la') =>
  db
    .ref(`${city}/`)
    .once('value')
    .then(snapshot => {
      const bootsArr = snapshot.val()

      // Normalize (uppercase) booth owner first letter
      return bootsArr.map(booth => {
        if (booth.owner && !firstLetterIsUpper(booth.owner)) {
          return { ...booth, owner: capFirstLetter(booth.owner) }
        }
        return booth
      })
    })
    .catch(err => console.log(`Error preloading ${city} booths`, err))
