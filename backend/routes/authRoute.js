import express from 'express'
const router = express.Router();
import {loginController, registerController} from '../controllers/authControllers';
import { isAdmin, requireSignIn, testController } from '../middleware/authMiddleware';



router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,isAdmin,testController);

export default router