const Joi = require('joi');

const schema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateSale = (req, res, next) => {
  const data = req.body;

  data.forEach(({ productId, quantity }) => {
      const { error } = schema.validate({ productId, quantity });
      if (error) {
          const { type } = error.details[0];
          if (type === 'any.required') {
              next({ status: 400, message: error.details[0].message });
          }
          next({ status: 422, message: error.details[0].message });
      }
  });
  next();
};

module.exports = validateSale;