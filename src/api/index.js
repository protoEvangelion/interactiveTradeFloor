import { Router } from 'express'
import post from 'api/post'
import read from 'api/read'
import update from 'api/update'

const router = new Router()

router.use('/posts', post)
router.use('/read', read)
router.use('/update', update)

export default router
