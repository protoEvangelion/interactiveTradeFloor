import { success } from 'services/response'
import { Booth } from '.'

// displays booths
export const show = (req, res, next) => {
  Booth.find().sort({ row: 1, col: 1 })
    .then(success(res))
    .catch(next)
}
