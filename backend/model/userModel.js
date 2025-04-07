import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,  // Initialize the balance to 0 or any starting value
  },
  demoBalance: {
    type: Number,
    default: 1000,  // Set a demo balance for testing purposes
  },
  bids: [
    {
      amount: Number,
      status: {
        type: String,
        enum: ['pending', 'completed', 'expired'],
        default: 'pending',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  balanceHistory: [
    {
      withdrawalAmount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'deposit', 'withdrawal'], // Add 'deposit' and 'withdrawal' here
        default: 'pending',
      },
    }
  ]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
