const express = require('express');
const eventController = require('../controllers/event.controller');
const eventRouter = express.Router();
const upload = require('../uploadConfig/uploadConfig');

// eventRouter.post('/new', eventController.createEvent);
eventRouter.post('/new', upload.single('image'), eventController.createEvent);
eventRouter.get('/list', eventController.getAllEvents);
eventRouter.delete('/delete/:id', eventController.deleteEvent);
eventRouter.put('/edit/:id', eventController.updateEvent);


module.exports = eventRouter;