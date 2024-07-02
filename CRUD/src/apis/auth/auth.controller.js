import authService from './auth.servicer'

class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await authService.getUserByusername(username, password)
            return res.status(200).json({
                success: true,
                data: user,
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
}

export default new authController()
