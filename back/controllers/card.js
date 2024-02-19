const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function (Service) {
    return {
        post: async (req, res, next) => {
           next(new ValidationError("Method not allowed"));
        },
        cget: async (req, res, next) => {
            try {
                const tags = req.query.tags ?? [];
                const schema =  Joi.alternatives(
                    Joi.string().min(1), // For a single tag
                    Joi.array().items(Joi.string()).min(1) // For multiple tags
                );
                const { error } = schema.validate(tags);
                if (error) {
                    throw new ValidationError("Invalid tags");
                }
                const cards = await Service.findByTags(tags, req.user);
                res.json(cards);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            next(new ValidationError("Method not allowed"));
        },
        put: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        },
        patch: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        },
        delete: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        }
    }
}

/