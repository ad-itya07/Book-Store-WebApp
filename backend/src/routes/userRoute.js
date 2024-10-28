import express from 'express';
import userController from '../controllers/userController.js';1

export const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

// signup-route
router.post('/admin/new' , userController.createAdminController);
router.post('/admin/login' , userController.loginAdminController);