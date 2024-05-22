import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import crypto from "crypto"
// import expressListEndpoints from 'express-list-endpoints';
// import dotenv from "dotenv"


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const {Schema, model} = mongoose

const userSchema = new Schema ({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String, 
    unique: true
  },
  password: {
    type: String,
    required: true
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

const User = model('User', userSchema)

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header("Authorization")
  })

  if (user) {
    req.user = user
    next()
  } else {
    res.status (401).json({
      loggedOut: true
    })
  }
}

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

app.get('/secrets', (req, res)=> {
  res.json({secret: 'This is a super secret message.'})
})

app.post('/users', (req, res) => {
  
  try{
    const {name, email, password} = req.body
    const salt = bcrypt.genSaltSync()
    const user = new User ({name, email, passwor:bcrypt.hashSync(password, salt)})
    user.save()
   
    res.status(201).json({
      success: true,
      message: "User created",
      id: user._id, 
      accessToken: user.accessToken})
  } catch (err){
    res.status(400).json({
      success: false,
      message: 'Could not creat user', 
      errors: err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
