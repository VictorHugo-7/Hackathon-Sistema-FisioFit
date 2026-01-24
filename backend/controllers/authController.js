import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

// Lógica de Cadastro
export const signup = async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ mensagem: "Login e senha são obrigatórios" });
        }

        const criptografada = await bcrypt.hash(password, 10);
        
        const usuario = new Usuario({
            login: login,
            password: criptografada
        });

        await usuario.save();
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });                        
    } catch (error) {
        console.error(error);
        res.status(409).json({ mensagem: "Erro ao cadastrar. Usuário já existe ou dados inválidos." });                       
    }
};

// Lógica de Login
export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        
        const user = await Usuario.findOne({ login: login });
        
        if (!user) {
            return res.status(401).json({ mensagem: "Login inválido" });
        }

        const senhaValida = await bcrypt.compare(password, user.password);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha inválida" });
        }

        res.status(200).json({ 
            mensagem: "Login realizado com sucesso",
            login: login,
            id: user._id 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro interno no login" });
    }
};

// Lógica de Perfil
export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { login, password } = req.body;
        const usuario = await Usuario.findById(id);

        if (!usuario) 
            return res.status(404).json({ message: "Usuário não encontrado" });

        if (login) 
            usuario.login = login;

        if (password) {
            const criptografada = await bcrypt.hash(password, 10);
            usuario.password = criptografada;
        }

        await usuario.save();

        res.status(200).json({ 
            message: "Perfil atualizado com sucesso!", 
            login: usuario.login 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
};