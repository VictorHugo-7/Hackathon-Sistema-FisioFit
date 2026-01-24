import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import logo from '../assets/logo.svg';

const Cadastro = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        if (formData.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                setSuccess('Conta criada com sucesso! Redirecionando para o login...');
                setFormData({ login: '', password: '' });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else if (response.status === 409) {
                setError('Erro ao criar conta. Tente novamente.');
            } else {
                setError('Erro ao criar conta. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setError('Erro de conexão com o servidor');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="w-full max-w-lg rounded-lg border border-[var(--color-gray)]">

                {/* Modal Header */}
                <div className="p-5 flex justify-center items-center gap-2 text-4xl font-semibold border-b-1 border-[var(--color-gray)]">
                    <img src={logo} alt="" />
                    <span>Cadastro</span>
                </div>

                {/* Modal Body */}
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {/* Mensagem de Sucesso */}
                        {success && (
                            <div className="mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                {success}
                            </div>
                        )}

                        {/* Usuário Input */}
                        <div className="mb-3">
                            <div className="flex items-center border border-[var(--color-gray)] rounded">
                                <span className="px-3 py-2 border-r border-[var(--color-gray)]">
                                    <User size={18} className="text-[var(--color-gray)]" />
                                </span>
                                <input
                                    type="text"
                                    name="login"
                                    value={formData.login}
                                    onChange={handleInputChange}
                                    className="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-red-1)] focus:border-transparent rounded-r"
                                    placeholder="Usuário"
                                    required
                                    minLength="3"
                                />
                            </div>
                        </div>

                        {/* Senha Input */}
                        <div className="mb-3">
                            <div className="flex items-center border border-[var(--color-gray)] rounded">
                                <span className="px-3 py-2 border-r border-[var(--color-gray)]">
                                    <Lock size={18} className="text-[var(--color-gray)]" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-red-1)] focus:border-transparent"
                                    placeholder="Senha (mín. 6 caracteres)"
                                    required
                                    minLength="6"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="px-3 py-2 border-l border-[var(--color-gray)] text-[var(--color-gray)] hover:text-[var(--color-black)] cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Botão Cadastrar */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-2 px-4 w-full bg-[var(--color-red-2)] text-[var(--color-white)] font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'CADASTRANDO...' : 'CADASTRAR'}
                        </button>
                    </form>

                    {/* Linha Horizontal */}
                    <hr className="my-4 border-[var(--color-gray)]" />

                    {/* Já tem conta? */}
                    <div className="flex justify-center gap-2">
                        <span>Já tem conta?</span>
                        <Link
                            to="/login"
                            className="text-[var(--color-red-1)] hover:text-[var(--color-red-1)] hover:underline"
                        >
                            Clique aqui
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;