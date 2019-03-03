import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // or single skin css
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InstantSearch } from 'react-instantsearch-dom';
import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBk2mYeH-3ETNzwk2vXbgP8coLuQD6CW74",
    authDomain: "seedbase-e7ee6.firebaseapp.com",
    databaseURL: "https://seedbase-e7ee6.firebaseio.com",
    projectId: "seedbase-e7ee6",
    storageBucket: "seedbase-e7ee6.appspot.com",
    messagingSenderId: "721731422552"
  };
  firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

// database.ref().once("value")
// .then(function(snapshot) {
//   data = snapshot.val();
//   // console.log(data);
// });


//Credentials for Algolia
const App = () => (
  <InstantSearch
    appId="latency"
    apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
    indexName="bestbuy"
  >
    {/* Search widgets will go there */}
  </InstantSearch>
);

function MakeSeed(props) {
	return (
		<div class = "resultListView">
      <div class = "img-wrapper">
        <i class = {props.seedImg}></i>
      </div>
      <div class = "result-info">
			   <h4> {props.seedVariety} {props.seedName} </h4>
         <p>Manufacturer: {props.seedManufacturer} </p>
         <p>Maturity: {props.seedMaturity} | Life Cycle: {props.seedLifeCycle} </p>
         <p>Organic: {props.seedOrganic} </p>
      </div>
      <div class = "price-info">
        <p>{props.seedPrice}</p>
        <a href={props.seedURL} target="_blank"><i class="fas fa-2x fa-shopping-basket"></i></a>
      </div>
		</div>
	);
}

class Sort extends React.Component{
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
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Price</DropdownItem>
            <DropdownItem>Low to High</DropdownItem>
            <DropdownItem>High to Low</DropdownItem>
            <DropdownItem divider />
            <DropdownItem header>Name</DropdownItem>
            <DropdownItem>Ascending</DropdownItem>
            <DropdownItem>Descending</DropdownItem>
            <DropdownItem divider />
          </DropdownMenu>
        </Dropdown>
    );
  }
}

class Rows extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [

      ]
    }
    this.retrieveData();
  }

  retrieveData = () => {
    var parent = this;

    database.ref().once("value")
    .then(function(snapshot) {
      console.log(snapshot.val());
      parent.setState({data:snapshot.val()});
    });
  }

  renderSeed(img= "fas fa-apple", variety='n/a', name='n/a', manufacturer='n/a', mature='n/a', life_cycle='n/a', organic=false, price=0, url='n/a'){

    return(
        <MakeSeed
          seedImg = {img}
          seedVariety = {variety}
          seedName = {name}
          seedManufacturer = {manufacturer}
          seedMaturity = {mature + " days"|| 'n/a'}
          seedLifeCycle = {life_cycle || 'n/a'}
          seedOrganic = {organic ? 'Yes': 'No'}
          seedPrice = {price}
          seedURL = {url}
        />
    )
  }

  render(){
    let { data } = this.state;
    if (data.length > 0) {
      var rows = [];
      for (var i=0; i < 30; i++) {

        var logo;

        if (data[i].category == "fruits"){
          logo = "fas fa-3x fa-apple-alt padtop red";
        }
        else if (data[i].category == "vegetables"){
          logo = "fas fa-3x fa-carrot padtop orange";
        }
        else {
          logo = "fas fa-3x fa-seedling padtop green"
        }

        rows.push(this.renderSeed(logo, data[i].variety, data[i].name, data[i].manufacturer, data[i].maturity, data[i].life_cycle, data[i].organic, data[i].price, data[i].url));
      }
      console.log("rows " + rows);
    }
    return(
      <div>
          {rows}
      </div>
    );
  }

}

export default class Result extends React.Component{
  render (){
    return(
      <div>
        <Sort />
        <Rows />
      </div>
    );
  }
}
