import { 
  Route, 
  Routes 
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About';
import { 
  Login, 
  Logout, 
  Signup, 
  AccountManagement, 
  PasswordManagement 
} from './pages/Account';
import { 
  CommercialBuy, 
  CommercialRent, 
} from './pages/Commercial';
import ResidentialProperty from './pages/ResidentialProperty';
import CommercialProperty from './pages/CommercialProperty';
import Contact from './pages/Contact';
import Header from './pages/Header';
import Home from './pages/Home';
import News from './pages/News';
import { ResidentialBuy, 
  ResidentialRent 
} from './pages/Residential';


function App() {
  return (
    <>
    <Header  />
    <div className="container-custom">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/account-password" element={<PasswordManagement />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/residential-buy" element={<ResidentialBuy />} />
        <Route path="/residential-rent" element={<ResidentialRent />} />
        <Route path="/residential-property/:id" element={<ResidentialProperty />} />
        <Route path="/commercial-buy" element={<CommercialBuy />} />
        <Route path="/commercial-rent" element={<CommercialRent />} />
        <Route path="/commercial-property/:id" element={<CommercialProperty />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
