import express from 'express';
import { pool } from '../database.js';

const contactController = express.Router();

// Endpoint para obtener todos los contactos
contactController.get('/contacts/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contactos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para obtener un contacto por su ID
contactController.get('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM contactos WHERE id = ?', [contactId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para crear un nuevo contacto
contactController.post('/contacts', async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, correo, telefono } = req.body;
  try {
    await pool.query('INSERT INTO contactos (nombre, apellido, fecha_nacimiento, correo, telefono) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, fecha_nacimiento, correo, telefono]);
    res.json({ message: 'Contacto creado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Endpoint para actualizar un contacto por su ID
contactController.put('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;
  const { nombre, apellido, fecha_nacimiento, correo, telefono } = req.body;
  try {
    const [result] = await pool.query('UPDATE contactos SET nombre=?, apellido=?, correo=?, telefono=? WHERE id = ?', [nombre, apellido, correo, telefono, contactId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Contacto actualizado con éxito' });
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}); 

// Endpoint para eliminar un contacto por su ID
contactController.delete('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM contactos WHERE id = ?', [contactId]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Contacto eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default contactController;
