import { success } from 'services/response'
import { Booth } from '.'

// displays booths
export const show = (req, res, next) => {
  Booth.find()
    .then(success(res))
    .catch(next)
}
