require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const tasksRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do rate limiting (segurança contra ataques DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Configuração segura de CORS
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(limiter);

// Rotas de status
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'up',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'API de Gerenciamento de Tarefas',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      tasks: '/api/tasks',
      docs: process.env.API_DOCS_URL || '/api-docs'
    }
  });
});

// Rotas da aplicação
app.use('/api/tasks', tasksRoutes);

// Middleware de erro (deve ser o último)
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
  logger.info(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; // Export para testes
