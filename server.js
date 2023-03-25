const express = require('express');
const app = express();
const urlRouter = require('./routes/url');
const dbConnection = require('./dbConnection');
const PORT = 5000;

app.use(express.json({extended: false}));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

dbConnection();

app.use('/', urlRouter);

