const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
        },
    },
    apis: ["./app/utils/Swagger.yml"],
};

exports.getSwaggerSpecs = () => {
    return swaggerJsdoc(options);
}