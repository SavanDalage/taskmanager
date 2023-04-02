const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user"); // bo obsługa usera jest w innym pliku
const taskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

////////////////////////////
/*
app.use((req, res, next) => {
  res.status(503).send("Server is temporarily disable");
});


app.use((req, res, next) => {
  if (req.method === "GET") {
    res.send("GET request are disable");
  } else {
    next();
  }
});
*/
app.use(express.json()); // automaticly pars incoming json to an object; trafia to do req
app.use(userRouter); // bo obsługa usera jest w innym pliku
app.use(taskRouter);

/////////////////////////

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

/*
const Task = require("./models/tasks");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("64284f00c1a5e58916bc22cc");
  // await task.populate("owner");
  // console.log(task.owner);

  const user = await User.findById("64284df1b52cd943ccb97bbf");
  await user.populate("tasks");
  console.log(user.tasks);
};
main();
*/
