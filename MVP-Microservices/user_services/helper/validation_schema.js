const Joi = require("joi");

const authSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
});

module.exports = {
  authSchema
};
