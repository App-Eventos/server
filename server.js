const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')


require('./config/database.config') 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRoutes);


app.listen(8080, () => {
  console.log('El servidor ya está encendido en el puerto 8080.');
}); 