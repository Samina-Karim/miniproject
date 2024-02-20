import axios from 'axios';

const baseUrl = `http://localhost:3007/api/countries`

const getCountriesAPI = () => {
    const request = axios.get(`${baseUrl}`);   
    console.log("Retrieve All Countries", request)
    return request.then(response => {
        console.log("Retrieve All Countries", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error retrieving countries:", error);
        throw error;
    });
}

export default {getCountriesAPI};