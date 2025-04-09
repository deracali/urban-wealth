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
    default: 0,
  },
  demoBalance: {
    type: Number,
    default: 1000,
  },
  referralBonus: { type: Number, default: 0 },
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
        enum: ['pending', 'completed', 'failed', 'deposit', 'withdrawal'],
        default: 'pending',
      },
    }
  ],
  isBlocked: {
    type: Boolean,
    default: false,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: String,  // store the referralCode of the referrer
    default: null,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
