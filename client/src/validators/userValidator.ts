import Joi from 'joi';

import { regex } from '../configs/regex';

export const registerValidator = Joi.object({
    firstName: Joi.string().min(1).max(20).required()
        .messages({
            'string.empty': 'This field is required',
            'string.max': 'Your name is too long.',
        }),
    lastName: Joi.string().min(1).max(20).required()
        .messages({
            'string.empty': 'This field is required',
            'string.max': 'Your name is too long.',
        }),
    email: Joi.string().regex(regex.EMAIL).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Write correct email, like name@mail.com',
    }),
    phone: Joi.string().regex(regex.PHONE).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Write correct number, like +380633333333',
    }),
    password: Joi.string().regex(regex.PASSWORD).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Use at least 8 symbols and at least one letter',
    }),
});

export const loginValidator = Joi.object({
    email: Joi.string().regex(regex.EMAIL).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Write correct email, like name@mail.com',
    }),
    password: Joi.string().regex(regex.PASSWORD).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Use at least 8 symbols and at least one letter',
    }),
});

export const editUserValidator = Joi.object({
    firstName: Joi.string().min(1).max(20).required()
        .messages({
            'string.empty': 'This field is required',
            'string.max': 'Your name is too long.',
        }),
    lastName: Joi.string().min(1).max(20).required()
        .messages({
            'string.empty': 'This field is required',
            'string.max': 'Your name is too long.',
        }),
    email: Joi.string().regex(regex.EMAIL).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Write correct email, like name@mail.com',
    }),
    phone: Joi.string().regex(regex.PHONE).required().messages({
        'string.empty': 'This is required field',
        'string.pattern.base': 'Write correct number, like +380633333333',
    }),
});
