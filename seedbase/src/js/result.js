import React from 'react';

function MakeSeed(props) {
	return (
		<div class = "resultListView">
      <div class = "img-wrapper">
        <img src = {props.seedImg}></img>
      </div>
      <div class = "result-info">
			   <h3> {props.seedName}</h3>
         <p>Manufacturer: {props.seedManufacturer}</p>
         <p>Germination Rate: {props.seedGerm}</p>
         <p>Cold Hardiness: {props.seedCold}</p>
      </div>
      <div class = "price-info">
        <p>${props.seedPrice}/lb</p>
      </div>
		</div>
	);
}

class Rows extends React.Component{
  constructor(props){
    super(props);
  }

  renderSeed(img, name, man, germ, cold, price){
    return(
        <MakeSeed
          seedImg = {img}
          seedName = {name}
          seedManufacturer = {man}
          seedGerm = {germ}
          seedCold = {cold}
          seedPrice = {price}
        />
    )
  }

  render(){
    return(
      <div>
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
        {this.renderSeed("https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg", "Seed", "Johnny's", "100%", "Yes", "0.99")}
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
