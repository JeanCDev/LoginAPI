const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require("./routes/post");

dotenv.config();

// connection with database 
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  ()=>{
    console.log("Connection ok");
  }
);

// middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute)

app.listen(3000, () => {
  console.log("Server Running");
});
