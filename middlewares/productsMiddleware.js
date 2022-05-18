const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).max(300).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { error } = PRODUCT.validate(req.body);

  console.log((error));

  const { type } = error.details[0];

  if (error) {
    if (type === 'string.min' || type === 'number.min') {
      next({ status: 422, message: error });
  }
    next({ status: 400, message: error });
  }

  next();
};

module.exports = validateProduct;
