const express = require("express");
const connectDB = require("./config/database/db");
const { expressMiddleware } = require("./config/middleware/express_middleware");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
require("./logger/index");
dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT;
  await connectDB();
  await expressMiddleware(app);
  // Middleware to attach the function instance to request object

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use("/api/user", require("./router/user"));

  // router middleware
  app.get("/", (_, res) => {
    return res.send("API running for user");
  });

  app.use((err, req, res, next) => {
    if (!err.status) {
      err.status = 404;
    }
    return res.status(err.status).json({ message: err.message });
  });

  app.listen(PORT, () =>
    console.log(`Server started on port http://localhost:${PORT}`)
  );
};

startServer();
