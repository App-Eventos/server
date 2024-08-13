const express = require('express');
const eventController = require('../controllers/event.controller');
const eventRouter = express.Router();

eventRouter.post('/new', eventController.createEvent);
eventRouter.get('/list', eventController.getAllEvents);
eventRouter.delete('/delete/:id', eventController.deleteEvent);
eventRouter.put('/edit/:id', eventController.updateEvent);


module.exports = eventRouter;