require("../src/db/mongoose");
const { count } = require("yargs");
const User = require("../src/models/user");

// 642054299f17e2b6abf2f336

const findEndUpdate = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

findEndUpdate("642013587871a4c022dfba2d", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

/////////////////////////////////////////////

User.findByIdAndUpdate("642013587871a4c022dfba2d", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("642013587871a4c022dfba2d", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
