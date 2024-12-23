const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ajouter un utilisateur
router.post('/', userController.addUser);

// Mettre à jour un utilisateur
router.put('/:name', userController.updateUser);

// Supprimer un utilisateur
router.delete('/:name', userController.deleteUser);

// Récupérer un utilisateur
router.get('/:name', userController.getUser);

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;
