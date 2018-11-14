const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

// Connect
const connection = (closure) => {
  //return MongoClient.connect('mongodb://admin123:admin123@localhost:27017/mean', (err, db) => {
  return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
    //db.authenticate('admin123', 'admin123');
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
router.get('/emocje/:element', (req, res) => {
  redis.get('emocje' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('emocje');
        db.collection('images')
          .find()
          .toArray()
          .then((images) => {
            redis.set('emocje' + req.params.element, images[0].emocje[req.params.element], () => {
              response.data = images[0].emocje[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});

router.get('/geografia/:element', (req, res) => {
  redis.get('geografia' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('geografia');
        db.collection('imagesGeografia')
          .find()
          .toArray()
          .then((images) => {
            redis.set('geografia' + req.params.element, images[0].geografia[req.params.element], () => {
              response.data = images[0].geografia[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});

router.get('/literatura/:element', (req, res) => {
  redis.get('literatura' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('literatura');
        db.collection('imagesLiteratura')
          .find()
          .toArray()
          .then((images) => {
            redis.set('literatura' + req.params.element, images[0].literatura[req.params.element], () => {
              response.data = images[0].literatura[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/matematyka/:element', (req, res) => {
  redis.get('matematyka' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('matematyka');
        db.collection('imagesMatematyka')
          .find()
          .toArray()
          .then((images) => {
            redis.set('matematyka' + req.params.element, images[0].matematyka[req.params.element], () => {
              response.data = images[0].matematyka[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/muzyka/:element', (req, res) => {
  redis.get('muzyka' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('muzyka');
        db.collection('imagesMuzyka')
          .find()
          .toArray()
          .then((images) => {
            redis.set('muzyka' + req.params.element, images[0].muzyka[req.params.element], () => {
              response.data = images[0].muzyka[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/polska/:element', (req, res) => {
  redis.get('polska' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('polska');
        db.collection('imagesPolska')
          .find()
          .toArray()
          .then((images) => {
            redis.set('polska' + req.params.element, images[0].polska[req.params.element], () => {
              response.data = images[0].polska[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/rosliny/:element', (req, res) => {
  redis.get('rosliny' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('rosliny');
        db.collection('imagesRosliny')
          .find()
          .toArray()
          .then((images) => {
            redis.set('rosliny' + req.params.element, images[0].rosliny[req.params.element], () => {
              response.data = images[0].rosliny[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/sport/:element', (req, res) => {
  redis.get('sport' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('sport');
        db.collection('imagesSport')
          .find()
          .toArray()
          .then((images) => {
            redis.set('sport' + req.params.element, images[0].sport[req.params.element], () => {
              response.data = images[0].sport[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/swieta/:element', (req, res) => {
  redis.get('swieta' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('swieta');
        db.collection('imagesSwieta')
          .find()
          .toArray()
          .then((images) => {
            redis.set('swieta' + req.params.element, images[0].swieta[req.params.element], () => {
              response.data = images[0].swieta[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/szachy/:element', (req, res) => {
  redis.get('szachy' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('szachy');
        db.collection('imagesSzachy')
          .find()
          .toArray()
          .then((images) => {
            redis.set('szachy' + req.params.element, images[0].szachy[req.params.element], () => {
              response.data = images[0].szachy[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/zwierzeta/:element', (req, res) => {
  redis.get('zwierzeta' + req.params.element, (err, images) => {
    if (err) res(null);
    else if (images) {
      console.log('images: ' + images)
      response.data = images;
      res.json(response);
    }
    else {
      connection((db) => {
        console.log('zwierzeta');
        db.collection('imagesZwierzeta')
          .find()
          .toArray()
          .then((images) => {
            redis.set('zwierzeta' + req.params.element, images[0].zwierzeta[req.params.element], () => {
              response.data = images[0].zwierzeta[req.params.element];
              res.json(response);
            });
            //response.data = images[0].emocje[req.params.element];
            //res.json(response);
          })
          .catch((err) => {
            sendError(err, res);
          });
      });
    }
  });
});
router.get('/base64Img', (req, res) => {
  connection((db) => {
    console.log('base64');
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
router.get('/testMongo', (req, res) => {
  connection((db) => {
    console.log('dasda');
    db.collection('testCol')
      .find()
      .toArray()
      .then((templates) => {
        response.data = templates;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/templates', (req, res) => {
  connection((db) => {
    console.log('templates');
    db.collection('templates')
      .find()
      .toArray()
      .then((templates) => {
        response.data = templates;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/font', (req, res) => {
  connection((db) => {
    console.log('font');
    db.collection('font')
      .find()
      .toArray()
      .then((fonts) => {
        response.data = fonts;
        res.json(fonts);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
module.exports = router;
