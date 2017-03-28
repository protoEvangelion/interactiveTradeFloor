import { Router } from 'express'
import { middleware as bodymen } from 'bodymen'
import { update } from './controller'
import { schema } from '../read/model'

const router = new Router()
const { num, owner, company, description, status } = schema.tree

router.put('/',
  bodymen({ num, owner, company, description, status }),
  update
)

export Booth, { schema } from '../read/model'

export default router
