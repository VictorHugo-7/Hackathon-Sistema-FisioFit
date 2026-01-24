import mongoose from 'mongoose';

const lembreteSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    contact: { type: String, required: true },
    contactType: { type: String, enum: ['email', 'phone'], default: 'email' },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const Lembrete = mongoose.model("Lembrete", lembreteSchema);

export default Lembrete;