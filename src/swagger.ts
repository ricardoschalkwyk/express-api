import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "https://express-api-qfyg.onrender.com/",
      },
    ],
  },
  apis: ["src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
