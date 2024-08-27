const express = require('express');
const userController = require('../controllers/userController');
const userRoutes = express.Router();
const validateToken= require('../middlewares/validateToken')

userRoutes.post('/new', userController.createUser);
userRoutes.get('/', validateToken, userController.getAllUsers);
userRoutes.post('/login', userController.login);
userRoutes.post('/favorites', validateToken,userController.addToFavorites);
userRoutes.get('/favorites',validateToken, userController.getFavorites);
userRoutes.delete('/favorites/:eventId',validateToken, userController.removeFromFavorites);


module.exports = userRoutes;
