import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CartScreens from './screens/CartScreens';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/cart/:id?" element={<CartScreens />} />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

// Sample NotFoundComponent for 404 route
function NotFoundComponent() {
  return <div>404: Page Not Found</div>;
}

export default App;


