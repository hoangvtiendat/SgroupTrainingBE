import UserService from './user.service';
class UserController {
      getAll(req, res, next) {
        // return res.send("hello");
        const users = UserService.getUsers()
        console.log("vao day controller")
        return res.json(users, htmlTemplate)
    }
}

export default UserController = new UserController()
