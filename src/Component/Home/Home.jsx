import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  return (
    <section className='Home-page'>
      <div className='contenu'>
        <h1>
          Welcome to the Carbon Footprint Calculator Project!  
          We are a passionate team dedicated to empowering individuals and organizations to better understand their environmental impact. Our mission is to raise awareness and inspire action toward a more sustainable future.
        </h1>
        <button 
          className='kilani-button' 
          onClick={() => navigate('/kilani')}
        >
          Entreprise Kilani
        </button>
      </div>
      <img src='/11.png' alt='Sustainable future illustration'></img>
    </section>
  );
};

export default Home;
