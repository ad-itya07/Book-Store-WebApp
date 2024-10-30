import express from 'express';
import userController from '../controllers/userController.js';1

export const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

// admin-routes
router.post('/admin/new' , userController.createAdminController);
router.post('/admin/login' , userController.loginAdminController);
router.get('/admin/stats', userController.adminStatsController)