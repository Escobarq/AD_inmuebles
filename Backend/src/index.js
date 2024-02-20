// src/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3006; // Puedes elegir cualquier puerto que no esté en uso

app.use(cors());
app.use(express.json());

const connection = require('./db');

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
