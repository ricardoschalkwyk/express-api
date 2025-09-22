import swaggerJSDoc from "swagger-jsdoc";
let isProd = process.env.NODE_ENV === "production";

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
        url: isProd
          ? "https://express-api-qfyg.onrender.com/"
          : "http://localhost:3000",
      },
    ],
  },
  apis: [isProd ? "./routes/**/*.js" : "src/routes/**/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
