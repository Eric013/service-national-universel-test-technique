const Joi = require("joi");

function validatePassword(password) {
  const { error } = Joi.string().required().min(6).max(100).validate(password);
  return !error;
}

function validateEmail(email) {
  const { error } = Joi.string().required().email().validate(email);
  return !error;
}

module.exports = {
  validatePassword,
  validateEmail,
};
