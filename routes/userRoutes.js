import express from 'express'
import { getUserProfile, Login, Register, updataUserProfile, UserPorfile } from '../controller/userController.js';
import { Protect } from '../middleWare/authMiddleWare.js';
import User from '../models/User.js';
// import {register}from '../controller/userController'
const router = express.Router();

router.post('/signup', Register);



router.post('/login', Login)

// this is the way to pass multiple function to the router  to pass middle ware before the controller
// using router.rout.get(functions)
router.route('/profile').get(Protect,getUserProfile)
router.route('/profile').put(Protect,updataUserProfile)

router.route('/:id').get(Protect,UserPorfile)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).populate('orders')
        res.status(200).json(users)

    } catch (e) { res.status(500).json(e.message) }

})

export default router;