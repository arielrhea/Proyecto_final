import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (
    <div className='App'>
      <main>
        <BrowserRouter>
          <Header />
          <Navbar />

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile/:id' element={<UserProfilePage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/new-product' element={<ProductFormPage />} />
            <Route path='/*' element={<ErrorMessage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
