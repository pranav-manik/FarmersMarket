import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

// <RefinementList attribute="brand" />

//Credentials for Algolia
// const App = () => (
//   <InstantSearch
//     appId="GWE4KYT7AX"
//     apiKey="4c2973201566ae387781471ea8dd33c9"
//     indexName="seedbase"
//   >
//     {/* Search widgets will go there */}
//   </InstantSearch>
// );

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange = (e) => {
    // setTimeout(this.props.updateQuery(e.target.value), 10000);
    this.props.updateQuery(e.target.value);
    this.setState({
      search: e.target.value
    });
  }

  render() {
    return (
      <nav>
        <Navbar id = "searchbar" light expand="md">
          <NavbarBrand href="/"><img class = "logo" src = "/img/logo.png"></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <input type="text" class = "search" placeholder="Search Seeds" onChange={this.handleChange} value={this.state.search}></input>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </nav>
    );
  }
}
