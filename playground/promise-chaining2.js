require("../src/db/mongoose");
const Task = require("../src/models/tasks");

/*
Task.findByIdAndDelete("641ff7c452eda25d0b42eca4")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
*/

const deleteTaskById = async (id) => {
  const deleted = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: true });
  return count;
};

deleteTaskById("6420997591225fa15874efeb")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
