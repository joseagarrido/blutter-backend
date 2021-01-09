const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();
console.log('init server');

bands.addBand(new Band ('quQuuenun'));
bands.addBand(new Band ('jsjss'));
bands.addBand(new Band ('eeedxe'));

console.log(bands.getBands());


// mensajes de sockets

io.on('connection', client => {
    console.log('Cliente conectado'); 
    
    client.emit('bandas-activas', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
     });
  
     client.on('mensaje', (payload) =>{
         console.log('Mensaje', payload);
         io.emit('mensaje', {admin:'nuevo mensaje'});
     });
  
     client.on('votarBanda', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('bandas-activas', bands.getBands());
         //io.emit('nuevo-mensaje', payload); todo el mundo
         //client.broadcast.emit('nuevo-mensaje', payload);
     });

     client.on('sumarBanda', (payload)=>{
        bands.addBand(new Band(payload.banda));
        console.log(bands);
        io.emit('bandas-activas', bands.getBands());
         //io.emit('nuevo-mensaje', payload); todo el mundo
         //client.broadcast.emit('nuevo-mensaje', payload);
     });

     client.on('borrarBanda', (payload)=>{
        bands.deleteBand(payload.id);
        console.log(bands);
        io.emit('bandas-activas', bands.getBands());
        
     });
  });