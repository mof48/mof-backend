import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// ✅ ESM-compatible export
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
