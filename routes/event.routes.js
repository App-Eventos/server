const express = require('express');
const eventController = require('../controllers/event.controller');
const eventRouter = express.Router();
const upload = require('../uploadConfig/uploadConfig');
const validateToken = require('../middlewares/validateToken');

eventRouter.post('/new',  upload.single('image'), eventController.createEvent);
eventRouter.get('/list', eventController.getAllEvents);
eventRouter.get('/:id', eventController.getEventId);
eventRouter.delete('/delete/:id', eventController.deleteEvent);
eventRouter.put('/edit/:id', eventController.updateEvent);
eventRouter.put('/vote/:id', eventController.voteForEvent);

// Ruta para obtener los eventos creados por el usuario autenticado
eventRouter.get('/createdBy/:userId', eventController.getUserCreatedEvents);

module.exports = eventRouter;