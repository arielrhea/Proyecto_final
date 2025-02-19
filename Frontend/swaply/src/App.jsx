import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import MtoProductsPage from './pages/MtoProductsPage';
import ChatPage from './pages/ChatsPage';
import Chat from './components/Chat';
import ScrollToTop from './components/ScrolltoTop';
import Presentacion from './components/Presentacion';

function App() {
  return (
    <div className="App">
      <ContextoProvider>
        <main>
          <BrowserRouter>
            <ScrollToTop /> {/* Añade ScrollToTop aquí */}
            <Header />
            <Navbar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/new-product" element={<PrivateRoute component={ProductFormPage}/>} />
              <Route path="/quienes-somos" element={<AboutUs />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
              <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
              <Route path="/account-settings" element={<PrivateRoute component={AccountSettingsPage} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/mto/:id" element={<PrivateRoute component={MtoProductsPage} />} />
              <Route path="/chats" element={<PrivateRoute component={ChatPage}/>} />
              <Route path="/presentacion" element={<Presentacion/>} />
              <Route path="*" element={<ErrorMessage message="404: Página no encontrada" />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </main>
      </ContextoProvider>
    </div>
  );
}

export default App;
