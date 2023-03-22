import { Link } from "react-router-dom"

import {
    Navbar
   } from 'reactstrap';

export default function Header() {
  return (
    <div>

      <Navbar className="nav py-3 mb-3">
          <Link to="/">estate.io</Link>
          <ul>
            <Link to="/news">News</Link>
            <Link to="/about">About Us</Link>
            <Link to="/residential">Residential</Link>
            <Link to="/commercial">Commercial</Link>
            <Link to="/contact">Contact</Link>
          </ul> 
      </Navbar>

    </div>
  )
}

{/* <Row className="">


    
</Row> */}