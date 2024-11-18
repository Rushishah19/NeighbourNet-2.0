const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, default: 'user' },
  photo: { type: String },
  hourlyRate: { type: String },
  skills: { type: [String] },
  experience: { type: String },
  location: { type: String },
  availability: { type: String },
  description: { type: String },
  certifications: { type: [String] },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
