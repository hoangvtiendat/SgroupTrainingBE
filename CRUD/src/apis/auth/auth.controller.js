import authService from './auth.servicer'

class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body
            const token = await authService.getUserByusername(username, password)
            return res.status(200).json({
                success: true,
                data: token,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async register(req, res) {
        try {
            const { username, email, password, gender, age, role } = req.body
            await authService.register(
                username,
                email,
                password,
                gender,
                age,
                role
            )
            return res.status(201).json({
                success: true,
                message: 'Register success',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body
            await authService.forgotPassword(email)
            return res.status(200).json({
                success: true,
                message: 'Password reset link has been sent to your email',
            })
        } catch (error) {
            console.log("er: ",error)

            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body
            await authService.resetPassword(token, newPassword)
            // console.log("this is controller: \n", "token: ", token, "\n", "new password: ", newPassword, "\nEND")
            return res.status(200).json({
                success: true,
                message: 'Password reset success',
            })
        } catch (error) {
            
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
}

export default new authController()
