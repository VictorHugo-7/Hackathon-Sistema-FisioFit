import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import conectarAoMongoDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import lembreteRoutes from './routes/lembreteRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/reminders', lembreteRoutes);

const iniciarServidor = async () => {
    await conectarAoMongoDB();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);   
    });
};

iniciarServidor();