import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLES, USER_STATUS } from '../../shared/config/constants.ts';
import type { IUserDocument } from './user.types.ts';
import { env } from '../../shared/config/env.ts';

type UserModel = Model<IUserDocument>;

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STAFF,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    invitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



// hash password on save
userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// hash password on update
userSchema.pre('findOneAndUpdate', async function () {
  const update: any = this.getUpdate();

  if (update?.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
});



// compare password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// generate refresh token
userSchema.methods.generateJwtRefreshToken = function (): string  {
  return jwt.sign(
    { id: this._id },
    env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

// generate access token
userSchema.methods.generateJwtAccessToken = function (): string {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// verify refresh token
userSchema.methods.verifyJwtRefreshToken = function (token: string): any {
  return jwt.verify(
    token,
    env.JWT_SECRET
  );
};

// indexes
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });
userSchema.index({ role: 1 });


export const User: UserModel =
  mongoose.models.User ||
  mongoose.model('User', userSchema);