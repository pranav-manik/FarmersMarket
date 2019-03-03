import React from 'react';
import { Collapse, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'icheck/skins/all.css'; // or single skin css

import {Checkbox, Radio} from 'react-icheck';

export default class SideBar extends React.Component{

  render() {
    return(
      <div class = "sideBar">

      <Categories />
      <Vendor />

      </div>
    );
  }
}

class Categories extends React.Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return(
      <div>
      <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Categories</Button>
       <Collapse isOpen={this.state.collapse}>
         <ul>
           <Checkbox
            checkboxClass="icheckbox_square-blue"
            increaseArea="20%"
            label="Fruits"
            />
            <Checkbox
             checkboxClass="icheckbox_square-blue"
             increaseArea="20%"
             label="Vegetables"
             />
             <Checkbox
              checkboxClass="icheckbox_square-blue"
              increaseArea="60%"
              label="Other"
              />
         </ul>
       </Collapse>
     </div>
   )}}

class Vendor extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Vendor
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Johnny's Seeds</DropdownItem>
          <DropdownItem>FedCo</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
