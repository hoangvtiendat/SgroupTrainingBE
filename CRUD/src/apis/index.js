import express from 'express';
import userRoute from './users/user.router';
import productRoute from './product/product.router';

const router = express.Router();

router.use('/users', userRoute);
// router.get('/', function (req, res) {
//     res.send('hello')
// })
// router.use('/products', productRoute);

export default router;