import mongoose from 'mongoose';

const joinApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tier: { type: String, required: true },
  inviteCode: { type: String },
  speakerCode: { type: String },
  idFilePath: { type: String, required: true },
  status: { type: String, default: 'pending' }, // pending | approved | rejected
  submittedAt: { type: Date, default: Date.now }
});

const JoinApplication = mongoose.model('JoinApplication', joinApplicationSchema);
export default JoinApplication;
