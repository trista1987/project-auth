import cors from "cors";
import express from "express";
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model("User", userSchema);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


// Register new user
app.post("/register", (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const user = new User({
      name,
      phone,
      password: bcrypt.hashSync(password, salt),
    });
    user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).json({
      message: "Could not create user",
      errors: err.errors,
    });
  }
});
// Login
app.post("/login", async (req, res) => {
  const matchUser = await User.findOne({
    name: req.body.name,
  });
  if (matchUser && bcrypt.compareSync(req.body.password, matchUser.password)) {
    res.json({ matchUserId: matchUser._id });
  } else {
    res.json({ message: "User not found." });
  }
});
// Authorize
const authUser = async (req, res, next) => {
  const user = await User.findOne({
    token: req.header("Authorization"),
  });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      message: "failed.",
    });
  }
};
app.get("/secrets", authUser);
app.get("/secrets", (req, res) => {
  res.json({
    secret: "This is secrets.",
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
