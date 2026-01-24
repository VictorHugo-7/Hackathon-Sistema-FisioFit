import express from 'express';
import { createLembrete, getLembretesByUser, deleteLembrete, updateLembrete } from '../controllers/lembreteController.js';

const router = express.Router();

router.post('/', createLembrete);
router.get('/:userId', getLembretesByUser);
router.delete('/:id', deleteLembrete);
router.put('/:id', updateLembrete);

export default router;