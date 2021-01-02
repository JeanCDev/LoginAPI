const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async (req, res)=>{

  const {error} = registerValidation(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  // check if email is already registered
  const emailExists = await User.findOne({
    email: req.body.email
  });

  if(emailExists) return res.status(400).send("Email already registered");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {

    const savedUser = await user.save();
    res.send({
      user: user._id
    });

  } catch (err) {
    res.status(400).send(err);
  }

});

// login 
router.post('/login', async (req, res) => {

  const {error} = loginValidation(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  // check if email already exists in database
  const user = await User.findOne({
    email: req.body.email
  });

  if(!user) return res.status(400).send("Email is wrong");

  // check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if(!validPassword) return res.status(400).send("Password is wrong");

  // Create and Assign token
  const token = jwt.sign({
    _id: user._id
  }, process.env.TOKEN_SECRET);
  
  res.header("auth-token", token).send(token);

});

module.exports = router;