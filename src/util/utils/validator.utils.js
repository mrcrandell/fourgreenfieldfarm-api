const joi = require('joi');

module.exports.joi = joi;

const validate = (object, schema) => {
  const joiSchema = joi.object(schema).unknown(true);

  const { error } = joiSchema.validate(object);

  if (error) return false;
  return true;
};

module.exports.validate = validate;
