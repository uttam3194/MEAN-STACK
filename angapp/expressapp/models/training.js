var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title : {type:String, require:true},
  topics: {type:String, require:true},
  days: {type:Number, require:true},
  startdate: {type:Date, require:true},
  enddate: {type:Date, require:true},
  trainer: {type:String, require:true},
  sessions: {type:String, require: true}
});

module.exports = mongoose.model('Training',schema);
