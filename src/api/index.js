import { Router } from 'express'
import post from 'api/post'
import read from 'api/read'

const router = new Router()

router.use('/posts', post)
router.use('/read', read)

export default router
