
import express from 'express'
import { getOrderById, orderController } from '../controller/orderController.js';
import { Protect } from '../middleWare/authMiddleWare.js';

const router=express.Router();
    router.route('/').post(Protect,orderController)
    router.route('/:id').get(Protect,getOrderById);
    

export default router ;