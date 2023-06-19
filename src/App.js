import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import JoinPage from './pages/JoinPage';
import CashOut from './pages/CashOut';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/JoinPage" element={<JoinPage />} />
          <Route path="/CashOut" element={<CashOut />} />
        </Routes>

        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
