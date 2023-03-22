import { Link } from "react-router-dom"

import {
    Navbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
   } from 'reactstrap';

export default function Header() {
  return (
    <div>

      <Navbar className="nav py-3 mb-3">
          <Link to="/">estate.io</Link>
          <ul>
            <Link to="/news">News</Link>
            <Link to="/about">About Us</Link>
            <UncontrolledDropdown>
              <DropdownToggle nav>
                Residential
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/residential-buy">Buy</Link>
                </DropdownItem>
                <DropdownItem>
                <Link to="/residential-rent">Rental</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown>
              <DropdownToggle nav>
                Commercial
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/commercial-buy">Buy</Link>
                </DropdownItem>
                <DropdownItem>
                <Link to="/commercial-rent">Rental</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Link to="/contact">Contact</Link>
          </ul> 
      </Navbar>

    </div>
  )
}

{/* <Row className="">


    
</Row> */}