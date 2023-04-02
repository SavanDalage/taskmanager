// CRUD create read update delete

const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseN = "taskmanager";

/*
const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());
console.log(id.toString().length);
*/

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
})
  .then((client) => {
    console.log("Connected correctly");

    const db = client.db(databaseN);

    db.collection("users")
      .deleteMany({ age: 27 })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log("An error: ", e);
      });

    db.collection("users")
      .deleteOne({ name: "Kris" })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log("An error: ", e);
      });
    /*
    db.collection("tasks")
      .updateMany({ completion: false }, { $set: { completion: true } })
      .then((results) =>
        console.log(
          `${results.matchedCount} zadań zostało znalezione, a ${results.modifiedCount} zostało zmienione.`
        )
      )
      .catch((e) => {
        console.log("An error: ", e);
      });
      */
    /*
    db.collection("users")
      .updateOne(
        {
          _id: new ObjectId("641eebecdc8d8d8102bf73cd"),
        },
        {
          $inc: {
            age: 1,
          },
        }
      )
      .then((result) => {
        console.log("New name: ", result);
      })
      .catch((e) => {
        console.log("An error: ", e);
      });
      */
    //641eebecdc8d8d8102bf73cd

    /*
    db.collection("tasks")
      .find({ completion: false })
      .toArray()
      .then((element) => {
        console.log("Zadanie wykonane", element);
      })
      .catch((e) => console.log("Some error: ", e));
    */
    /*
    db.collection("users")
      .find({ age: 27 })
      .toArray()
      .then((users) => {
        console.log(users);
      })
      .catch((e) => console.log("Some error: ", e));

    db.collection("users")
      .countDocuments({ age: 27 })
      .then((counters) => {
        console.log("Szukanych użytkwników jest: ", counters);
      })
      .catch((e) => console.log("Some error: ", e));
      */
    /*
    db.collection("tasks")
      .insertMany([
        {
          description: "Poodkurzać",
          completion: true,
        },
        {
          description: "Pozmywać",
          completion: true,
        },
        {
          description: "Zrobić pranie",
          completion: false,
        },
        {
          description: "Posprzątać zwierzaki",
          completion: true,
        },
        {
          description: "Zrobić obiad na jutro",
          completion: false,
        },
      ])
      .then((result) => {
        console.log("Success: ", result.acknowledged);
        // console.log(result.insertedId);
      })
      .catch((e) => {
        console.log("Error worth catchisn: ", e);
      });
      */
    /*
    db.findOne({ _id: new ObjectId("641eebdc15ec9064615e8c2c") })
      .then((user) => {
        console.log("User data: ", user);
      })
      .catch((e) => console.log("Some error: ", e));
      */
    /*
    db.insertOne({
        name: "Mariusz",
        age: 27,
      })
      .then((result) => {
        console.log("Success: ", result.acknowledged);
        console.log(result.insertedId);
      })
      .catch((e) => {
        console.log("Error worth catchisn: ", e);
      });
      */
  })
  .catch((e) => {
    console.error("Unable to connect with Mongo DB", e);
  });

/*
/////////////////////////////////////////
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
