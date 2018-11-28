import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import { locationList } from './locations';
import { mapStyles } from './mapStyles';
import './App.css';

class App extends Component {
	state = {
		map: {},
		locations: locationList,
		markerList: [],
		filtered: [],
		openMarker: {
			last: {},
			closed: true
		},
		query: ''
	}
	
	componentWillReceiveProps() {
		const self = this;
		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.615019, lng: -77.702539},
			zoom: 14,
			mapTypeControl: false,
			styles: mapStyles
		});
		for (let item of locationList) {
			const position = {
				lat: item.location.lat,
				lng: item.location.lng
			}
			const marker = new window.google.maps.Marker({
				position,
				map,
				title: item.title,
				infoWindow: new window.google.maps.InfoWindow({
					content: item.title
				})
			});
			marker.addListener('click', function() {
				if (self.state.openMarker.closed) {
					marker.infoWindow.open(map, marker);
					self.setState({ openMarker: { last: marker, closed: false} });
				} else {
					self.state.openMarker.last.infoWindow.close(map, marker);
					self.setState({ openMarker: {closed: true} });
				}
			});
			this.state.markerList.push(marker);
		}
		this.setState({map:map});
		let { markerList } = this.state;
		this.setState({filtered: markerList })
	}

	inputHandler = event => {
		const { markerList } = this.state;
		const query = event.target.value;
		this.setState({ query });

		const filterList = markerList.filter( item => {
			return item.title.toLowerCase().indexOf(query) > -1;
		});
		this.setState({ filtered: filterList });
	}

	render() {
		let { query, filtered } = this.state;

		return (
			<div className="App">
				<section id="list">
					<h1>Hagerstown, MD</h1>
					<input
						type="text"
						placeholder="Filter locations"
						value={query}
						onChange={this.inputHandler}
						className="filter"
        			/>
					<ul>
						{ filtered.map( (item) => (
							<li key={item.title} className='location'>{item.title}</li>
						))}
					</ul>
				</section>
				<div id='map'></div>
			</div>
		);
	}
}

// export default App;
export default scriptLoader([
	`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-5Vwx42DwuoHH7CqTVMFtaJYCAqD9J3s`
 ])(App);