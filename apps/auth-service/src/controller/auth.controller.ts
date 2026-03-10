import { Request, Response, NextFunction } from 'express';
import { validateRegistrationData, checkOtpRestrictions } from '../utils/auth.helper';
import { ValidationError } from '@app/middleware';

//Register a user

export const userRegistration =  async (req: Request, res: Response, next: NextFunction) => {
  validateRegistrationData(req.body, "user");
  const {name, email} = req.body;

  const existingUser = await prisma.usersfindUnique({where: email})

  if ( existingUser) {
    return next(new ValidationError('User already exists with this email'));
  }
  await  checkOtpRestrictions(email, next)

}
