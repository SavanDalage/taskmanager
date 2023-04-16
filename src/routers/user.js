const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const Task = require("../models/tasks");
const multer = require("multer");
// const { send } = require("express/lib/response");
const sharp = require("sharp");
const { sendWelcomeEmail, sendGoodbyEmail } = require("../emails/account");

/////////////////////////////////////////////

// nowy user - signup
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.genereteAuthToken();
    await user.save();

    sendWelcomeEmail(user.email, user.name);
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
    sendGoodbyEmail(req.user.email, req.user.name);

    await User.deleteOne(req.user);
    await Task.deleteMany({ owner: req.user._id });

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// upload avatar
const upload = multer({
  // dest: "avatars", // wywalenie destynacji spowoduje, że upload zwraca img z handlera i pozwala coś z nim zrobić
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

// avatar
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 250, height: 250 })
      .toBuffer();
    req.user.avatar = buffer; // możemy tego użyć tylko wtedy gdy w upload nie ma dest. Definiujemy "req.user.avatar"
    await req.user.save();
    res.send();
  },
  (error, res, req, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined; // ustawiamy "req.user.avatar" jako undefind
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
