import { success } from 'services/response'
import { Booth } from '.'

// displays booths
export const update = (req, res, next) => {
  Booth.find({ num: 612 })
    .then(success(res))
    .catch(next)
}
