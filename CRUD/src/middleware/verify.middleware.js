import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verify = function (req, res, next) {
    let token = req.headers.authorization
    console.log('token:' + token)

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided',
        })
    }

    token = token.split(' ')[1]
    console.log('token2: ' + token)
    console.log('process.env.JWT_SECRET: ', process.env.JWT_SECRET)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        console.log('decoded: ', decoded)
        console.log('req.decoded: ', req.decoded)
        req.decoded = decoded
        console.log('req.decoded: ', req.decoded)
        next()
    } catch {
        return res.status(500).json({
            success: false,
            message: 'Token error',
        })
    }
}
export default verify
