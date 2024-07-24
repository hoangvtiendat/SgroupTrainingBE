import userModel from '../../models/users.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import mailService from './mail.servicer'
dotenv.config()
class authService {
    constructor() {
        this.userModel = new userModel()
    }
    async getUserByusername(username, password) {
        try {
            const user = await this.userModel.getUserByUsername(username)
            console.log(user)
            if (!user) {
                throw new Error('User not found')
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user[0].password
            ) // So sánh mật khẩu nhập vào với mật khẩu đã hash trong database
            if (!isPasswordValid) {
                console.log(
                    'user: ' + username + ' password: ' + user[0].password
                )
                throw new Error('Wrong password') // Nếu mật khẩu không đúng, ném ra lỗi
            }
            // Generate token
            const token = jwt.sign(
                {
                    id: user[0].id,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )

            return { token: token }
            // return user
        } catch (error) {
            throw error
        }
    }

    async register(username, email, password, gender, age, role) {
        try {
            // kiem tra nguoi dung da co trong db chua
            const existingUser = await this.userModel.getUserByEmail(email)
            console.log('existing user', existingUser)
            if (existingUser.length == 0) {
                const hashesPassword = await bcrypt.hash(password, 10) //hash password voi salt round  = 10

                const newUser = {
                    username,
                    email,
                    password: hashesPassword,
                    gender,
                    age,
                    role,
                }
                await this.userModel.createUser(newUser)
                return { message: 'register success' }
            }
            throw new Error('email already')
        } catch (error) {
            throw error
        }
    }

    // async forgotPassword(email) {
    //     try {
    //         const user = await this.userModel.getUserByEmail(email)
    //         if (!user) {
    //             throw new Error('User not found')
    //         }
    //         // generate random token
    //         const token = jwt.sign(
    //             {
    //                 id: user[0].id,
    //             },
    //             process.env.JWT_SECRET,
    //             { expiresIn: process.env.JWT_FORGOT_PASSWORD_EXPIRES_IN }
    //         )

    //         // send email with token
    //         await mailService.sendResetPasswordEmail(email, token)

    //         return { message: 'Password reset link has been sent to your email' }

    //         return { message: 'Password reset link has been sent to your email' }
    //     } catch (error) {
    //         throw error
    //     }
    // }
    async forgotPassword(email) {
        try {
            console.log(1)
            const user = await this.userModel.getUserByEmail(email)
            if (user.length == 0) {
                throw new Error('User not found')
            }

            // const token = jwt.sign(
            //     {
            //         id: user[0].id,
            //     },
            //     process.env.JWT_SECRET,
            //     { expiresIn: process.env.JWT_FORGOT_PASSWORD_EXPIRES_IN }
            // )
            const token = Math.floor(100000 + Math.random() * 900000).toString()
            console.log('token: ', token)
            console.log('mailToServicer: ', email)
            await mailService.sendEmail(email, 'TOKEN RESET PASSWORD', token)

            //Save token and exp to database
            const resetPasswordExpires = new Date()
            resetPasswordExpires.setSeconds(
                resetPasswordExpires.getSeconds() +
                    parseInt(process.env.JWT_FORGOT_PASSWORD_EXPIRES_IN)
            )
            console.log('resetPasswordExpires: ', resetPasswordExpires)
            console.log('resetPW.sc: ', resetPasswordExpires.setSeconds)

            await this.userModel.updateUserResetToken(
                user[0].id,
                token,
                resetPasswordExpires
            )
            return {
                message: 'Password reset link has been sent to your email',
            }
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userModel.getUserByEmail(email)
            return user
        } catch (error) {
            throw error
        }
    }
    async resetPassword(token, newPassword) {
        try {
            const user = await this.userModel.getUserByResetToken(token)
            if (!user) {
                throw new Error('Token not found or expired')
            }
            console.log('token: ', token, 'pw: ', newPassword)
            console.log('user: ', user)
            console.log(0)
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            console.log(1)
            await this.userModel.updateUserPassword(user[0].id, hashedPassword)
            console.log(2)
            console.log('newPassword: ', newPassword)
            console.log('hashedPassword: ', hashedPassword)
            console.log('user[0].id: ', user[0].id)

            return { message: 'Password reset success' }
        } catch (error) {
            throw error
        }
    }
    async createPoll(title, createBy) {
        try {
            // create poll
            const poll = {
                title,
                createBy,
            }
            await this.userModel.createPoll(poll)
            console.log("poll: ",poll)
            return poll
        } catch (error) {
            throw error
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userModel.getUserbyId(id)
            return user
        } catch (error) {
            throw error
        }
    }
    async getPollById(pollId) {
        try {
            const poll = await this.userModel.getPollById(pollId)
            return poll
        } catch (error) {
            throw error
        }
    }

    async createOption(pollId, optionText) {
        try {
            // create option
            const option = {
                pollId,
                optionText,
            }
            await this.userModel.createOption(option)
            return option
        } catch (error) {
            throw error
        }
    }

    async getPollIdByOptionId(optionId) {
        try {
            const pollId = await this.userModel.getPollIdByOptionId(optionId)
            return pollId
        } catch (error) {
            console.log(error)
            throw new Error('Not have optionID in PollID')
        }
    }
    async vote(pollId, userId, optionId) {
        try {
            const vote = {
                pollId,
                userId,
                optionId,
            }
            await this.userModel.vote(vote)
            console.log('vote: ', vote)
            return vote
        } catch (error) {
            throw error
        }
    }
    async getAllPoll() {
        try {
            const polls = await this.userModel.getAllPoll()
            return polls
        } catch (error) {
            throw error
        }
    }
    async updatePoll(pollId, title) {
        try {
            await this.userModel.updatePoll(pollId, title)
            return { message: 'Update poll success' }
        } catch (error) {
            throw error
        }
    }
    async deleteVoteByPollId(id) {
        try {
            await this.userModel.deleteVoteByPollId(id)
            return { message: 'Delete vote success' }
        } catch (error) {
            throw error
        }
    }
    async deleteOptionByPollId(id) {
        try {
            await this.userModel.deleteOptionByPollId(id)
            return { message: 'Delete option success' }
        } catch (error) {
            throw error
        }
    }

    async deleteVoteByOptionId(id) {
        try {
            await this.userModel.deleteVoteByOptionId(id)
            return { message: 'Delete vote success' }
        } catch (error) {
            throw error
        }
    }

    async deleteOption(id) {
        try {
            await this.userModel.deleteOption(id)
            return { message: 'Delete option success' }
        } catch (error) {
            throw error
        }
    }
    async deletePoll(pollId) {
        try {
            await this.userModel.deletePoll(pollId)
            return { message: 'Delete poll success' }
        } catch (error) {
            throw error
        }
    }

    async getOptionById(id) {
        try {
            const option = this.userModel.getOptionById(id)
            return option
        } catch (error) {
            throw error
        }
    }

    async getVoteById(id) {
        try {
            const vote = this.userModel.getVoteById(id)
            return vote
        } catch (error) {
            throw error
        }
    }

    async deleteVote(id) {
        try {
            await this.userModel.deleteVote(id)
            return { message: 'Delete vote success' }
        } catch (error) {
            throw error
        }
    }

    async getAllOptionOfPoll(id) {
        try {
            const options = await this.userModel.getAllOptionOfPoll(id)
            return options
        } catch (error) {
            throw error
        }
    }

    async updateOptionOfPoll(pollId, optionId, optionText) {
        try {
            await this.userModel.updateOptionOfPoll(
                pollId,
                optionId,
                optionText
            )
            return { message: 'Update option success' }
        } catch (error) {
            throw error
        }
    }
}
export default new authService()
