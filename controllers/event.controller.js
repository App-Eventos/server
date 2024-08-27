const Events = require('../models/event.model'); 
const UserRegistration = require('./../models/userModel')

//Crear un nuevo evento
module.exports.createEvent = (req, res) => { 
  const eventData = {
    ...req.body,
    imageUrl: req.file ? `${req.file.filename}` : null,
  };

  Events.create(eventData)
    .then((newEvent) => {
      // Agregar el ID del evento creado al array de createdEvents del usuario
      const userId = req.body.createdBy
      console.log(userId)
      return UserRegistration.findByIdAndUpdate(
        userId,
        { $push: { createdEvents: newEvent._id } },
        { new: true }
      );
    })
    .then((newEvent) => {
      return res.status(201).json(newEvent);
    })
    .catch((error) => {
      return res.status(400).json({ message: "Error al crear el evento", error });
    });
};

// Obtener todos los eventos 
module.exports.getAllEvents  = (req, res) =>{
  Events.find()
    .then((eventList) => {
      return res.status(200).json(eventList);
      })
    .catch((error) => {
      return res.status(400).json({ message: "Error al obtener la lista de eventos", error });
    });
};

//Obtener evento por ID
module.exports.getEventId  = (req, res) =>{

  Events.findOne({_id: req.params.id})
    .then((eventId) => {
      return res.status(200).json(eventId);
      })
    .catch((error) => {
      return res.status(400).json({ message: "Error al obtener el evento", error });
    });
};

//Eliminar evento
module.exports.deleteEvent = (req, res) =>{
  Events.findOneAndDelete({_id: req.params.id}) 
    .then(() => {
      return res.status(200).end();
    })
    .catch((error) => {
        return res.status(400).json({ message: "Error al eliminar el evento", error });
    });
};

//Actualizar evento
module.exports.updateEvent = (req, res) =>{
  
  console.log('req.body:', req.body); 
  console.log('req.file:', req.file);
  
  const updateData = {
    ...req.body,
    imageUrl: req.file ? `${req.file.filename}` : null,
  };
  console.log(updateData)

  Events.findByIdAndUpdate({_id: req.params.id}, updateData, {new: true, runValidators: true})
    .then((updatedEvent)=>{
      return res.status(200).json(updatedEvent)
    })
    .catch((error) => {
      res.statusMessage = error;
      return res.status(400).json({ message: "Error al editar el evento", error });
    })
};

// // Guardar el voto
module.exports.voteForEvent = (req, res) => {
  const eventId = req.params.id;
  const { userId } = req.body;

  Events.findById(eventId)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      if (event.voters.includes(userId)) {
        return res.status(400).json({ message: 'Ya has votado por este evento' });
      }

      return Events.findByIdAndUpdate(
        eventId,
        { $inc: { votes: 1 }, $push: { voters: userId } },
        { new: true }
      )
      .then(updatedEvent => {
        res.status(200).json(updatedEvent);
      })
      .catch(error => {
        console.error('Error al votar por el evento:', error);
        res.status(400).json({ message: 'Error al votar por el evento', error });
      });
    })
};

// Ruta para obtener los eventos de un usuario específico
module.exports.getUserCreatedEvents = (req, res) => {
  const {userId} = req.params 
  Events.find({ createdBy: userId })
      .then((eventCreatedBy) => {
          return res.status(200).json(eventCreatedBy);
      })
      .catch((error) => {
          return res.status(400).json({ message: "Error al obtener el evento", error });
      });
};

