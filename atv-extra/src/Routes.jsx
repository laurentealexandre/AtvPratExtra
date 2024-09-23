
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokedexPage from './components/PokedexPage';
import PokemonDetails from './components/PokemonDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}

export default AppRoutes;




