const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const secrets = require('../api/secrets')


router.post('/register', (req, res) => {
  let user = req.body;

  //rounds are 2 to the N times
  const rounds = process.env.HASH_ROUNDS || 4

  // hash the creds.password

  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  Users.add(user) 
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password }= req.body;

  Users.findBy ({username})
  .first()
  .then(found => {
    console.log("found", found);
    if (found && bcrypt.compareSync(password, found.password)) {
      const token = generateToken(found);

      res.status(201).json({message: "you are now logged in", token});
    } else {
      res.status(401).json({message: "you cannot pass"})
      console.log(err)
    }
  })
  .catch(err => {
    res.status(500).json({message: 'invalid credentials'})
  })
});

function generateToken(user) {
  //the payload is the data
  const payload = {
    userId: user.id,
    username:  user.username
  }
  const secret = 'shhh'
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
