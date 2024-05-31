const express = require('express');
const routes = express.Router();

const Logar = require('./src/controllers/logar.js');
const Empresas = require('./src/controllers/empresas.js');
const valinhos = require('./src/controllers/valinhos.js');
const Realatorio = require('./src/controllers/relatorios.js');
routes.post('/', Logar.Login);
routes.post('/register', Logar.Register);
routes.post('/empresa', Empresas.ResgiterEmpresa);
routes.get('/empresa', Empresas.SearshEmpresas);
routes.post('/valinhos', valinhos.RegisterValinhos);
routes.post('/relatorio', Realatorio.Create)
routes.delete('/deletar', Empresas.Deletar);

module.exports = routes;