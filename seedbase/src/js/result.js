import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // or single skin css
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

database.ref().once("value")
.then(function(snapshot) {
  console.log(snapshot.val());
});

function MakeSeed(props) {
	return (
		<div class = "resultListView">
      <div class = "img-wrapper">
        <img src = {props.seedImg}></img>
      </div>
      <div class = "result-info">
			   <h4> {props.seedName}</h4>
         <p>Manufacturer: {props.seedManufacturer}</p>
         <p>Germination Rate: {props.seedGerm}</p>
         <p>Cold Hardiness: {props.seedCold}</p>
      </div>
      <div class = "price-info">
        <p>${props.seedPrice}/lb</p>
        <a href={props.seedURL} target="_blank"><i class="fas fa-2x fa-shopping-basket"></i></a>
      </div>
		</div>
	);
}

class Rows extends React.Component{
  constructor(props){
    super(props);
  }

  renderSeed(img, name, man, germ, cold, price, url){
    return(
        <MakeSeed
          seedImg = {img}
          seedName = {name}
          seedManufacturer = {man}
          seedGerm = {germ}
          seedCold = {cold}
          seedPrice = {price}
          seedURL = {url}
        />
    )
  }

  render(){
    return(
      <div>
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
        {this.renderSeed("./img/logo.png", "Seed", "Johnny's", "100%", "Yes", "0.99", "https://www.johnnyseeds.com/")}
      </div>
    );
  }

}

export default class Result extends React.Component{
  render (){
    return(
      <Rows />
    );
  }
}
