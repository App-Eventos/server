const express = require('express');
const app = express();
const cors = require('cors');
const eventRouter = require('./routes/event.routes')

require('./config/database.config') 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/event', eventRouter)


app.listen(8080, () => {
  console.log('El servidor ya está encendido en el puerto 8080.');
}); 