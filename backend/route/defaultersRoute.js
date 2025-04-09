import express from 'express';
import fileUpload from 'express-fileupload';
import { createPayment, getAllPayments, getPaymentById } from '../controller/defaultersController.js';

const defaultersRoutes = express.Router();

// Use express-fileupload middleware
defaultersRoutes.use(fileUpload({ useTempFiles: true }));

// Route to create payment with file upload
defaultersRoutes.post('/payment', createPayment);

// Route to get all payments
defaultersRoutes.get('/payments', getAllPayments);

// Route to get a payment by ID
defaultersRoutes.get('/payment/:id', getPaymentById);

export default defaultersRoutes;
