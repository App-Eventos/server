const UserRegistration = require('../models/userModel');
const jwt = require('jsonwebtoken');
const clave = "esto_es_secreto";


module.exports.createUser = (req, res) => {
    UserRegistration.create(req.body)
        .then((newUser) => {
            const infoEnToken = {
                name: newUser.name,
                lastName: newUser.lastName,
                email: newUser.email,
            }

            jwt.sign(infoEnToken, clave, {expiresIn: '5m'}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error al generar el token'});
                }
                return res.status(200).json({token});
            });
        })
        .catch((error) => {
            console.log(error.message);
            res.statusMessage = error.message;
            return res.status(400).json(error.message);
        });
};


module.exports.getAllUsers = (req, res) => {
    UserRegistration.find()
        .then((userList) => {
            return res.status(200).json(userList);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

module.exports.login = (req, res) => {
    const {email, password} = req.body;
    
    UserRegistration.findOne({email, password})
        .then((userFound) => {
            if(! userFound){
                res.statusMessage = 'Credenciales incorrectas.';
                return res.status(404).json({message: 'Credenciales incorrectas.'});
            }
            
            const infoInToken = {
                name: userFound.name,
                lastName: userFound.lastName,
                email: userFound.email
            }

            jwt.sign(infoInToken, clave, {expiresIn: '5m'}, (error, token) => {
                if(error){
                    return res.status(400).json({message: 'Error al generar el token'});
                }
                return res.status(200).json({token});
            });
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
}




