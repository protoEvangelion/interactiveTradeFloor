import { db } from './'
import { capFirstLetter, firstLetterIsUpper } from 'constants'

export default function listenForBoothChanges(city = 'la', loadBooths) {
  db.ref(`${city}/`).on('value', snapshot => {
    const boothsArr = snapshot.val().map(booth => {
      if (booth.owner && !firstLetterIsUpper(booth.owner)) {
        return { ...booth, owner: capFirstLetter(booth.owner) }
      }
      return booth
    })

    loadBooths(boothsArr)
  })
}
