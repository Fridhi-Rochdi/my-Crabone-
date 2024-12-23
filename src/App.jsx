import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/navbar/navbar';
import About from './Component/Dashboard/Dashboard';
import Shop from './Component/shop/shop';
import Home from './Component/Home/Home';
import Contact from './Component/Contact-Us/Contact';
import Login from './Component/Login/Login';
import Carte from './Component/carte/carte';
import Kilani from './Component/1-Kilani/Kilani'; // Importation de Kilani
import Dashboard from './Component/Dashboard/Dashboard'; // Importation de Dashboard (assurez-vous que ce chemin est correct)

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AddUserForm" element={<AddUserForm />} />
          <Route path="/kilani" element={<Kilani />} /> {/* Route vers Kilani */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route vers Dashboard */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
