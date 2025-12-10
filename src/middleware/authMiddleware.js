import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/db.js';

dotenv.config();

const authMiddleware = (req, res, next) => {

    try{

        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [rows] =  db.query('SELECT id, username, email FROM users WHERE id = ? LIMIT 1', [decoded.id]);

        if (rows.length === 0) return res.status(401).json({ message: 'Unauthorized' });

        req.user = rows[0];
        next();

    } catch (err){
        
        console.error(err);
        return res.status(404).json({ message: 'Invalid token'})
    }
};

export default authMiddleware;