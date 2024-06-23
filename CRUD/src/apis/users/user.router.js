import express from 'express';
import UserController from './user.controller';


const route = express.Router();
// route.get('/users', UserController.getUsers);
// route.get('/admin', UserController.admin);
// route.get('/', UserController.getAll);
// route.post('/', UserController.create);
// route.get('/:id', UserController.getById);
// route.put('/:id', UserController.update);
// route.delete('/:id', UserController.delete);

route.get('/', UserController.getUser)

route.post('/', UserController.createUser)
route.put('/:id', UserController.updateUser)




export default route;
