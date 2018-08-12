import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Container, Nav, Navbar, NavbarToggler, NavItem, } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate } from '@fortawesome/free-solid-svg-icons'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Container>
            <Link className='navbar-brand' to="/">
              <FontAwesomeIcon icon={faCertificate} /> Tableau de bord AEM
            </Link>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link className='nav-link' to="/">Nouveau</Link>
                </NavItem>
                <NavItem>
                  <Link className='nav-link' to="/liste/">Liste</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default Menu