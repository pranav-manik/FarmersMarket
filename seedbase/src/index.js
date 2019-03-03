import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

//
import SearchBar from './js/searchBar.js';
import SideBar from './js/sideBar.js';
import Result from './js/result.js';
import SearchQuery from './js/SearchQuery.js';

//ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<SearchBar />, document.getElementById('searchBar'));
// ReactDOM.render(<SideBar />, document.getElementById('sideBar'));
// ReactDOM.render(<Result />, document.getElementById('results'));

ReactDOM.render(<SearchQuery />, document.getElementById('myPage'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note '')this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
