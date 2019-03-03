import React from 'react';
import { Collapse, Button} from 'reactstrap';

export default class SideBar extends React.Component{
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
      <div class = "sideBar">
      <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Categories</Button>
       <Collapse isOpen={this.state.collapse}>
         <ul>
           <li>Fuck</li>
           <li>Fucker</li>
           <li>Fuckest</li>
         </ul>
       </Collapse>
      </div>
    );
  }
}
