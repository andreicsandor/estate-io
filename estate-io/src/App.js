import { Route, Routes } from "react-router-dom";
import { StickyContainer, Sticky } from 'react-sticky';
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import CommercialBuy from './pages/CommercialBuy';
import CommercialRent from './pages/CommercialRent';
import Contact from './pages/Contact';
import Header from './Header';
import Home from './pages/Home';
import News from './pages/News';
import ResidentialBuy from './pages/ResidentialBuy';
import ResidentialRent from './pages/ResidentialRent';

function App() {
  return (
    <>
    <Header  />
    <div className="container-custom">
      <Routes>
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
