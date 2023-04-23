import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import { Login, Logout, Signup } from './pages/Account';
import { CommercialBuy, CommercialRent } from './pages/Commercial';
import Contact from './pages/Contact';
import Header from './pages/Header';
import Home from './pages/Home';
import News from './pages/News';
import { ResidentialBuy, ResidentialRent } from './pages/Residential';

function App() {
  return (
    <>
    <Header  />
    <div className="container-custom">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/residential-buy" element={<ResidentialBuy />} />
        <Route path="/residential-rent" element={<ResidentialRent />} />
        <Route path="/commercial-buy" element={<CommercialBuy />} />
        <Route path="/commercial-rent" element={<CommercialRent />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
