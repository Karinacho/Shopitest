import crypto from 'crypto';
import { ValidationError } from '@app/middleware';

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
