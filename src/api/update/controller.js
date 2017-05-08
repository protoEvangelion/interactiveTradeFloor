import { success } from 'services/response'
import lbBooth from '../read/lbModel'
import laBooth from '../read/laModel'

// displays booths
export const update = (req, res, next) => {
  if (req.body.data.path === '/la') {
    laBooth.findOneAndUpdate({ num: req.body.data.num }, {
      company: req.body.data.company,
      owner: req.body.data.owner,
      status: req.body.data.status,
      description: req.body.data.description,
    })
      .then(success(res))
      .catch(next)
  } else if (req.body.data.path === '/lb') {
    lbBooth.findOneAndUpdate({ num: req.body.data.num }, {
      company: req.body.data.company,
      owner: req.body.data.owner,
      status: req.body.data.status,
      description: req.body.data.description,
    })
      .then(success(res))
      .catch(next)
  }
}
