import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FloatingIcons from './components/FloatingIcons';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dharshan from './pages/Dharshan';
import './App.css';
import Yagnas from "./pages/Yagnas";

function App() {
  return (
    <Router>
      <Header />
      <FloatingIcons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dharshan" element={<Dharshan />} />
      </Routes>
      <Routes>
  {/* <Route path="/" element={<Home />} /> */}
  <Route path="/yagnas" element={<Yagnas />} />
</Routes>
      <Footer />
    </Router>
  );
}

export default App;
