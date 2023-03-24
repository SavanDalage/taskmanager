// CRUD create read update delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseN = "taskmanager";

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
})
  .then((client) => {
    console.log("Connected correctly");

    const db = client.db(databaseN);

    db.collection("users").insertOne({
      name: "Kris",
      age: 42,
    });
    // const elements = db.collection("users").find();
    // console.log({ elements });
  })
  .catch((e) => {
    console.error("Unable to connect with Mongo DB", e);
  });

/*
(async () => {
  try {
    const client = await MongoClient.connect(connectionURL, {
      useNewUrlParser: true,
    });
    console.log("Connected correctly");

    const db = client.db(databaseN);

    db.collection("users").insertOne({
      name: "Kris",
      age: 42,
    });
    // const elements = db.collection("users").find();
    // console.log({ elements });
  } catch (e) {
    console.log("ERROR", e);
  }
})();
*/

/*
db.collection("users").insertOne({
  name: "Kris",
  age: 42,
});
*/
