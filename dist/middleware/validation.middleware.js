"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationMiddleware = (dto) => {
    return async (req, res, next) => {
        const dtoObj = (0, class_transformer_1.plainToInstance)(dto, req.body);
        const errors = await (0, class_validator_1.validate)(dtoObj);
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
exports.validationMiddleware = validationMiddleware;
