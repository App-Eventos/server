const express = require('express');
const userController = require('../controllers/userController');
const userRoutes = express.Router();
const validateToken= require('../middlewares/validateToken')

userRoutes.post('/new', userController.createUser);
userRoutes.get('/', validateToken, userController.getAllUsers);
userRoutes.post('/login', userController.login);

module.exports = userRoutes;
