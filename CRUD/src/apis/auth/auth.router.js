import authController from './auth.controller'
import express from 'express'
const route = express.Router()
route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/forgotpassword',authController.forgotPassword)
route.post('/resetpassword', authController.resetPassword)

export default route
