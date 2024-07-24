import express from 'express';
import UserController from './user.controller';
import verify from '../../middleware/verify.middleware';


const route = express.Router();
// route.get('/users', UserController.getUsers);
// route.get('/admin', UserController.admin);
// route.get('/', UserController.getAll);
// route.post('/', UserController.create);
// route.get('/:id', UserController.getById);
// route.put('/:id', UserController.update);
// route.delete('/:id', UserController.delete);

route.get('/', verify, UserController.getUser)
route.get('/:id', UserController.getUserById)


route.post('/', UserController.createUser)

route.put('/:id', UserController.updateUser)
route.delete('/:id', UserController.deleteUser)




export default route;
