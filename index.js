const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const con = require('./handlers/mysql');
global.con = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        con(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

app.use(bodyParser.json());

app.use('/valdorio', require('./routes/valdorio'));

app.get('*', (req, res) => { // in case none of the routes match
    res.status(404).send('Not found');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
