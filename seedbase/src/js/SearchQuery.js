import SearchBar from './searchBar.js';
import SideBar from './sideBar.js';
import Result from './result.js';
import React from 'react';

export default class SearchQuery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		}	
	}

	updateQuery = (query) => {
		this.setState({query})
	}

	render() {
		return (
			<div>
				<div id= "searchBar"><SearchBar updateQuery={this.updateQuery}/></div>
			    <div class = "wrapper">
			      <div id="sideBar"><SideBar /></div>
			      <div id = "results"><Result query={this.state.query}/></div>
			    </div>
			</div>
		)
	}
}