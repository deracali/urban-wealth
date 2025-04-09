import express from 'express';
import fileUpload from 'express-fileupload';
import { createPayment, getAllPayments, getPaymentById } from '../controller/defaultersPayment';

const defaultPaymentRoutes = express.Router();

// Use express-fileupload middleware
defaultPaymentRoutes.use(fileUpload({ useTempFiles: true }));

// Route to create payment with file upload
defaultPaymentRoutes.post('/payment', createPayment);

// Route to get all payments
defaultPaymentRoutes.get('/payments', getAllPayments);

// Route to get a payment by ID
defaultPaymentRoutes.get('/payment/:id', getPaymentById);

export default defaultPaymentRoutes;
