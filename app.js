const express = require('express');
require('dotenv').config();
const routes = require('./routes/shorturl.routes');

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
