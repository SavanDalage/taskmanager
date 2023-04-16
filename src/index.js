const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user"); // bo obsługa usera jest w innym pliku
const taskRouter = require("./routers/task");
// const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT;

////////////////////////////

////////////////////////////

app.use(express.json()); // automaticly pars incoming json to an object; trafia to do req
app.use(userRouter); // bo obsługa usera jest w innym pliku
app.use(taskRouter);

/////////////////////////

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
