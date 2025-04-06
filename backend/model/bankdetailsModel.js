// bankDetailsSchema.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bankDetailsSchema = new Schema({
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

const BankDetails = model('BankDetails', bankDetailsSchema);
export default BankDetails;
