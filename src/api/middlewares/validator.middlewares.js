const util = require('../../util');

const { joi } = util.validator;

const validate = (schema) => (request, response, next) => {
  const joiSchema = joi.object(schema).unknown(true);

  const { error, value } = joiSchema.validate({
    query: request.query,
    params: request.params,
    body: request.body,
  });

  // Update request to us validate values which may be transformed
  request.body = value.body;
  request.params = value.params;
  request.query = value.query;

  if (error) {
    return response.status(422).send({ error: error.message });
  }

  next();
};

module.exports = { validate, joi };
