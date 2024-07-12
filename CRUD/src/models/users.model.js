import pool from '../database/connection'

class userModel {
    async getAllUser() {
        try {
            const connections = await pool
            const [rows, fields] = await connections.query(
                'SELECT * FROM `user`'
            )
            // connections.release();
            return rows
        } catch (error) {
            throw error
        }
    }

    async getUserbyId(userId) {
        try {
            const connections = await pool
            const [rows, fields] = await connections.query(
                'SELECT * FROM `user` WHERE id =?',
                [userId]
            )
            return rows
        } catch (error) {
            throw error
        }
    }

    async getUserByUsername(username) {
        try {
            const connections = await pool
            const [rows, fields] = await connections.query(
                'SELECT * FROM `user` WHERE username =?',
                [username]
            )
            return rows
        } catch (error) {
            throw error
        }
    }
    async getUserByEmail(email) {
        try {
            const connections = await pool
            const [rows, fields] = await connections.query(
                'SELECT * FROM `user` WHERE email =?',
                [email]
            )

            return rows
        } catch (error) {
            throw new Error('user not Found')
        }
    }
    async createUser(user) {
        try {
            const connections = await pool
            const query = `INSERT INTO user(username, email, password, gender, age, role) values( ?, ?, ?, ?, ?, ?);`
            // const { name, email, password, gender, age} = user
            const value = [
                user.username,
                user.email,
                user.password,
                user.gender,
                user.age,
                user.role,
            ]
            await connections.query(query, value)

            return true
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId, user) {
        try {
            const connection = await pool
            const query = `UPDATE user SET username =?, email =?, password =?, gender =?, age =? , role =? WHERE id =?`
            const value = [
                user.username,
                user.email,
                user.password,
                user.gender,
                user.age,
                user.role,
                userId,
            ]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId) {
        try {
            const connection = await pool
            const query = `DELETE FROM user WHERE id =?`
            await connection.query(query, [userId])
            return true
        } catch (error) {
            throw error
        }
    }
    async updateUserResetToken(userId, tokenReset, exp) {
        try {
            const connection = await pool
            const query = `UPDATE user SET tokenReset=?, exp =? WHERE id =?`
            const value = [tokenReset, exp, userId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
    async getUserByResetToken(token)
    {
        try {
            const connection = await pool
            const query = `SELECT * FROM user WHERE tokenReset =? AND exp > NOW()`
            const value = [token]
            const [rows, fields] = await connection.query(query, value)
            return rows
        } catch (error) {
            throw error
        }
    }
    async updateUserPassword(userId, password){
        try {
            const connection = await pool
            const query = `UPDATE user SET password =? WHERE id =?`
            const value = [password, userId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
}
export default userModel
