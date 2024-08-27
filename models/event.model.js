const mongoose = require('mongoose');

const eventSchema  = mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Título del evento es requerido']
  },
  description:{
    type: String, 
    required: [true, 'La descripción del evento es requerida'],
    minlength: [5, 'Debe contener al menos 5 caracteres']
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  address:{
    type: String, 
    required: [true, 'La dirección del evento es requerida']
  },
  category:{
    type: String, 
    required: [true, 'La categoría del evento es requerida']
  },
  restriction:{
    type: String, 
    required: [true, 'La restriccion del evento es requerida']
  },
  price: { 
    type: String,
    required: [true, 'El precio es requerido']
  },
  access:{
    type: String, 
    required: [true, 'Debes definir el tipo de acceso del evento']
  },
  phoneContact: { 
    type: String,
    required: [true, 'El numero de contacto es requerido']
  },
  imageUrl: { 
    type: String 
  },
  votes: {
    type: Number,
    default: 0, 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'userRegister',
    required: true 
},
}, { timestamps: true });

const Events = mongoose.model('events', eventSchema)

module.exports = Events;