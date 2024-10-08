import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'


const app = express();
app.use(express.json());

dotenv.config(); // Variables de entorno, ocultar variables en .env

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        console.log(`Origen de la solicitud: ${origin}`); // Logging para depuración
        console.log(`Dominios permitidos: ${dominiosPermitidos}`); // Muestra los dominios permitidos
        if (dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del request es permitido
            callback(null, true)
        } else {
            callback (new Error('No permitido por CORS'))
        }
    }
}

app.use(cors({ origin: '*' }))

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
