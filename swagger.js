const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: "1.0.1",
    title: "MetaWall REST API",
    description: "",
  },
  host: process.env.BACKEND_DOMAIN,
  basePath: "/",
  schemes: ["https","http"],
  consumes: [],
  produces: [],
  tags: [
    {
      name: "Users",
      description: "使用者 router"
    },
    {
      name: "Posts",
      description: "貼文 router"
    },
  ],
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc);
