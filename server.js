const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuration Oracle
oracledb.initOracleClient({ libDir: '/instantclient_path' });
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Permet les requêtes du frontend

// Routes utilisateur
app.use('/users', userRoutes);

// Démarrage du serveur
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
