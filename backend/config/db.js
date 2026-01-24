import mongoose from 'mongoose';

const conectarAoMongoDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error("ERRO: A variável MONGO_URL não está no arquivo .env");
        process.exit(1);
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conectado ao MongoDB!");
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
};

export default conectarAoMongoDB;