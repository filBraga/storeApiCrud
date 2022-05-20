const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { error } = schema.validate(req.body);
  console.log(error.details[0]);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

module.exports = validateProduct;