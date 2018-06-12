import axios from 'axios';


var server ="http://localhost:8080";
//var server = 'https://flipfinder.fr';

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

function desactivateFlipper(id) {
    return axios.delete(server+'/api/flip/'+id);
}

const FlipperWs = {
  getFlippers, add, getFlipModels, desactivateFlipper
} 
export default FlipperWs;