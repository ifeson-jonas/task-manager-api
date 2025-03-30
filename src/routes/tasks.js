const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Rotas para tarefas
router.get('/', tasksController.getAllTasks);       // Listar todas as tarefas
router.post('/', tasksController.createTask);      // Criar uma nova tarefa
router.put('/:id', tasksController.updateTask);    // Atualizar uma tarefa
router.delete('/:id', tasksController.deleteTask); // Excluir uma tarefa

module.exports = router;
