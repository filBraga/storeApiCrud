const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5).max(300).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (!error) return next();
  console.log(error.details[0].type);

  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }

  return res.status(422).json({ message: error.details[0].message });
};

module.exports = validateProduct;