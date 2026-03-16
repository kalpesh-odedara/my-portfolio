import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_PATH = path.join(__dirname, '../data/knowledge.json');
const CONTACTS_PATH = path.join(__dirname, '../data/contacts.json');

const projects = [
  { id: 1, name: 'DermAI', tech: ['React', 'Node', 'Python', 'MongoDB'], description: 'AI hospital management with skin detection, chatbot, voice control, mood analysis.' },
  { id: 2, name: 'Role Assign System', tech: ['React', 'Node', 'Python', 'MongoDB'], description: 'University role assignment workflow with AI chatbot.' },
  { id: 3, name: 'Feedback System', tech: ['React', 'Node'], description: 'Subject-wise feedback system for university faculties.' },
  { id: 4, name: 'Furniture Shop', tech: ['ASP.NET'], description: 'Furniture e-commerce website.' },
  { id: 5, name: 'Jewelry Shop', tech: ['ASP.NET'], description: 'Category wise jewelry e-commerce.' },
  { id: 6, name: 'Online Learning', tech: ['ASP.NET'], description: 'Teach and learn platform.' },
  { id: 7, name: 'Alpha Wear', tech: ['HTML', 'CSS', 'JavaScript'], description: 'Fashion e-commerce.' },
];

export const getProjects = (req, res) => {
  res.json({ projects });
};

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required' });
    }

    const contacts = JSON.parse(await fs.readFile(CONTACTS_PATH, 'utf8'));
    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString()
    };
    
    contacts.push(newContact);
    await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2));

    console.log('New lead persisted:', newContact);
    res.json({ success: true, message: 'Contact submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const data = await fs.readFile(CONTACTS_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read contact data' });
  }
};

export const getKnowledge = async (req, res) => {
  try {
    const data = await fs.readFile(KNOWLEDGE_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read knowledge data' });
  }
};

export const updateKnowledge = async (req, res) => {
  try {
    const { dataset, profile } = req.body;
    const currentData = JSON.parse(await fs.readFile(KNOWLEDGE_PATH, 'utf8'));
    
    const newData = {
      dataset: dataset || currentData.dataset,
      profile: profile || currentData.profile
    };

    await fs.writeFile(KNOWLEDGE_PATH, JSON.stringify(newData, null, 2));
    res.json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update knowledge data' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(CONTACTS_PATH, 'utf8'));
    const filtered = contacts.filter(c => c.id !== parseInt(id));
    
    await fs.writeFile(CONTACTS_PATH, JSON.stringify(filtered, null, 2));
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, reply } = req.body;
    const contacts = JSON.parse(await fs.readFile(CONTACTS_PATH, 'utf8'));
    const index = contacts.findIndex(c => c.id === parseInt(id));
    
    if (index === -1) return res.status(404).json({ error: 'Contact not found' });
    
    if (message !== undefined) contacts[index].message = message;
    if (reply !== undefined) contacts[index].reply = reply;
    
    await fs.writeFile(CONTACTS_PATH, JSON.stringify(contacts, null, 2));
    res.json({ success: true, contact: contacts[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};
