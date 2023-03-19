import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import  Readings  from "../Readings/Readings";

function Navigation() {
  return (
    <Navbar bg="dark" expands="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavLink
            className="d-inline p-2 bg-dark text-white"
            to="../Readings/Readings"
          >
            Readings
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;