import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // or single skin css
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBar from './searchBar.js';
import firebase from 'firebase';
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

  sortData = (x = 0) => {
    if (x==0){
      return 1;
    }
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
            <DropdownItem >Low to High</DropdownItem>
            <DropdownItem >High to Low</DropdownItem>
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
    this.retrieveData(this.props.query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('new props');
    this.retrieveData(nextProps.query);
  }

  retrieveData = (query) => {
    var parent = this;
    let d = [];
    query = query.toLowerCase();
    database.ref().once("value")
    .then(function(snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    })
    .then(function(data) {
      d = data;
      if (query != "") {
        d = d.filter(datum => {
          var curVariety = datum.variety.toLowerCase();
          var curName = datum.name.toLowerCase();
          var curCategory = datum.variety.toLowerCase();
          return curVariety.includes(query) || datum.name.includes(query) || curCategory.includes(query)
        });
      }
      d = d.sort((a, b) => {
        if (a.variety.toLowerCase() < b.variety.toLowerCase()) {
          return -1;
        }
        else if (a.variety.toLowerCase() > b.variety.toLowerCase()) {
          return 1;
        }
        else return 0;
      });
      parent.setState({data: d});
    });
  }

renderSeed(img='/img/logo.png', variety='n/a', name='n/a', manufacturer='n/a', mature='n/a', life_cycle='n/a', organic=false, price=0, price_per_unit, url='n/a'){

    return(
        <MakeSeed
          seedImg = {img}
          seedVariety = {variety}
          seedName = {name}
          seedManufacturer = {manufacturer}
          seedMaturity = {mature || 'n/a'}
          seedLifeCycle = {life_cycle || 'n/a'}
          seedOrganic = {organic}
          seedPrice = {price}
          seedURL = {url}
        />
    )
  }

  titleCase(str) {
     var splitStr = str.toLowerCase().split(' ');
     for (var i = 0; i < splitStr.length; i++) {
         // You do not need to check if i is larger than splitStr length, as your for does that for you
         // Assign it back to the array
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
     }
     // Directly return the joined string
     return splitStr.join(' '); 
  }
  getMaturity(n) {
    var lastChar = n.slice(-1);
    if (lastChar >= '0' && lastChar <= '9') {
      return (n + " days");
    } else {
      return n;
    }
  }

  render(){
    let { data } = this.state;
    if (data.length > 0) {
      var rows = [];
      for (var i=0; i < data.length; i++) {

        let myVariety = data[i].variety;
        let myName = data[i].name;
        myName = this.titleCase(myName);
        let myMaturity = this.getMaturity(data[i].maturity);
        let isOrganic = data[i].organic ? 'Yes': 'No';
        let displayPrice = '$' + data[i].price;
        let myLifeCycle = data[i].life_cycle;
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

        rows.push(this.renderSeed(logo, myVariety, myName, data[i].manufacturer, myMaturity, myLifeCycle, isOrganic, displayPrice, data[i].price_per_unit, data[i].url));
      }
    }
    return(
      <div>
          {rows}
      </div>
    );
  }

}

export default class Result extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Sort />
        <Rows query={this.props.query}/>
      </div>
    );
  }
}
