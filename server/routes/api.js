const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// Connect
const connection = (closure) => {
  return MongoClient.connect('mongodb://admin123:admin123@localhost:27017/mean', (err, db) => {
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
  connection((db) => {
    db.collection('images')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].emocje[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/geografia/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesGeografia')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].geografia[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/literatura/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesLiteratura')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].literatura[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/matematyka/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesMatematyka')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].matematyka[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/muzyka/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesMuzyka')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].muzyka[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/polska/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesPolska')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].polska[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/rosliny/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesRosliny')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].rosliny[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/sport/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesSport')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].sport[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/swieta/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesSwieta')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].swieta[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/szachy/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesSzachy')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].szachy[req.params.element];
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});
router.get('/zwierzeta/:element', (req, res) => {
  connection((db) => {
    db.collection('imagesZwierzeta')
      .find()
      .toArray()
      .then((images) => {
        response.data = images[0].zwierzeta[req.params.element];
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
router.get('/templates', (req, res) => {
  connection((db) => {
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
