const express = require('express');
const app = express();
const port = 8080;

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

app.use('/', express.static(path.join(__dirname, 'dist/fit2095-lab-week12')));

async function translateText(text, target) {
    let [translated] = await translate.translate(text, target);
    return translated
};

io.on('connection', function(socket) {
    console.log('new connection made, ' + socket.id);

    socket.on('translate', async (translateObject) => {
        let translatedText = await translateText(translateObject.text, translateObject.target);
        socket.emit('onTranslation', translatedText);
    });
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});

