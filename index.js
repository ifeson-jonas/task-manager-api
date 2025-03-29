# Arquivo de entrada principal
echo "require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(\`Servidor rodando em http://localhost:\${port}\`);
});" > server.js

# Arquivo de configuração do app
echo "const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/tasks');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;" > src/app.js
