import { Document, Model,  Types } from 'mongoose';
import { ROLES, USER_STATUS } from '../../shared/config/constants.ts';

/**
 * Base User shape (business/domain level)
 */
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: (typeof ROLES)[keyof typeof ROLES];
  status: (typeof USER_STATUS)[keyof typeof USER_STATUS];
  invitedAt: Date;
}

/**
 * Payload for creating a user
 */
export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: (typeof ROLES)[keyof typeof ROLES];
  status?: (typeof USER_STATUS)[keyof typeof USER_STATUS];
  invitedAt?: Date;
}

/**
 * Payload for updating a user
 * (email & password usually updated via separate flows)
 */
export interface IUserUpdate {
  name?: string;
  role?: (typeof ROLES)[keyof typeof ROLES];
  status?: (typeof USER_STATUS)[keyof typeof USER_STATUS];
}

/**
 * Mongoose User Document
 */
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
