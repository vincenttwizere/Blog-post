import pool from '../config/db.js';
import { makeSlug } from '../utils/helpers.js';


export const listPublished = async (req, res) => {
try {
const { category, tag, author } = req.query;
let sql = `SELECT p.id, p.title, p.slug, p.content, p.status, p.created_at, u.id as author_id, u.name as author_name, c.id as category_id, c.name as category_name, t.id as tag_id, t.name as tag_name
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN tags t ON p.tag_id = t.id
WHERE p.status = 'published'`;


const params = [];
if (category) {
sql += ' AND c.name = ?';
params.push(category);
}
if (tag) {
sql += ' AND t.name = ?';
params.push(tag);
}
if (author) {
sql += ' AND u.name = ?';
params.push(author);
}


const [rows] = await pool.query(sql, params);
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const getBySlug = async (req, res) => {
try {
const { slug } = req.params;
const sql = `SELECT p.id, p.title, p.slug, p.content, p.status, p.created_at, u.id as author_id, u.name as author_name, c.id as category_id, c.name as category_name, t.id as tag_id, t.name as tag_name
FROM posts p
LEFT JOIN users u ON p.author_id = u.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN tags t ON p.tag_id = t.id
WHERE p.slug = ? AND p.status = 'published'`;
const [rows] = await pool.query(sql, [slug]);
if (!rows.length) return res.status(404).json({ message: 'Not found' });
res.json(rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const listAll = async (req, res) => {
try {
let sql = `SELECT p.*, u.name AS author_name FROM posts p LEFT JOIN users u ON p.author_id = u.id`;
const params = [];
if (req.user.role === 'author') {
sql += ' WHERE p.author_id = ?';
params.push(req.user.id);
}
sql += ' ORDER BY p.created_at DESC';
const [rows] = await pool.query(sql, params);
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};