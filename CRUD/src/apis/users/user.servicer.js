// import readWriteFile from '../../apis/service/readWriteFile'
// import connection from '../../database/connection'

// class UserService {
//     getUsers() {
//         const users = readWriteFile.readUsers()
//         return users
//     }

//     creatUser(newUser) {
//         let users = this.getUsers()
//         newUser.id = users.length + 1
//         users.push(newUser)
//         readWriteFile.writeUsers(users)
//         return newUser
//     }

//     getUserById(id) {
//         let users = this.getUsers()
//         console.log('id: ', id)
//         const index = users.findIndex((user) => user.id === parseInt(id))
//         console.log('users: ', users[index])
//         return users[index]
//     }

//     updateUser(id, userUpdate) {
//         let users = this.getUsers()
//         const index = users.findIndex((user) => user.id === parseInt(id))
//         users[index] = userUpdate
//         readWriteFile.writeUsers(users)
//         return userUpdate
//     }

//     deleteUser(id)
//     {
//         let users  = this.getUsers();
//         const index = users.findIndex((user) => user.id === parseInt(id))
//         users.splice(index, 1);
//         readWriteFile.writeUsers(users)

//     }
// }

// export default new UserService()

import userModel from '../../models/users.model'

class userService {
    constructor() {
        this.userModel = new userModel()
    }
    async getUser() {
        try{
            const users = await this.userModel.getAllUser()
            return users;
        }
        catch(error) {
            throw error;
        }
    }

    async createUser(user) {
        try{
            await this.userModel.createUser(user);
            return true;
        }catch(error) {
            throw error;
        }
    }

    async updateUser(userId, user) {
        try{
            await this.userModel.updateUser(userId, user);
            return true;
        }catch(error) {
            throw error;
        }
    }
}

export default new userService()
