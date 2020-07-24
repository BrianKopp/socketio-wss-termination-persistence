const express = require('express');

const app = express();
app.use(express.static('static'));
app.get('/health', (_, res) => {
    res.send('healthy');
});

module.exports = { app };
