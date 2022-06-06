const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;

const url =
  "mongodb+srv://DennisTrujilloDev:hiHello@cluster0.olwy9tk.mongodb.net/?retryWrites=true&w=majority";
const dbName = "to-do";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("views"));

app.get("/", (req, res) => {
  db.collection("to-do-items")
    .find()
    .toArray((err, toDoArray) => {
      console.log(toDoArray);
      if (err) return console.log(err);
      res.render("index.ejs", { todos: toDoArray });
    });
});

app.post("/addToDo", (req, res) => {
  //req from browser, res is what will be sent back via ejs aka html
  const newToDo = {
    name: req.body.toDo,
    isCompleted: false,
    id: new Date().toString(),
  };
  db.collection("to-do-items").insertOne(newToDo, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

app.put("/updateIt", (req, res) => {
  db.collection("to-do-items").findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        isCompleted: true,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/deleteAll", (req, res) => {
  db.collection("to-do-items").findOneAndDelete({id: req.body.id}, (err, result) => {
    if (err) return res.send(500, err);
    res.send("Message deleted!");
  });
});

app.listen(7007, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );

  console.log("running port 7007");
});
