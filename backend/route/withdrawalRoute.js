import express from 'express';
import { createWithdrawal, getAllWithdrawals, updateWithdrawalStatus } from '../controller/withdrawal.js';

const withdrawalRoutes = express.Router();

// Route to create a new withdrawal
withdrawalRoutes.post('/withdrawal', createWithdrawal);

// Route to get all withdrawals
withdrawalRoutes.get('/withdrawals', getAllWithdrawals);

withdrawalRoutes.patch('/:id/status', updateWithdrawalStatus);

export default withdrawalRoutes;
