import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import './Kilani.css';

export const Kilani = () => {
  const navigate = useNavigate(); // Initialisation de useNavigate pour gérer la navigation

  return (
    <section className='Kilani-page flex'>
      <div className='contenu'>
        <h1>Bienvenue sur la page de l'Entreprise Kilani</h1>
        {/* Redirige vers le tableau des informations pour TERIAK 1 */}
        <button
          className='terriak-button'
          onClick={() => navigate('/Dashboard')}
        >
          Entreprise TERIAK 1
        </button>

        {/* Redirige vers le tableau des informations pour TERIAK 2 */}
        <button
          className='terriak-button'
          onClick={() => navigate('/dashboard-teriak2')}
        >
          Entreprise TERIAK 2
        </button>
      </div>
    </section>
  );
};

export default Kilani;
