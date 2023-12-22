import { Request, Response } from 'express';
import { registerValidation } from '../validation/register.validation';

export const Register = (req: Request, res: Response) => {
  const body = req.body;

  const { error } = registerValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(400).send({
      message: 'ERROR :: Passwords do not match!'
    });
  }
  res.send(req.body);
}