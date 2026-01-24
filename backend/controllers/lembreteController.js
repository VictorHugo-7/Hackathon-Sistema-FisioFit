import Lembrete from '../models/Lembrete.js';

// Criar Lembrete
export const createLembrete = async (req, res) => {
    try {
        const novoLembrete = new Lembrete(req.body);
        await novoLembrete.save();
        res.status(201).json(novoLembrete);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Listar Lembretes de um Usuário específico
export const getLembretesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const lembretes = await Lembrete.find({ userId: userId });
        res.status(200).json(lembretes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Deletar Lembrete
export const deleteLembrete = async (req, res) => {
    try {
        const { id } = req.params;
        await Lembrete.findByIdAndDelete(id);
        res.json({ message: "Lembrete deletado com sucesso" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Atualizar Lembrete
export const updateLembrete = async (req, res) => {
    try {
        const { id } = req.params;
        const lembreteAtualizado = await Lembrete.findByIdAndUpdate(id, req.body, { new: true });
        res.json(lembreteAtualizado);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};