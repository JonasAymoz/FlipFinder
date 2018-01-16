import axios from 'axios';


var server ="http://localhost:8080"

function getFlippers() {
	return axios.get(server+'/api/flip/all');
}

function add(flip) {
	return axios.post(server+'/api/flip', flip
		);
	}
	
const FlipperWs = {
  getFlippers, add  
} 
export default FlipperWs;