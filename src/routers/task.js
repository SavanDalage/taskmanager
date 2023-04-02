const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/tasks");

/////////////////////////////////////////

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET / tasks?completed=true  albo tasks?completed=false
// limit - limit na stronę
// skip - ile pierwszych pominiętych. Jeżeli, np. limit=10 i skip=10 to pierwsza strona jest pomijana i zaczynamy od drugiej
// GET / task?limit=10&skip=0
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  try {
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }

    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  const _id = req.params.id;

  if (!isValidOperation) {
    return res.status(400).send({ error: "Inwalid update" });
  }

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    res.send("Task by Id: " + req.params.id + " was deleted.");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
