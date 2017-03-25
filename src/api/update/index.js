import { Router } from 'express'
import { middleware as querymen } from 'querymen'
import { update } from './controller'

const router = new Router()

router.get('/update',
  querymen(),
  update
)

export Booth, { schema } from '../read/model'

export default router
