const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).max(300).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { name, number } = req.body;

  const { error } = PRODUCT.validate({ name, number });
  const { type } = error.details[0];

  console.log(JSON.stringify(error));
  console.log(JSON.stringify(type));

  if (error) {
    console.log(`this is errorrrr ${error}`);
    console.log(`this is type ${type}`);

    if (type === 'string.min' || type === 'number.min') {
      console.log('chegou até linha 19 do middle');

      next({ status: 422, message: error.ValidationError });
  }
    console.log('chegou até linha 23 do middle');
    next({ status: 400, message: error });
  }

  next();
};

module.exports = validateProduct;
