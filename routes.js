'use strict';
var express = require('express');
var User = require('./models/user');
var Event = require('./models/event');
var activities = require('./models/sample.json')
var router = express.Router();

// ALL API ROUTES

//GET EVENTS
router.get('/events', function(req, res){
	Event.find(function(err, allWod){
		if(err) {
			res.status(500).json({ error: err.message })
		} else {
    res.json(allWod);
			}
	});
});

//CREATE EVENTS
router.post('/events', function(req,res){
	var newEvent = new Event(req.body);
	console.log(newEvent);
	newEvent.save(function(err, savedEvent){
		if(err){
			res.status(500).json({error: err.message})
		} else {
			res.json(savedEvent);
		}
	});
});

//SHOW EVENTS
router.get('/events/:id', function(req, res){
	var id = req.params.id;
	Event.findById({_id: id}, function(err, foundEvent){
		if (err) {
			res.status(500).json({error: err.message})
		} else {
			res.json(foundEvent);
		}
	})
})

//UPDATE EVENTS
router.put('/events/:id', function(req,res){
	var id = req.params.id;
	Event.findById({_id: id}, function(err, updateEvent){
		if (err) {
			res.status(500).json(err);
		} else {
			updateEvent.title = req.body.title;
			Event.save(function(err, savedEvent){
				if(err){
					res.status(500).json({error: err.message})
				} else {
					res.json(savedEvent);
				}
			});
		}
	})
});

//DELETE EVENTS
router.delete('/events/:id', function(req,res){
	var id = req.params.id;
	Event.findOneAndRemove({_id: id}, function(err, removedEvent){
		if (err){
			res.status(500).json({error: err.message});
		} else {
			res.json(removedEvent)
		}
	})
})

module.exports = router;
