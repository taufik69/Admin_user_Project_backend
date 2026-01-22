import crypto from 'crypto';

export class TokenUtil {
  static generate(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateExpiry(days: number = 7): Date {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    return expiryDate;
  }
}