// DefaulterAccountSchema.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const DefaulterAccountSchema = new Schema({
  bank: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
});

const DefaulterAccount = model('DefaulterAccount', DefaulterAccountSchema);
export default DefaulterAccount;
