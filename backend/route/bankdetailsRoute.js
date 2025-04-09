
import express from 'express';
import { getBankDetails, addBankDetail, deleteBankDetail, updateBankDetail } from '../controller/bankdetailsController.js';

const bankdetailsRoutes = express.Router();

// Get all bank details
bankdetailsRoutes.get('/get', getBankDetails);

// Add a new bank detail
bankdetailsRoutes.post('/bank-details', addBankDetail);

bankdetailsRoutes.put('/update/:id', updateBankDetail);
bankdetailsRoutes.delete('/delete/:id', deleteBankDetail);

export default bankdetailsRoutes;
