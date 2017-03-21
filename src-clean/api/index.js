import { Router } from 'express'

import read from 'api/read'

const router = new Router()

router.use('/read', read)

export default router
