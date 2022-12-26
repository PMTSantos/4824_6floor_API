const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const con = require('./handlers/mysql');
/*
* A função abaixo for criada para ao invés de usar as callback functions ser possível designar o valor pedido a uma variável diminuindo as linhas de códido
*/
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

app.get('*', (req, res) => { // para todos os outros endpoints será enviado um erro 404
    res.status(404).send('Not found');
});

app.listen(3000, () => { // A API está a ser executada na porta 3000
    console.log('Listening on port 3000');
})
