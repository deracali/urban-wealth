
import express from 'express';
import { addBankDetail, deleteBankDetail, getBankDetails, updateBankDetail } from '../controller/defaultersController.js';

const defaultersRoutes = express.Router();

// Get all bank details
defaultersRoutes.get('/get', getBankDetails);

// Add a new bank detail
defaultersRoutes.post('/bank-details', addBankDetail);

defaultersRoutes.put('/update/:id', updateBankDetail);
defaultersRoutes.delete('/delete/:id', deleteBankDetail);



export default defaultersRoutes;
