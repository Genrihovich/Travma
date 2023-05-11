const { body } = require('express-validator');

const validators = {
  userValidator: [
    body('Password_User')
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),
  ],
  loginValidator: [
    body('Password_User')
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),
  ]
};

module.exports = validators;