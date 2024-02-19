const { Router } = require("express");
const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function ( userSerice ) {
  const router = Router();

  router.post("/login", async function (req, res) {
    const { email, password } = req.body;
  
    try {
      const loginValidation = Joi.object({
        email: Joi.string().email().required().messages({ "*": "Email is required" }),
        password: Joi.string().required().messages({ "*": "Password is required" }),
      });
  
      const { error } = loginValidation.validate(req.body);
      if (error) throw new ValidationError(error);
  
      const { user, token } = await userSerice.login({ email, password });
      return res.json({ user, token });
    } catch (err) {
      res.status(401).json({
        message: (err.errors && typeof err.errors === 'string') ? err.errors : 
                 (err.error?.details && Array.isArray(err.error.details)) ? err.error.details[0].message : 
                 err.message
      });
    }
  });
  

  router.post("/register", async function (req, res) {
    try {
      const body = req.body;
      const user = await userSerice.create(body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};