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
  date:{ // El manejo de la fecha puede variar dependiendo del uso de un calendario a partir de una libreria
    type: Date, 
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
  access:{
    type: String, 
    required: [true, 'Debes definir el tipo de acceso del evento']
  },
  phoneContact: { 
    type: String,
    required: [true, 'El numero de contacto es requerido']
  }
}, { timestamps: true });

const Events = mongoose.model('events', eventSchema)

module.exports = Events;