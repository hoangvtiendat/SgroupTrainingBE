import userModel from '../../models/users.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
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
}
export default new authService()
