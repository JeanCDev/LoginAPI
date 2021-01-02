const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/user');

// protected route
router.get('/', verify, (req, res, next) => {

  res.json({
    posts: {
      title: 'My first post',
      description: 'Random data you should not access!'
    }
  });

});

module.exports = router;