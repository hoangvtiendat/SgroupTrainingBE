// import express from 'express'
// // import UserService from './user.servicer'
// // import userServicer from './user.servicer'

// class UserController {
//     getAll(req, res, next) {
//         // res.send('hello')
//         const users = UserService.getUsers()
//         console.log('GET ALL USERS')
//         return res.send(users)
//     }
//     create(req, res, next) {
//         // add new users from body to data.json

//         console.log('CREATE USER')
//         const newUser = {
//             id: -1,
//             name: req.body.name,
//         }
//         UserService.creatUser(newUser)
//         return res.status(201).json(newUser)
//     }

//     getById(req, res, next) {
//         const id = parseInt(req.params.id)
//         const user = userServicer.getUserById(id)
//         if (user != null) {
//             return res.status(200).json(user)
//         } else {
//             return res
//                 .status(404)
//                 .json({ message: `There is no user with id ${id}` })
//         }
//     }

//     update(req, res, next) {
//         const id = parseInt(req.params.id, 10)
//         let user = userServicer.getUserById(id)
//         if (user == null) {
//             res.status(404).json({
//                 message: `There is no user with id ${id} to update`,
//             })
//         }

//         user = {
//             ...user,
//             name: req.body.name,
//         }

//         userServicer.updateUser(id, user)
//         return res.json(user)
//     }

//     delete(req, res, next) {
//         const id = parseInt(req.params.id)
//         let user = userServicer.getUserById(id);
//         if(user == null) {
//             res.status(404).json({
//                 message: `There is no user with id ${id} to delete`,
//             })
//         }

//         userServicer.deleteUser(id);
//         return res.status(204).json()
//     }
// }

// export default UserController = new UserController();

import userService from './user.servicer'

class UserController {
    async getUser(req, res) {
        try {
            const users = await userService.getUser()
            return res.status(200).json({
                success: true,
                data: users,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id
            const user = await userService.getUserById(userId)
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

    
    async createUser(req, res) {
        try {
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age,
                role : req.body.role
            }
            await userService.createUser(newUser)
            return res.status(201).json({
                success: true,
                message: 'created user',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Inernal server error',
            });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id
            const user = {
                username: req.body.username,
                email: req.body.email,
                password:  req.body.password,
                gender: req.body.gender,
                age: req.body.age,
                role : req.body.role
            }
            await userService.updateUser(userId, user)
            return res.status(200).json({
                success: true,
                message: 'updated user',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Inernal server error',
                error
            });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id
            await userService.deleteUser(userId)
            return res.status(200).json({
                success: true,
                message: 'deleted user',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Inernal server error',
            });
        }
    }
}

export default new UserController()
