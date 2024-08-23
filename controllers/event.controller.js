const Events = require('../models/event.model'); 

//Añadir nuevo evento
// module.exports.createEvent  = (req, res) =>{ 
//   Events.create(req.body) 
//     .then((newEvent) => {
//       return res.status(201).json(newEvent);
//     })
//     .catch((error) => {
//       res.statusMessage = error;
//       return res.status(400).json({ message: "Error al crear el evento", error });
//     });
// };

module.exports.createEvent = (req, res) => { 
  const eventData = {
    ...req.body,
    imageUrl: req.file ? req.file.filename : null,
  };

  Events.create(eventData)
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
  const updateData = {
    ...req.body,
    imageUrl: req.file ? req.file.filename : req.body.image, 
  };

  Events.findByIdAndUpdate({_id: req.params.id}, updateData, {new: true, runValidators: true})
    .then((updatedEvent)=>{
      return res.status(200).json(updatedEvent)
    })
    .catch((error) => {
      res.statusMessage = error;
      return res.status(400).json({ message: "Error al editar el evento", error });
    })
};

// En el controlador
module.exports.voteForEvent = (req, res) => {
  const eventId = req.params.id;
  
  Events.findByIdAndUpdate(
    eventId,
    { $inc: { votes: 1 } },
    { new: true }
  )
  .then((updatedEvent) => {
    return res.status(200).json(updatedEvent);
  })
  .catch((error) => {
    return res.status(400).json({ message: "Error al votar por el evento", error });
  });
};