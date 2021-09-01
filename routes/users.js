const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/signup', async (req, res, next) => {
  console.log(req.body)
  try {
    //Check fo rexsisting email
    const user = await User.find({ email: req.body.email });

    if (user.length >= 1) {
      return res.status(409).json({
        message: "User already exists"
      })
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      //Create new user
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: password,
        name: req.body.name,
        user_type: 'user'
      });

      await newUser.save();
      res.status(201).json({
        message: 'User created successfully'
      });
    };
  } catch (error) {
    res.status(500).json({
      message: 'Failure to create user'
    });
  }
});

router.post('/admin-signup', async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length > 1) {
      return res.status(409).json({
        message: 'User already exists'
      });
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      //Create new user
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: password,
        name: req.body.name,
        user_type: 'admin'
      });

      await newUser.save();
      res.status(201).json({
        message: 'Admin created successfully'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Admin creation failed',
      error: error
    });
  }
})

router.post('/login', async (req, res, next) => {
  console.log(req.body);
  const user = await User.find({ email: req.body.email });
  try {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Authenticatin failure'
      });
    } else {
      const password = await bcrypt.compareSync(req.body.password, user[0].password);

      if (password) {
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
          process.env.SECRET,
          {
            expiresIn: '1h'
          }
        )
        return res.status(200).json({
          message: 'Authentication successfull',
          user_type: user[0].user_type,
          token: token
        })
      }
    }
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failure',
      error: error
    });
  }
});

module.exports = router;
