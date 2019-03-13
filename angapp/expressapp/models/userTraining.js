var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  trainingId: {type:String, require:true},
  userId : {type:String, require:true},
  username: {type:String, require:true},
  title: {type:String, require:true},
  trainer: {type:String, require:true},
  sessions: {type:String, require:true}
});

module.exports = mongoose.model('UserTraining',schema);
