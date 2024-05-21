import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
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
    default: () => bcrypt.genSaltSync()
  }
})

const User = model('User', userSchema)

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

app.post('/users', async (req, res) => {
  const {name, email, password} = req.body
  try{
    
    const user = await new User ({name, email, passwor:bcrypt.genSaltSync(password)}).save()
   
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (err){
    res.status(400).json({message: 'Could not creat user', errors: err.errors})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
