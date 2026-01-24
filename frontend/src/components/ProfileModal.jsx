import { useState } from 'react';
import { X, User, Lock, Save } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, currentUser, currentUserId, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        login: currentUser || '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payload = { login: formData.login };
            if (formData.password) {
                payload.password = formData.password;
            }

            const response = await fetch(`http://localhost:3000/auth/profile/${currentUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Perfil atualizado! Faça login novamente por segurança.");
                onUpdateSuccess();
                onClose();
            } else {
                alert("Erro ao atualizar perfil");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#000000] flex items-center gap-2">
                        <User className="text-[#F23943]" />
                        Editar Perfil
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-[#6C757D]/10 text-[#6C757D]/40 hover:text-[#6C757D] transition cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#6C757D] mb-1">Novo Nome (Login)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-[#6C757D]/60" size={18} />
                            <input 
                                type="text" 
                                value={formData.login}
                                onChange={(e) => setFormData({...formData, login: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none text-[#000000]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#6C757D] mb-1">Nova Senha (opcional)</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-[#6C757D]/60" size={18} />
                            <input 
                                type="password" 
                                placeholder="Deixe em branco para não alterar"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full pl-10 pr-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none text-[#000000]"
                            />
                        </div>
                        <p className="text-xs text-[#6C757D] mt-1">Mínimo 6 caracteres se for alterar.</p>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-[#F23943] hover:bg-[#F2676E] text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                        >
                            <Save size={20} />
                            {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;