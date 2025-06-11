const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Goal = require("./models/goal");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});



app.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });

    console.log(
      JSON.stringify({
        level: "info",
        method: req.method,
        path: req.originalUrl,
        status: 200,
        message: "FETCHED GOALS",
      })
    );
  } catch (err) {
    console.log(
      JSON.stringify({
        level: "error",
        method: req.method,
        path: req.originalUrl,
        status: 500,
        message: "ERROR FETCHING GOALS: " + err.message,
      })
    );
    res.status(500).json({ message: "Failed to load goals." });
  }
});

app.post("/goals", async (req, res) => {
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log(
      JSON.stringify({
        level: "warn",
        method: req.method,
        path: req.originalUrl,
        status: 422,
        message: "INVALID INPUT - NO TEXT",
      })
    );
    return res.status(422).json({ message: "Invalid goal text." });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: "Goal saved", goal: { id: goal.id, text: goalText } });

    console.log(
      JSON.stringify({
        level: "info",
        method: req.method,
        path: req.originalUrl,
        status: 201,
        message: "STORED NEW GOAL",
      })
    );
  } catch (err) {
    console.log(
      JSON.stringify({
        level: "error",
        method: req.method,
        path: req.originalUrl,
        status: 500,
        message: "ERROR STORING GOAL: " + err.message,
      })
    );

    res.status(500).json({ message: "Failed to save goal." });
  }
});

app.delete("/goals/:id", async (req, res) => {
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted goal!" });

    console.log(
      JSON.stringify({
        level: "info",
        method: req.method,
        path: req.originalUrl,
        status: 200,
        message: "DELETED GOAL",
      })
    );
  } catch (err) {
    console.log(
      JSON.stringify({
        level: "error",
        method: req.method,
        path: req.originalUrl,
        status: 500,
        message: "ERROR DELETING GOAL: " + err.message,
      })
    );

    res.status(500).json({ message: "Failed to delete goal." });
  }
});

app.get("/goals/400", (req, res) => {
  const errors = [
    { code: 400, message: "Bad Request" },
    { code: 401, message: "Unauthorized" },
    { code: 403, message: "Forbidden" },
    { code: 404, message: "Not Found" },
  ];

  // Pick a random error from the list
  const randomError = errors[Math.floor(Math.random() * errors.length)];

  console.log(
    JSON.stringify({
      level: "error",
      method: req.method,
      path: req.originalUrl,
      status: randomError.code,
      message: randomError.message,
    })
  );

  res.status(randomError.code).json({
    status: "error",
    message: randomError.message,
    code: randomError.code,
  });
});

app.get("/goals/300", (req, res) => {
  const errors = [
    { code: 300, message: "Multiple Choices" },
    { code: 301, message: "Moved Permanently" },
    { code: 302, message: "Found" },
    { code: 303, message: "See Other" },
    { code: 304, message: "Not Modified" },
    { code: 305, message: "Use Proxy" },
    { code: 307, message: "Temporary Redirect" },
    { code: 308, message: "Permanent Redirect" },
  ];
  const randomError = errors[Math.floor(Math.random() * errors.length)];

  console.log(
    JSON.stringify({
      level: "error",
      method: req.method,
      path: req.originalUrl,
      status: randomError.code,
      message: randomError.message,
    })
  );

  // Disable client caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");

  res.status(randomError.code).json({
    status: "error",
    message: randomError.message,
    code: randomError.code,
  });
});
mongoose.connect(
  `mongodb+srv://akif:akif@cluster1.uktxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(
        "FAILED TO CONNECT TO MONGODB,did you added the mongodb url?"
      );
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(5000);
    }
  }
);
