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
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css'; 
import { ContextoProvider } from './context/Context';
import AccountSettingsPage from './pages/AccountSettingsPage';
import LoginPage from './components/LoginForm';

function App() {
  return (
    <div className='App'>
      <ContextoProvider>
        <main>
          <BrowserRouter>
            <Header />
            <Navbar />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/profile/:id' element={<UserProfilePage />} />
              <Route path='/product/:id' element={<ProductDetailPage />} />
              <Route path='/new-product' element={<ProductFormPage />} />
              <Route path='/quienes-somos' element={<AboutUs />} />
              <Route path='/como-funciona' element={<HowItWorks />} />
              <Route path='/account-settings/' element={<AccountSettingsPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/faq' element={<FAQ />} />
              <Route path='/contacto' element={<Contact />} />
              <Route path='/terminos' element={<TermsAndConditions />} />
              <Route path='/privacidad' element={<PrivacyPolicy />} />
              <Route path='/*' element={<ErrorMessage />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </main>
      </ContextoProvider>
    </div>
  );
}

export default App;

