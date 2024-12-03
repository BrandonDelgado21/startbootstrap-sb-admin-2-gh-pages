const express = require('express');
const bcrypt = require('bcryptjs'); 
const pool = require('../config/db'); 
const supabase = require('../config/supabase'); 
const router = express.Router();

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        
        const existingUser = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO clients (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [firstName, lastName, email, hashedPassword]
        );

        
        const { data, error } = await supabase
            .from('clients')
            .insert([{ first_name: firstName, last_name: lastName, email, password: hashedPassword }]);

        if (error) {
            return res.status(500).json({ error: "Error saving to Supabase" });
        }

        
        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
