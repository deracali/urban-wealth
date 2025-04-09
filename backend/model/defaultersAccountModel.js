import mongoose from 'mongoose';

const DefaultersSchema = new mongoose.Schema({
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

export default mongoose.model('DefaulterAccount', DefaultersSchema);
