const express = require("express");
require("./db/mongoose");
require("mongoose");
const userRouter = require("../routers/user");
const taskRouter = require("../routers/task");
const activityRouter = require("../routers/activity");
const authRouter = require("../routers/auth");
const helpers = require("../helpers/helpers");
// const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
// app.use(auth)
app.use(userRouter);
app.use(taskRouter);
app.use(activityRouter);
app.use(authRouter);

// //swagger
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "customers",
//       description: "Demo API",
//       contact: {
//         name: "Uttam Bhavani",
//       },
//       servers: ["http://localhost:3000"],
//     },
//   },
//   apis: ["app.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// /**
//  * @swagger
//  * /customers:
//  *  get:
//  *    description: Use to request all customers
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    Book:
//  *      type: object
//  *      required:
//  *        -title
//  *        -author
//  *      properties:
//  *        id:
//  *          type: string
//  *          description: the auto-generated id of the book
//  *        title:
//  *          type: string
//  *          description: the book title
//  *        author:
//  *          type: string
//  *          description: the book author
//  *        example:
//  *          id: 4523_fd
//  *          title: the bus
//  *          author: alexander k dun
//  */

app.get("/customers", (req, res) => {
  res.status(200).send("Customer results");
});

app.use(function (err, req, res, next) {
  console.log(err);
  helpers.errorResponse(500, { message: "something went wrong" }, res);
});

module.exports = app;
