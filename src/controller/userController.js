import pool from '../config/db.js';
import bcrypt from 'bcryptjs';


export const listUsers = async (req, res) => {
try {
const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const createAuthor = async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });


const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
if (exists.length) return res.status(400).json({ message: 'Email already in use' });


const hashed = await bcrypt.hash(password, 10);
await pool.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)', [name, email, hashed, 'author']);
res.status(201).json({ message: 'Author created' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const deleteUser = async (req, res) => {
try {
const { id } = req.params;
await pool.query('DELETE FROM users WHERE id = ?', [id]);
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};