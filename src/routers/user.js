const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const Task = require("../models/tasks");
const multer = require("multer");
const { send } = require("express/lib/response");

/////////////////////////////////////////////

// nowy user - signup
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.genereteAuthToken();

    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// logowanie
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.genereteAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// wylogowanie
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// wylogowanie wszystkich
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// podgląd mojego profilu
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// update profilu
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// kasowanie profilu
router.delete("/users/me", auth, async (req, res) => {
  try {
    // await req.user.remove(); // nie działa
    // await User.remove({ owner: req.user });
    await User.deleteOne(req.user);
    await Task.deleteMany({ owner: req.user._id });
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// upload avatar
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a JPG, JPEG or PNG file"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req, res) => {
    res.send();
  },
  (error, res, req, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
