const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user"); // bo obsługa usera jest w innym pliku
const taskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

////////////////////////////

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a Word document"));
    }

    cb(undefined, true);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, re, res, nex) => {
    res.status(400).send({ error: error.message });
  }
);

////////////////////////////

app.use(express.json()); // automaticly pars incoming json to an object; trafia to do req
app.use(userRouter); // bo obsługa usera jest w innym pliku
app.use(taskRouter);

/////////////////////////

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
