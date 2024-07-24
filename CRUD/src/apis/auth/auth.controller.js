import authServicer from './auth.servicer'
import authService from './auth.servicer'

class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body
            const token = await authService.getUserByusername(
                username,
                password
            )
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
            console.log('er: ', error)

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

    async createPoll(req, res) {
        try {
            const title = req.body.title
            const createBy = req.user.id
            console.log('createBy: ', createBy)
            //check createBy have in database ?
            const user = await authService.getUserById(createBy)
            console.log('user: ', user)
            if (user.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found',
                })
            }
            const poll = await authService.createPoll(title, createBy)
            return res.status(201).json({
                success: true,
                message: 'Poll created successfully',
                data: {
                    title: poll.title,
                    createBy: poll.createBy,
                },
            })
        } catch (error) {
            console.log('error: ', error)
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async vote(req, res) {
        try {
            const { pollId, optionId } = req.body
            const userId = req.user.id
            //check pollId and userId have in database?
            const poll = await authService.getPollById(pollId)
            const user = await authService.getUserById(userId)
            if (poll.length == 0 || user.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Poll or User not found',
                })
            }
            const getPollIdByOptionId =
                await authService.getPollIdByOptionId(optionId)
            console.log(
                'GetPollIDByOptionID: ',
                getPollIdByOptionId,
                'PollID: ',
                pollId
            )

            if (getPollIdByOptionId !== pollId) {
                return res.status(400).json({
                    success: false,
                    message: 'Option not found',
                })
            }

            await authService.vote(pollId, userId, optionId)
            return res.status(200).json({
                success: true,
                message: 'Vote success',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async createOption(req, res) {
        try {
            const { pollId, optionText } = req.body
            //check pollId have in database?
            const poll = await authService.getPollById(pollId)
            if (poll.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Poll not found',
                })
            }
            await authService.createOption(pollId, optionText)
            return res.status(201).json({
                success: true,
                message: 'Option created successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async getAllPoll(req, res) {
        try {
            const polls = await authService.getAllPoll()
            return res.status(200).json({
                success: true,
                data: polls,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getPollById(req, res) {
        try {
            const pollId = req.params.id
            const poll = await authService.getPollById(pollId)
            const option = await authService.getAllOptionOfPoll(pollId)
            if (poll.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Poll not found',
                })
            }
            return res.status(200).json({
                success: true,
                data: {
                    poll : poll,
                    Option : option
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async updatePoll(req, res) {
        try {
            const pollId = req.params.id
            const { title } = req.body
            const userId = req.user.id

            const poll = await authService.getPollById(pollId)
            if (poll.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Poll not found',
                })
            }

            if (userId !== poll[0].CreatedBy) {
                return res.status(401).json({
                    success: false,
                    message: 'Edit only if you are the poll creator',
                })
            }

            await authService.updatePoll(pollId, title)
            return res.status(200).json({
                success: true,
                message: 'Poll updated successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    async deletePoll(req, res) {
        try {
            const pollId = req.params.id
            const userId = req.user.id
            const poll = await authService.getPollById(pollId)
            if (poll.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Poll not found',
                })
            }

            if (userId !== poll[0].CreatedBy) {
                return res.status(401).json({
                    success: false,
                    message: 'Delete only if you are the poll creator ',
                })
            }

            await authService.deleteVoteByPollId(pollId)
            await authService.deleteOptionByPollId(pollId)
            await authService.deletePoll(pollId)
            return res.status(200).json({
                success: true,
                message: 'Poll deleted successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async deleteOption(req, res) {
        try {
            const optionId = req.params.id
            const option = await authService.getOptionById(optionId)
            if (option.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Option not found',
                })
            }
            await authService.deleteVoteByOptionId(optionId)
            await authService.deleteOption(optionId)
            return res.status(200).json({
                success: true,
                message: 'Option deleted successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async deleteVote(req, res) {
        try {
            const voteId = req.params.id
            const userId = req.user.id;

            const vote = await authService.getVoteById(voteId)
            if (vote.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Vote not found',
                })
            }
            console.log('vote: ', vote, "\nuserId: ", userId, "voteUserId: ", vote[0].userId)
            if(userId !== vote[0].userId){
                return res.status(401).json({
                    success: false,
                    message: 'Delete only if you are the vote creator',
                })
            }
            await authService.deleteVote(voteId)
            return res.status(200).json({
                success: true,
                message: 'Vote deleted successfully',
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getAllOptionOfPoll(req, res) {
        try {
            const pollId = req.params.id
            const options = await authService.getAllOptionOfPoll(pollId)
            if (options.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No options found for this poll',
                })
            }
            return res.status(200).json({
                success: true,
                data: options,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async updateOptionOfPoll(req, res) {
        try {
            const pollId = req.query.pollid
            const optionId = req.query.optionid
            const { optionText } = req.body

            const poll = await authService.getPollById(pollId)
            console.log('req: ', req.params.pollid)
            console.log(
                'poll: ',
                poll,
                'pollId: ',
                pollId,
                'optionId: ',
                optionId,
                'optionText: ',
                optionText
            )
            if (poll.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Poll not found',
                })
            }
            const option = await authService.getOptionById(optionId)
            console.log('option: ', option)
            if (option.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Option not found',
                })
            }
            //Check if the option belongs to the poll or not
            console.log('aa: ', option[0].PollID)
            if (option[0].PollID != pollId) {
                return res.status(403).json({
                    success: false,
                    message: 'Option does not belong to this poll',
                })
            }

            //Update the option text
            await authService.updateOptionOfPoll(pollId, optionId, optionText)
            return res.status(200).json({
                success: true,
                message: 'Option updated successfully',
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
