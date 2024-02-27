import axios from 'axios';
// import config from "./config.json"



const baseUrl = `/api/currencies`
// Gets all currencies from the API
const getCurrenciesAPI = () => {
    const request = axios.get(`${baseUrl}`);   
    console.log("Retrieve All Currencies", request)
    return request.then(response => {
        console.log("Retrieve All Currencies", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error retrieving currencies:", error);
        throw error;
    });
}



// Gets a currency with id from the API
const getACurrencyAPI = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);   
    console.log("Retrieve A Currency", request)
    return request.then(response => {
        console.log("Retrieve A Currency", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error retrieving a currency:", error);
        throw error;
    });
}

// Deletes a currency from the API based on id passed
const deleteCurrencyAPI = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => {
        console.log("Deleted Currency", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error deleting currency:", error);
        throw error;
    });
}


const addCurrencyAPI = (currencyData) => {
    const request = axios.post(`${baseUrl}`, currencyData);
    return request.then(response => {
        console.log("AddCurrencyCode", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error posting currency data:", error);
        throw error;
    });
};


const updateCurrencyAPI = (id,newRate) => {
    const request = axios.put(`${baseUrl}/${id}/${newRate}`);
    return request.then(response => {
        console.log("UpdateCurrencyCode", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error posting currency data:", error);
        throw error;
    });
};
    



export default { getCurrenciesAPI, deleteCurrencyAPI, addCurrencyAPI, getACurrencyAPI, updateCurrencyAPI };