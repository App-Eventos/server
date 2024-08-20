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
  start:{
    type: String, 
    required: [true, 'La fecha del evento es requerida']
  },
  end:{ 
    type: String, 
    required: [true, 'La fecha del evento es requerida']
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
}, { timestamps: true });

const Events = mongoose.model('events', eventSchema)

module.exports = Events;