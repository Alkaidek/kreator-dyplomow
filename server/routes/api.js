const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get('/user', (req, res) => {
  connection((db) => {
    db.collection('user')
      .find()
      .toArray()
      .then((user) => {
        response.data = user;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/sport', (req, res) => {
  connection((db) => {
    db.collection('images')
      .find()
      .toArray()
      .then((images) => {
        response.data = images;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/base64Img', (req, res) => {
  connection((db) => {
    db.collection('base64')
      .find()
      .toArray()
      .then((base64) => {
        response.data = base64;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
module.exports = router;
