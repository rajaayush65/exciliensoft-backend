import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserModel extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre<UserModel>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model<UserModel>('User', UserSchema);

export default User;
