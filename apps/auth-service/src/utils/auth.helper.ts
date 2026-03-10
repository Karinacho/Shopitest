import {redis} from '@app/shared'
import crypto from 'crypto';
import { ValidationError } from '@app/middleware';
import { NextFunction } from 'express';
import { sendEmail} from './sendEmail';

interface DataType {
  name?: string;
  email: string;
  password: string;
  phone_number: number;
  country: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateRegistrationData = (data: DataType,  userType: 'user' | 'seller')=>  {
  const {name, email, password, phone_number, country} = data;

  if (!name) {
    throw new ValidationError(`Missing required field 'name'`);
  }

  if (!email) {
    throw new ValidationError(`Missing required field 'email'`);
  }

  if (!password) {
    throw new ValidationError(`Missing required field 'password'`);
  }

  if (userType === 'seller') {
    if (!phone_number) {
      throw new ValidationError(`Missing required field 'phone_number'`);
    }
    if (!country) {
      throw new ValidationError(`Missing required field 'country'`);
    }
  }

  if (!emailRegex.test(email)) {
   throw new ValidationError(`Invalid email format!`);
  }

}

export const checkOtpRestrictions = async(email: string,  next: NextFunction) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return next(new ValidationError(`Account is locked due to multiple failed attempts. Try again after 30 minutes`));
  }
  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(new ValidationError("Too many OTP requests! Please wait 1hour before requesting again."));
  }
  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(new ValidationError("Please wait 1 minute before requesting new OTP!"))
  }
}

export const sendOtp = async (name: string, email: string,  template: string)=> {
  const otp = crypto.randomInt(1000, 9999).toString();
  await sendEmail({to: email,  subject: 'Verify Your Email', templateName: template, data: {name, otp}});
  await redis.set(`otp:${email}`, otp,  "EX", 300)
  await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60);

}
