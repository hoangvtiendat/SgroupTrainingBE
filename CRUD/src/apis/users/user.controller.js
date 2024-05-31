import express from 'express'
import UserService from './user.servicer'
import userServicer from './user.servicer'
class UserController {
    getAll(req, res, next) {
        // res.send('hello')
        const users = UserService.getUsers()
        console.log('GET ALL USERS')
        return res.send(users)
    }
    create(req, res, next) {
        // add new users from body to data.json

        console.log('CREATE USER')
        const newUser = {
            id: -1,
            name: req.body.name,
        }
        UserService.creatUser(newUser)
        return res.status(201).json(newUser)
    }

    getById(req, res, next) {
        const id = parseInt(req.params.id)
        const user = userServicer.getUserById(id)
        if (user != null) {
            return res.status(200).json(user)
        } else {
            return res
                .status(404)
                .json({ message: `There is no user with id ${id}` })
        }
    }

    update(req, res, next) {
        const id = parseInt(req.params.id, 10)
        let user = userServicer.getUserById(id)
        if (user == null) {
            res.status(404).json({
                message: `There is no user with id ${id} to update`,
            })
        }

        user = {
            ...user,
            name: req.body.name,
        }

        userServicer.updateUser(id, user)
        return res.json(user)
    }

    delete(req, res, next) {
        const id = parseInt(req.params.id)
        let user = userServicer.getUserById(id);
        if(user == null) {
            res.status(404).json({
                message: `There is no user with id ${id} to delete`,
            })
        }

        userServicer.deleteUser(id);
        return res.status(204).json()
    }
}

export default UserController = new UserController()
