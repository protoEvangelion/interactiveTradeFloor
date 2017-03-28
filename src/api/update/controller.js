import { success } from 'services/response'
import { Booth } from '.'

// displays booths
export const update = (req, res, next) => {
  console.log(req.body)
  Booth.findOneAndUpdate({ num: req.body.data.num }, {
    company: req.body.data.company,
    owner: req.body.data.owner,
    status: req.body.data.status,
    description: req.body.data.description,
  })
    .then(success(res))
    .catch(next)
}
