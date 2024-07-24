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
    async getUserByResetToken(token) {
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
    async updateUserPassword(userId, password) {
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

    async createPoll(poll) {
        try {
            const connection = await pool
            const query = `INSERT INTO poll(Title, CreatedDate, CreatedBy) values(?,NOW(),?);`
            console.log(poll.title, poll.createBy)
            const value = [poll.title, poll.createBy]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }

    async getPollById(id) {
        try {
            const connection = await pool
            const query = `SELECT * FROM poll WHERE PollID =?`
            const value = [id]
            const [rows, fields] = await connection.query(query, value)
            return rows
        } catch (error) {
            throw error
        }
    }
    async createOption(option) {
        try {
            const connection = await pool
            const query = `INSERT INTO \`option\` ( OptionText, PollID) values(?,?);`
            console.log(option.optionText, option.pollId)
            const value = [option.optionText, option.pollId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
    async getPollIdByOptionId(optionId) {
        try {
            const connection = await pool
            const query = `SELECT PollID FROM \`option\` WHERE OptionID =?`
            const value = [optionId]
            const [rows, fields] = await connection.query(query, value)
            console.log('A: ', rows[0].PollID)
            return rows[0].PollID
        } catch (error) {
            throw error
        }
    }
    async vote(vote) {
        try {
            const connection = await pool
            const query = `INSERT INTO \`vote\` (PollID, UserID, OptionID, VotedDate) values(?,?,?, NOW());`
            console.log(vote.pollId, vote.userId, vote.optionId)
            const value = [vote.pollId, vote.userId, vote.optionId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
    async getAllPoll() {
        try {
            const connection = await pool
            const query = `SELECT * FROM poll;`
            const [rows, fields] = await connection.query(query)
            return rows
        } catch (error) {
            throw error
        }
    }
    async updatePoll(pollId, title) {
        try {
            const connection = await pool
            const query = `UPDATE poll SET Title =? WHERE PollID =?`
            const value = [title, pollId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
    async deleteVoteByPollId(id) {
        try {
            const connection = await pool
            const query = `DELETE FROM vote WHERE PollID =?`
            await connection.query(query, [id])
            return true
        } catch (error) {
            throw error
        }
    }
    async deleteOptionByPollId(id) {
        try {
            const connection = await pool
            const query = `DELETE FROM \`option\` WHERE PollID =?`
            await connection.query(query, [id])
            return true
        } catch (error) {
            throw error
        }
    }
    async deletePoll(pollId) {
        try {
            const connection = await pool
            const query = `DELETE FROM poll WHERE PollID =?`
            await connection.query(query, [pollId])
            return true
        } catch (error) {
            throw error
        }
    }

    async deleteVoteByOptionId(optionId) {
        try {
            const connection = await pool
            const query = `DELETE FROM vote WHERE OptionID =?`
            await connection.query(query, [optionId])
            return true
        } catch (error) {
            throw error
        }
    }
    async deleteOption(optionId) {
        try {
            const connection = await pool
            const query = `DELETE FROM \`option\` WHERE OptionID =?`
            await connection.query(query, [optionId])
            return true
        } catch (error) {
            throw error
        }
    }

    async deleteVote(voteId)
    {
        try {
            const connection = await pool
            const query = `DELETE FROM vote WHERE VoteID =?`
            await connection.query(query, [voteId])
            return true
        } catch (error) {
            throw error
        }
    }

    async getOptionById(optionId) {
        try {
            const connection = await pool
            const query = `SELECT * FROM \`option\` WHERE OptionID =?`
            const value = [optionId]
            const [rows, fields] = await connection.query(query, value)
            return rows
        } catch (error) {
            throw error
        }
    }

    async getVoteById(voteId) {
        try {
            const connection = await pool
            const query = `SELECT * FROM vote WHERE VoteID =?`
            const value = [voteId]
            const [rows, fields] = await connection.query(query, value)
            return rows
        } catch (error) {
            throw error
        }
    }

    async getAllOptionOfPoll(id)
    {
        try {
            const connection = await pool
            const query = `SELECT * FROM \`option\` WHERE PollID =?`
            const value = [id]
            const [rows, fields] = await connection.query(query, value)
            return rows
        } catch (error) {
            throw error
        }
    }

    async updateOptionOfPoll(pollId, optionId, optionText)
    {
        try {
            const connection = await pool
            const query = `UPDATE \`option\` SET OptionText =? WHERE PollID =? AND OptionID =?`
            const value = [optionText, pollId, optionId]
            await connection.query(query, value)
            return true
        } catch (error) {
            throw error
        }
    }
}
export default userModel
