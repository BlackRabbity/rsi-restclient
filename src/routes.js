import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Repertoire from './components/Repertoire';
import MyReservation from './components/MyReservation';
import ShowingSeats from './components/ShowingSeats';
import Login from './components/Login';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Repertoire />} />
    <Route path="/repertoire" element={<Repertoire />} />
    <Route path="/myReservation" element={<MyReservation />} />
    <Route path="/showingSeats/:id" element={<ShowingSeats />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;