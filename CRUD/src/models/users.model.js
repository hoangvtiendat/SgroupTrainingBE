import pool from '../database/connection'

class userModel {
    async getAllUser() {
        try {
            const connections = await pool.getConnection()
            const [rows, fields] = await connections.query(
                'SELECT * FROM `users`'
            )
            connections.release()
            return rows
        } catch (error) {
            throw error
        }
    }

    async createUser(user) {
        try {
            const connections = await pool.getConnection()
            const query = `INSERT INTO users(id, name, email, password, gender, age) values(?, ?, ?, ?, ?, ?);`
            const { name, username, password } = user
            const value = [name, username, password]
            await connections.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId, user) {
        try {
            const connection = await pool.getConnection()
            const query = `UPDATE users SET name =?, email =?, password =?, gender =?, age =? WHERE id =?`
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
}
export default userModel
