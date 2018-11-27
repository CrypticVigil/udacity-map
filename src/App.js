import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import './App.css';

class App extends Component {
	state = {
		map: {}
	}
	
	componentWillReceiveProps() {
		const map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.616381, lng: -77.692471},
			zoom: 14,
			mapTypeControl: false
		});
		this.setState({map:map});
	}

	render() {
		return (
			<div className="App">
				<section id="list">
					<h1>Hagerstown, MD</h1>
					<hr />
					<p>Test</p>
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