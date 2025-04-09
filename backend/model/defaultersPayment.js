import mongoose from 'mongoose';

const DefaulterPaymentSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('DefaulterPayment', DefaulterPaymentSchema);
