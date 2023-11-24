import Joi from 'joi';
const JoiValidationSchema = Joi.object({
  userId: Joi.number(),
  fullName: {
    firstName: Joi.string().max(25).required(),
    lastName: Joi.string().max(25).required(),
  },
  email: Joi.string().required().email(),
  age: Joi.number(),
  username: Joi.string().required(),
  password: Joi.required(),
  isActive: Joi.required(),
  hobbies: Joi.required(),
  address: Joi.required(),
  orders: Joi.required(),
});
export default JoiValidationSchema;
