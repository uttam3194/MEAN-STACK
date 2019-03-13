var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Training = require('../models/training');
var UserTraining = require('../models/userTraining');
var passport = require('passport');

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */
// Register new users
router.post('/register', function(req, res, next){
  addToDB(req, res);
});

async function addToDB(req, res){
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });
  try {
    doc = await user.save();
    return res.status(201).json(doc);
  } catch(err) {
    return res.status(501).json(err);
  }
}

// Apply for trainings
router.post('/apply/training', function(req, res, next){
  saveAppliedTraining(req, res);
});

async function saveAppliedTraining(req, res){
  var userTrainingData = new UserTraining({ trainingId: req.body.trainingId,
                  userId: req.body.userId,
                  username: req.body.username,
                  title: req.body.title,
                  trainer: req.body.trainer,
                  sessions: req.body.sessions});
  try {
    doc = await userTrainingData.save();
    return res.status(201).json(doc);
  } catch(err) {
    return res.status(501).json(err);
  }
}

// Delete User training data
router.delete('/delete/user/training/:userId/:trainingId', function(req, res) {
  UserTraining.findOneAndDelete({userId: req.params.userId, trainingId: req.params.trainingId},
    function(err, userTrain) {
      if(err) {
        res.json(err);
      } else {
        res.json('Succssfully removed');
      }
    });
});

router.get('/training/users/:trainingId', function(req, res, next) {
  UserTraining.find({trainingId: req.params.trainingId}, function(err, trainUsers) {
    if(err) {
      res.json(err);
    } else {
      res.json(trainUsers);
    }
  });
});

// Add training data to db
router.post('/add', function(req, res, next) {
  addData(req, res);
});

async function addData(req, res) {
  var training = new Training({
    title: req.body.title,
    topics: req.body.topics,
    days: req.body.days,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    trainer: req.body.trainer,
    sessions: req.body.sessions
  });
  try {
    doc = await training.save();
    return res.status(201).json(doc);
  } catch(err) {
    return res.status(501).json(err);
  }
}

// Get training data
router.get('/view', function(req, res, next) {
  Training.find(function(err, trainings) {
    if(err) {
      console.log(err);
    } else {
      res.json(trainings);
    }
  });
});

// Get User Training data

router.get('/user/training/view/:userId', function(req, res, next) {
  UserTraining.find({userId: req.params.userId}, function(err, userTrain) {
    if(err) {
      res.json(err);
    } else {
      res.json(userTrain);
    }
  });
});

// Delete Training data
router.delete('/delete/:id', function(req, res) {
  Training.findByIdAndRemove({_id: req.params.id}, function(err, train) {
    if (err) {
      res.json(err);
    } else {
      res.json('Succssfully removed');
    }
  });
});

// copy data from http://www.passportjs.org/docs/configure/ --> Custom Callback section
router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message: 'Logged in successfully'});
    });
  })(req, res, next);
});

router.get('/user', isValidUser, function(req, res, next) {
  return res.status(200).json(req.user); // req.user made available by passport deserialize function
});

router.get('/logout', isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logged out Successfully'});
})

// validation middleware function

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

// Get training data for edit
router.route('/training/edit/:id').get(function(req, res) {
  let id = req.params.id;
  Training.findById(id, function(err, train) {
    res.json(train);
  });
});

// Update the training data
router.put('/training/update/:id', function (req, res) {

  let id = req.params.id;

  Training.findById(id, function(err, train) {
    if (!train) {
      return next(new Error('Could not load Document'));
    } else {
      train.title = req.body.title;
      train.topics = req.body.topics;
      train.days = req.body.days;
      train.startdate = req.body.startdate;
      train.enddate = req.body.enddate;
      train.trainer = req.body.trainer;
      train.sessions = req.body.sessions;

      train.save().then(train => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Get the user data for editing
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
      res.json(user);
  });
});

// Update the user data
router.post('/updat/:id', function (req, res) {

  let id = req.params.id;
  console.log(id);
  User.findById(id, function(err, user) {
    if (!user) {
      return next(new Error('Could not load Document'));
    } else {
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      user.creation_dt = req.creation_dt;

      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = router;
