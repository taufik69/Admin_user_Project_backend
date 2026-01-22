import { ROLES, USER_STATUS, PROJECT_STATUS } from '../../shared/config/constants.ts';

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];