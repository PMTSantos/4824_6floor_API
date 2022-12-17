const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if(isNaN(id)) return res.status(400).send('Invalid id');

    var sql = 'SELECT * FROM users WHERE id = ?';
    let val = await con(sql, [id])
        
    res.json(val);
});

router.post('/', async (req, res) => {
    const { id, name } = req.body;

    var sql = 'INSERT INTO users (id, name) VALUES (?, ?)';
    await con(sql, [id, name])

    res.send(200);
});

module.exports = router;