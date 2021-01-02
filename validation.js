// Validation
const Joi = require('@hapi/joi');

// Register validation 

const registerValidation = (data) =>{

  const schema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6)
  });

  // Validate data before use
  return schema.validate(data);

}

const loginValidation = (data) =>{

  const schema = Joi.object({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6)
  });

  // Validate data before use
  return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
