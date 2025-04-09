import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  // Import cors
import userRoutes from './route/userRoute.js';
import withdrawalRoutes from './route/withdrawalRoute.js';
import adminRoutes from './route/adminRoute.js';
import paymentRoutes from './route/paymentRoute.js';
import bankdetailsRoutes from './route/bankdetailsRoute.js';
import defaultersRoutes from './route/defaultersRoute.js';

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());  // Add this line to enable CORS



// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', withdrawalRoutes);
app.use('/api/upload', paymentRoutes);
app.use('/api/defaulters', defaultersRoutes);
app.use('/api/account', bankdetailsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
