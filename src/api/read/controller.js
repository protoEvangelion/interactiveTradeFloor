import { Booth } from '.'
import { success } from 'services/response'

// displays booths
export const show = (req, res, next) => {
  Booth.find().sort({ row: 1, col: 1 })
    .then(success(res))
    .then(() => console.log('check ==='))
    .catch(next)
}
