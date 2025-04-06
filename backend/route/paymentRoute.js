import express from 'express';
import fileUpload from 'express-fileupload';
import { createPayment, getAllPayments, getPaymentById } from '../controller/paymentController.js';

const paymentRoutes = express.Router();

// Use express-fileupload middleware
paymentRoutes.use(fileUpload({ useTempFiles: true }));

// Route to create payment with file upload
paymentRoutes.post('/payment', createPayment);

// Route to get all payments
paymentRoutes.get('/payments', getAllPayments);

// Route to get a payment by ID
paymentRoutes.get('/payment/:id', getPaymentById);

export default paymentRoutes;
