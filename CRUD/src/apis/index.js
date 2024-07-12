import express from 'express'
import userRouter from '../apis/users/user.router'
import authRouter from '../apis/auth/auth.router'
import storage from '../index'


const router = express.Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)

export default router
