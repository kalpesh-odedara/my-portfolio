import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_PATH = path.join(__dirname, '../data/knowledge.json');

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
    const { name, email, message, company } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email and message are required' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database connection is not ready. Please check your Backend/.env file and ensure MONGODB_URI is correct.' 
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
      company
    });
    
    await newContact.save();

    console.log('New lead persisted to MongoDB:', newContact);
    res.json({ success: true, message: 'Contact submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contact data' });
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
    const result = await Contact.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, reply } = req.body;
    
    const updateData = {};
    if (message !== undefined) updateData.message = message;
    if (reply !== undefined) updateData.reply = reply;
    
    const contact = await Contact.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );
    
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    
    res.json({ success: true, contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};