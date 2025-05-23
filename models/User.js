import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },

  profilePhoto: { type: String, default: "" },
  bannerPhoto: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  specialization: { type: String, default: "" },

  // ✅ Shadow Profile block
  shadowProfile: {
    name: { type: String, default: "Shenzhen Nongke Orchid" },
    profilePhoto: { type: String, default: "" },
    bio: { type: String, default: "" },
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
