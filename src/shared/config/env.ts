import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;  
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`❌ Environment variable ${key} is not defined`);
  }
  return value || defaultValue!;
};

export const env: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: getEnvVariable('MONGODB_URI'),
  JWT_SECRET: getEnvVariable('JWT_SECRET'),
  ACCESS_TOKEN_EXPIRY: getEnvVariable('ACCESS_TOKEN_EXPIRY', '15m'),
  REFRESH_TOKEN_EXPIRY: getEnvVariable('REFRESH_TOKEN_EXPIRY', '7d'),
  ADMIN_EMAIL: getEnvVariable('ADMIN_EMAIL'),
  ADMIN_PASSWORD: getEnvVariable('ADMIN_PASSWORD'),
};