const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager-api", {
  useNewUrlParser: true,
});

////////////////////////////////////////////////////////

/*

const odkurzanie = new Task({
  // description: " poodkurzać salon",
});

odkurzanie
  .save()
  .then((task) => {
    console.log(task);
  })
  .catch((e) => {
    console.log("En error: ", e);
  });
*/
////////////////////////////////////////////////////////
/*
const me = new User({
  name: "   LAra   ",
  email: "Lara@o2.pl   ",
  password: "pas",
});

me.save()
  .then((user) => {
    console.log(user);
  })
  .catch((e) => {
    console.log("En error: ", e);
  });
*/
/*
const watering = new Task({
  description: "Watering flowers",
  completed: true,
});

watering
  .save()
  .then((task) => {
    console.log(task);
  })
  .catch((e) => {
    console.log("En error: ", e);
  });
*/
/*
const Cats = mongoose.model("Cats", {
  płeć: {
    type: String,
  },
  wiek: {
    type: Number,
  },
  imię: {
    type: String,
  },
  rasa: {
    type: String,
  },
});

const psotka = new Cats({
  płeć: "kotka",
  wiek: 10,
  imię: "Psotka",
  rasa: "dachowiec",
});

psotka
  .save()
  .then((kot) => {
    console.log(kot);
  })
  .catch((e) => {
    console.log("En error: ", e);
  });
*/

/*
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: "Kris",
  age: 43,
});

me.save()
  .then((user) => {
    console.log(user);
  })
  .catch((e) => {
    console.log("En error: ", e);
  });
*/
