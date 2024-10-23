import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validationMiddleware = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return 
    }

    next();
  };
};
