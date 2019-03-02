import React from 'react';

export default class Result extends React.Component{
  render (){
    return(
      <div class = "resultListView">
        <div class = "img-wrapper">
          <img src = "https://nuts.com/images/auto/510x340/assets/acad1980deaad3bd.jpg"></img>
        </div>
        <div class = "result-info">
          <h3>Seed</h3>
          <p>Manufacturer</p>
          <p>Germination Rate</p>
          <p>Cold Hardness</p>
        </div>
        <div class = "price-info">
          <p>$.99/lb</p>
        </div>
      </div>
    );
  }
}
