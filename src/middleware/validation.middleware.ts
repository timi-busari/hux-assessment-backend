import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validationMiddleware = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => {
        return {
          field: error.property,
          errors: Object.values(error.constraints || {}),
        };
      });

      res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
      return;
    }

    next();
  };
};
