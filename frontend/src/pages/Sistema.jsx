import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, User, ChevronLeft, ChevronRight, Bell, Calendar as CalendarIcon, Phone, Mail, Trash2, Edit2, PlusCircle, X } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ProfileModal from '../components/ProfileModal';
import logo from '../assets/logo.svg';

function Sistema() {
    const [userLogin, setUserLogin] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reminders, setReminders] = useState([]);
    
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        contact: '', 
        contactType: 'email' 
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');
        const storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            alert("Sessão expirada. Faça login novamente.");
            navigate('/login');
            return;
        }
        setUserLogin(login || 'Usuário');
        setUserId(storedUserId);
        fetchReminders(storedUserId);
    }, [navigate]);

    const fetchReminders = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/reminders/${id}`);
            if (response.ok) {
                const data = await response.json();
                setReminders(data);
            }
        } catch (error) {
            console.error("Erro ao buscar lembretes:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const generateCalendarDays = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        return eachDayOfInterval({ start: startDate, end: endDate });
    };

    const getRemindersForDay = (day) => {
        return reminders.filter(r => {
            if (!r.date) return false; 
            
            return isSameDay(parseISO(r.date), day);
        });
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const handleNewReminder = () => {
        setEditingId(null);
        setFormData({ title: '', time: '', contact: '', contactType: 'email' });
        setIsModalOpen(true);
    };

    const handleEditClick = (reminder) => {
        setSelectedDate(parseISO(reminder.date));
        setEditingId(reminder._id);
        setFormData({
            title: reminder.title,
            time: reminder.time,
            contact: reminder.contact,
            contactType: reminder.contactType
        });
        setIsModalOpen(true);
    };

    const handleSaveReminder = async (e) => {
        e.preventDefault();
        
        const payload = {
            userId: userId,
            date: selectedDate.toISOString(),
            ...formData
        };

        try {
            let response;
            if (editingId) {
                response = await fetch(`http://localhost:3000/reminders/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                response = await fetch(`http://localhost:3000/reminders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (response.ok) {
                alert(editingId ? 'Lembrete atualizado!' : 'Lembrete criado!');
                fetchReminders(userId);
                closeModal();
            } else {
                alert("Erro ao salvar lembrete");
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão");
        }
    };

    const handleDeleteReminder = async (idToDelete) => {
        if (window.confirm('Tem certeza que deseja excluir este lembrete?')) {
            try {
                const response = await fetch(`http://localhost:3000/reminders/${idToDelete}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    fetchReminders(userId);
                    if(isModalOpen) closeModal();
                } else {
                    alert("Erro ao excluir");
                }
            } catch (error) {
                console.error("Erro:", error);
            }
        }
    };

    const closeModal = () => {
        setFormData({ title: '', time: '', contact: '', contactType: 'email' });
        setEditingId(null);
        setIsModalOpen(false);
    };

    const handleProfileUpdateSuccess = () => {
        handleLogout();
    };

    const selectedDayReminders = getRemindersForDay(selectedDate);

    return (
        <div className="min-h-screen bg-[#6C757D]/5 font-sans flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-[#6C757D]/20 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="" />
                            <h1 className="text-xl font-bold text-[#000000]">FisioFit</h1>
                        </div>

                        <div className="flex items-center gap-4">

                            <div 
                                onClick={() => setIsProfileModalOpen(true)}
                                className="hidden md:flex items-center gap-2 text-[#6C757D] bg-[#6C757D]/5 px-3 py-1.5 rounded-full border border-[#6C757D]/20 cursor-pointer hover:bg-[#F23943]/5 hover:border-[#F23943]/30 transition-colors"
                                title="Clique para editar perfil"
                            >
                                <User size={18} />
                                <span className="font-medium text-sm">{userLogin}</span>
                            </div>

                            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-[#F23943] hover:bg-[#F23943]/10 rounded-lg transition-colors text-sm font-medium cursor-pointer">
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-6">
                
                {/* CALENDÁRIO */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
                        <h2 className="text-2xl font-bold text-[#000000] capitalize">
                            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                        </h2>
                        <div className="flex gap-2 text-[#6C757D]">
                            <button onClick={prevMonth} className="p-2 hover:bg-[#6C757D]/10 rounded-lg transition cursor-pointer">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextMonth} className="p-2 hover:bg-[#6C757D]/10 rounded-lg transition cursor-pointer">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-[#6C757D]/20 overflow-hidden">
                        <div className="grid grid-cols-7 bg-[#6C757D]/5 border-b border-[#6C757D]/20">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                <div key={day} className="py-3 text-center text-sm font-semibold text-[#6C757D] uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 divide-x divide-[#6C757D]/10">
                            {generateCalendarDays().map((day) => {
                                const isCurrentMonth = isSameMonth(day, currentDate);
                                const isToday = isSameDay(day, new Date());
                                const isSelected = isSameDay(day, selectedDate);
                                const dayReminders = getRemindersForDay(day);
                                const hasReminders = dayReminders.length > 0;

                                return (
                                    <div 
                                        key={day.toString()} 
                                        onClick={() => handleDayClick(day)}
                                        className={`
                                            min-h-[100px] p-2 transition-all cursor-pointer border-b border-[#6C757D]/10 relative
                                            ${!isCurrentMonth ? 'bg-[#6C757D]/5 text-[#6C757D]/40' : 'bg-white text-[#000000]'}
                                            ${isSelected ? 'ring-2 ring-inset ring-[#F23943] bg-[#F23943]/10' : 'hover:bg-[#6C757D]/5'}
                                        `}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`
                                                w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                                                ${isToday ? 'bg-[#F23943] text-white shadow-md' : ''}
                                                ${isSelected && !isToday ? 'bg-[#F23943]/20 text-[#F23943]' : ''}
                                            `}>
                                                {format(day, 'd')}
                                            </span>

                                            {hasReminders && (
                                                <div className="mt-2 flex items-center justify-center">
                                                    <span className="bg-[#F23943] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                        {dayReminders.length} {dayReminders.length === 1 ? 'Lembrete' : 'Lembretes'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR */}
                <aside className="w-full lg:w-96 bg-white rounded-xl shadow-lg border border-[#6C757D]/20 flex flex-col overflow-hidden h-fit sticky top-24">
                    <div className="p-6 border-b border-[#6C757D]/10 bg-[#6C757D]/5">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-bold text-[#000000]">Agendamentos</h3>
                            <span className="text-xs font-medium bg-[#F23943]/10 text-[#F23943] px-2 py-1 rounded-full">
                                {selectedDayReminders.length} total
                            </span>
                        </div>
                        <p className="text-[#6C757D] capitalize">
                            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                        </p>
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto max-h-[500px] space-y-3">
                        {selectedDayReminders.length === 0 ? (
                            <div className="text-center py-10 text-[#6C757D]/40">
                                <Bell size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Nenhum lembrete para este dia.</p>
                                <p className="text-sm">Clique em adicionar para começar.</p>
                            </div>
                        ) : (
                            selectedDayReminders.map(reminder => (
                                <div key={reminder._id} className="bg-white border border-[#6C757D]/10 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-[#000000]">{reminder.title}</h4>
                                        <span className="text-xs font-mono bg-[#6C757D]/10 px-1.5 py-0.5 rounded text-[#6C757D]">
                                            {reminder.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#6C757D] mb-3">
                                        {reminder.contactType === 'email' ? <Mail size={14} /> : <Phone size={14} />}
                                        <span className="truncate">{reminder.contact}</span>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-2 pt-2 border-t border-[#6C757D]/10">
                                        <button 
                                            onClick={() => handleEditClick(reminder)}
                                            className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-[#F23943] hover:bg-[#F23943]/10 py-1.5 rounded transition cursor-pointer"
                                        >
                                            <Edit2 size={14} /> Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteReminder(reminder._id)}
                                            className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-[#F23943] hover:bg-[#F23943]/10 py-1.5 rounded transition cursor-pointer"
                                        >
                                            <Trash2 size={14} /> Excluir
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-[#6C757D]/10 bg-[#6C757D]/5">
                        <button 
                            onClick={handleNewReminder}
                            className="w-full flex items-center justify-center gap-2 bg-[#F23943] hover:bg-[#F2676E] text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <PlusCircle size={20} />
                            Adicionar Lembrete
                        </button>
                    </div>
                </aside>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#000000] flex items-center gap-2">
                                {editingId ? <Edit2 className="text-[#F23943]" /> : <Bell className="text-[#F23943]" />}
                                {editingId ? 'Editar Lembrete' : 'Novo Lembrete'}
                            </h3>
                            <button onClick={closeModal} className="p-1 rounded-full hover:bg-[#6C757D]/10 text-[#6C757D]/40 hover:text-[#6C757D] transition cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-6 bg-[#F23943]/5 p-3 rounded-lg border border-[#F23943]/20">
                            <p className="text-sm text-[#F23943]">
                                Data selecionada: <strong>{format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</strong>
                            </p>
                        </div>

                        <form onSubmit={handleSaveReminder} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#6C757D] mb-1">Título</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Ex: Fisioterapia"
                                    className="w-full px-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none transition text-[#000000]"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#6C757D] mb-1">Horário</label>
                                    <input 
                                        type="time" 
                                        required
                                        className="w-full px-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none text-[#000000]"
                                        value={formData.time}
                                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6C757D] mb-1">Tipo</label>
                                    <select 
                                        className="w-full px-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none text-[#000000]"
                                        value={formData.contactType}
                                        onChange={(e) => setFormData({...formData, contactType: e.target.value})}
                                    >
                                        <option value="email">E-mail</option>
                                        <option value="phone">WhatsApp</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#6C757D] mb-1">Contato</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6C757D]/60">
                                        {formData.contactType === 'email' ? <Mail size={18}/> : <Phone size={18}/>}
                                    </div>
                                    <input 
                                        type={formData.contactType === 'email' ? 'email' : 'tel'} 
                                        required
                                        placeholder={formData.contactType === 'email' ? 'email@exemplo.com' : '(11) 99999-9999'}
                                        className="w-full pl-10 pr-4 py-2 border border-[#6C757D]/30 rounded-lg focus:ring-2 focus:ring-[#F23943] focus:border-[#F23943] outline-none transition text-[#000000]"
                                        value={formData.contact}
                                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    className="w-full bg-[#F23943] hover:bg-[#F2676E] text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
                                >
                                    {editingId ? 'Salvar Alterações' : 'Criar Agendamento'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                currentUser={userLogin}
                currentUserId={userId}
                onUpdateSuccess={handleProfileUpdateSuccess}
            />
        </div>
    );
}

export default Sistema;