import express from 'express';
import { deleteUserById, getAllUsers, getUserById, login, signup, updateBlockStatus, updateDemoBalance, updateUserById } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.post('/signup', signup);
userRoutes.post('/login', login);
userRoutes.get('/users', getAllUsers);  // Get all users
userRoutes.get('/user/:id', getUserById);  // Get user by ID
userRoutes.put('/update/:id', updateUserById);  // Update user by ID
userRoutes.delete('/delete/:id', deleteUserById);  // Delete user by ID
userRoutes.patch('/update-demo-balance/:id', updateDemoBalance);
userRoutes.patch('/block/:id', updateBlockStatus);

export default userRoutes;
