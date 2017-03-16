import { Router } from 'express'
import { middleware as querymen } from 'querymen'
import { show } from './controller'

const router = new Router()

router.get('/',
  querymen(),
  show
)

export Booth, { schema } from './model'

export default router
