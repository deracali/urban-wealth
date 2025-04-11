import express from 'express';
import { createWithdrawal, getAllWithdrawals, getWithdrawalsByUserId, updateWithdrawalStatus } from '../controller/withdrawal.js';

const withdrawalRoutes = express.Router();

// Route to create a new withdrawal
withdrawalRoutes.post('/withdrawal', createWithdrawal);

// Route to get all withdrawals
withdrawalRoutes.get('/withdrawals', getAllWithdrawals);

withdrawalRoutes.patch('/:id/status', updateWithdrawalStatus);
withdrawalRoutes.get('/withdrawals/user/:userId', getWithdrawalsByUserId);

export default withdrawalRoutes;
