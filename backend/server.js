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
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    default: () => bcrypt.genSaltSync(),
  },
});

const User = model("User", userSchema);

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});


// Register new user
app.post("/register", (req, res) => {
  try{
    const {name, phone, password} = req.body
    const salt = bcrypt.genSaltSync()
    const user = new User ({name, phone, password: bcrypt.hashSync(password, salt)}).save()

    res.status(201).send(user)
  } catch(err) {
    res.status(400).json({
      message: 'Could not create user',
      errors: err.errors
    })
  }
})

// Login
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist. Please register first." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. Please try again." });
    }

    // Generate token here if needed or send a success response
    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).json({
      message: "Server error during login process.",
      errors: err,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
