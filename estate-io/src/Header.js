import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Navbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
   } from 'reactstrap';

import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const navbar = document.querySelector('.nav');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scroll');
      } else {
        navbar.classList.remove('navbar-scroll');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar className="nav py-3 mb-3" style={{position: 'fixed', width: '100%', zIndex: 3}}>
      <div className="d-flex justify-content-center w-100">
        <ul>
          <Link to="/" className="link-item">estate.io</Link>
          <Link to="/news" className="link-item">News</Link>
          <Link to="/about" className="link-item">About</Link>
          <UncontrolledDropdown>
            <DropdownToggle nav className="link-item">Residential</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><Link to="/residential-buy">Buy</Link></DropdownItem>
              <DropdownItem><Link to="/residential-rent">Rental</Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle nav className="link-item">Commercial</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><Link to="/commercial-buy">Buy</Link></DropdownItem>
              <DropdownItem><Link to="/commercial-rent">Rental</Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Link to="/contact" className="link-item">Contact</Link>
        </ul> 
      </div>
    </Navbar>
  );
};

export default Header;