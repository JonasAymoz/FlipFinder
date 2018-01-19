import axios from 'axios';


var server ="http://localhost:8080"

function getFlippers() {
	return axios.get(server+'/api/flip/all');
}

function add(flip) {
	return axios.post(server+'/api/flip', flip
		);
	}

function getFlipModels() {
    return axios.get(server+'/api/flipModel');
}

const FlipperWs = {
  getFlippers, add, getFlipModels
} 
export default FlipperWs;