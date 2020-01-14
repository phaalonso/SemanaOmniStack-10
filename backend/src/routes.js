const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Métodos HTTP
// Get -> buscando informação
// Post -> enviando informação
// Put -> editar informação
// Delete -> deletar informação

// Tipos de parâmetros
// Query Params: req.query (Filtros, ordenação, paginação, ...) 
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;