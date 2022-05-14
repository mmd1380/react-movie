import React from 'react';
import Home from '../pages/Home';
import MoviePage from '../pages/movieId/index'
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MoviePage />} />
    </Routes>
  )
}

export default Router;