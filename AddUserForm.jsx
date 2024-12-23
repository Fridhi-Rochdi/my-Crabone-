import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({ name: '', password: '', email: '', role: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users', formData);
      alert('Utilisateur ajouté avec succès!');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'ajout de l\'utilisateur');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nom" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <select name="role" onChange={handleChange} required>
        <option value="">Sélectionnez un rôle</option>
        <option value="AdminSpec">AdminSpec</option>
        <option value="PlanificateurEvt">PlanificateurEvt</option>
        <option value="GestCommandesBillets">GestCommandesBillets</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddUserForm;
