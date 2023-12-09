import express from 'express'
const router = express.Router();
import {loginController, registerController} from '../controllers/authControllers.js';
import { isAdmin, requireSignIn, testController } from '../middleware/authMiddleware.js';



router.post('/register',registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,isAdmin,testController);

export default router