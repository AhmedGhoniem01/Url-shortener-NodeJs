const express = require('express');
const app = express();
const urlRouter = require('./routes/url');
const PORT = 5000;

const dbConnection = require('./dbConnection');

app.use(express.json({extended: false}));

app.use('/api/url/', urlRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

dbConnection();
