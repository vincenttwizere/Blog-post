import pool from '../config/db.js';


export const create = async (req, res) => {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ message: 'Missing name' });
await pool.query('INSERT INTO tags (name) VALUES (?)', [name]);
res.status(201).json({ message: 'Tag created' });
} catch (err) {
console.error(err);
if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Tag exists' });
res.status(500).json({ message: 'Server error' });
}
};


export const list = async (req, res) => {
try {
const [rows] = await pool.query('SELECT id, name, created_at FROM tags');
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const update = async (req, res) => {
try {
const { id } = req.params;
const { name } = req.body;
await pool.query('UPDATE tags SET name = ? WHERE id = ?', [name, id]);
res.json({ message: 'Updated' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const remove = async (req, res) => {
try {
const { id } = req.params;
await pool.query('DELETE FROM tags WHERE id = ?', [id]);
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};