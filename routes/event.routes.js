const express = require('express');
const eventController = require('../controllers/event.controller');
const eventRouter = express.Router();
const upload = require('../uploadConfig/uploadConfig');
// const validateToken = require('../middlewares/validateToken');

// eventRouter.post('/new', eventController.createEvent);
eventRouter.post('/new', upload.single('image'), eventController.createEvent);
eventRouter.get('/list', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEventId);
eventRouter.delete('/delete/:id', eventController.deleteEvent);
eventRouter.put('/edit/:id', eventController.updateEvent);
eventRouter.put('/vote/:id', eventController.voteForEvent);



module.exports = eventRouter;