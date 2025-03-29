// Simulação de um banco de dados em memória
const tasks = [];

// Listar todas as tarefas
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// Criar uma nova tarefa
const createTask = (req, res) => {
  const task = { id: tasks.length + 1, ...req.body };
  tasks.push(task);
  res.status(201).json(task);
};

// Atualizar uma tarefa
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
};

// Excluir uma tarefa
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
