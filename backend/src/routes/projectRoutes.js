import express from 'express';
import { 
  getProjects, 
  createContact, 
  getKnowledge, 
  updateKnowledge, 
  getContacts,
  deleteContact,
  updateContact 
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', getProjects);
router.post('/contact', createContact);
router.get('/contacts', getContacts);
router.delete('/contacts/:id', deleteContact);
router.put('/contacts/:id', updateContact);
router.get('/knowledge', getKnowledge);
router.post('/knowledge', updateKnowledge);

export default router;
