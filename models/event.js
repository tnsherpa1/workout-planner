var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: String
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;
