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
    async createUser(user) {
        try {
            const connections = await pool
            const query = `INSERT INTO user(name, email, password, gender, age) values( ?, ?, ?, ?, ?);`
            // const { name, email, password, gender, age} = user
            const value = [
                user.name,
                user.email,
                user.password,
                user.gender,
                user.age,
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
            const query = `UPDATE user SET name =?, email =?, password =?, gender =?, age =? WHERE id =?`
            const value = [
                user.name,
                user.email,
                user.password,
                user.gender,
                user.age,
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
}
export default userModel
