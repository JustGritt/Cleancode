const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [], // This indicates that the JWT security scheme is applied globally.
      },
    ],
  },
  apis: ["./utils/Swagger.yml"],
};

exports.getSwaggerSpecs = () => {
  return swaggerJsdoc(options);
};