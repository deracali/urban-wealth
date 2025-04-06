import express from 'express';
import { deleteAdminById, getAllAdmin, getAdminById, login, signup, updateAdminById } from '../controller/adminController.js';

const adminRoutes = express.Router();

adminRoutes.post('/signup', signup);
adminRoutes.post('/login', login);
adminRoutes.get('/users', getAllAdmin);  // Get all users
adminRoutes.get('/user/:id', getAdminById);  // Get user by ID
adminRoutes.put('/user/:id', updateAdminById);  // Update user by ID
adminRoutes.delete('/user/:id', deleteAdminById);  // Delete user by ID

export default adminRoutes;
