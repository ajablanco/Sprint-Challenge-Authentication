

const jwt = require('jsonwebtoken');

const secrets = require('../api/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const secret = process.env.JWT_SECRET || 'shhh'
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({you: "cannot pass"})
        console.log("token", token);
        console.log("headers",  req.headers);
        console.log(err)
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({message: "Please provide credentials"})
    console.log("token", token);
    console.log("headers",  req.headers);
  }
};
