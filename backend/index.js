const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(1234);

console.log("serviço rodando na porta (1234)");