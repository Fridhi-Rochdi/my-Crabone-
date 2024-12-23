const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig');

// Ajouter un utilisateur
exports.addUser = async (req, res) => {
  const { name, password, email, role } = req.body;
  const query = `INSERT INTO Utilisateurs (name, password, email, role) VALUES (:name, :password, :email, :role)`;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(query, { name, password, email, role }, { autoCommit: true });
    res.status(201).send({ message: 'Utilisateur ajouté' });
    await connection.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const { name } = req.params;
  const { password, email, role } = req.body;

  const query = `UPDATE Utilisateurs SET password = :password, email = :email, role = :role WHERE name = :name`;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, { name, password, email, role }, { autoCommit: true });

    if (result.rowsAffected === 0) {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    } else {
      res.send({ message: 'Utilisateur mis à jour' });
    }
    await connection.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { name } = req.params;

  const query = `DELETE FROM Utilisateurs WHERE name = :name`;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, { name }, { autoCommit: true });

    if (result.rowsAffected === 0) {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    } else {
      res.send({ message: 'Utilisateur supprimé' });
    }
    await connection.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Récupérer un utilisateur
exports.getUser = async (req, res) => {
  const { name } = req.params;

  const query = `SELECT * FROM Utilisateurs WHERE name = :name`;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, { name });

    if (result.rows.length === 0) {
      res.status(404).send({ message: 'Utilisateur non trouvé' });
    } else {
      res.send(result.rows[0]);
    }
    await connection.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  const query = `SELECT * FROM Utilisateurs`;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query);
    res.send(result.rows);
    await connection.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
};
