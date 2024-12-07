import verify from '../../middleware/verify.middleware'
import authController from './auth.controller'
import express from 'express'
const route = express.Router()
route.post('/login', authController.login)
route.post('/register', authController.register)
route.post('/forgotpassword', authController.forgotPassword)
route.post('/resetpassword', authController.resetPassword)

route.get('/getpoll', authController.getAllPoll)
route.get('/getpollbyid/:id', authController.getPollById)
route.get('/getAllOptionOfPoll/:id', authController.getAllOptionOfPoll)

route.post('/createpoll', verify, authController.createPoll)
route.post('/vote', verify, authController.vote)
route.post('/createoption', authController.createOption)

route.put('/updatepoll/:id', verify, authController.updatePoll)
route.put('/updateOptionOfPoll', authController.updateOptionOfPoll)
// route.put('/updatevoteofoption', authController.updateVoteOfOption);

route.delete('/deletepoll/:id', verify, authController.deletePoll)
route.delete('/deleteoption/:id', authController.deleteOption)
route.delete('/deletevote/:id', verify, authController.deleteVote)

export default route
