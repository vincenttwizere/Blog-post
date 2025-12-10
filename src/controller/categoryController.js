import db from '../config/db.js';


export const create = async (req, res) => {
try {
const { name } = req.body;
if (!name) return res.status(400).json({ message: 'Missing name' });
await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
res.status(201).json({ message: 'Category created' });
} catch (err) {
console.error(err);
if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Category exists' });
res.status(500).json({ message: 'Server error' });
}
};


export const list = async (req, res) => {
try {
const [rows] = await db.query('SELECT id, name, created_at FROM categories');
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
await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
res.json({ message: 'Updated' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const remove = async (req, res) => {
try {
const { id } = req.params;
await db.query('DELETE FROM categories WHERE id = ?', [id]);
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};