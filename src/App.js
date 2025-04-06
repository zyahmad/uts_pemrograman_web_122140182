import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/Header';
import AboutKopireem from './components/AboutKopireem';
import Footer from './components/Footer';
import { ShopProvider } from './context/ShopContext';
import './App.css';

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;