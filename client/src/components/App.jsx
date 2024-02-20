import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";

import LoginForm from "./LoginForm";
import ConvertForm from "./ConvertForm";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";


/********************************************************* */
// Main component
const App = () => {
  // Effect hook to fetch data when component mounts
  useEffect(() => {
    syncCurrencyCodes();
  }, []); // Run once

  // State variables
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [addCurrency, setAddCurrency] = useState("");
  const [delCurrency, setDelCurrency] = useState("");
  const [updateCurrency, setUpdateCurrency] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const [currencyData, setCurrencyData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Effect hook to synchronize currency and country data
  useEffect(() => {
    syncCurrencyCodes();
  }, []); // Run once

  // Function to get currency codes from currencyData
  const getCurrencyCode = () => {
    return currencyData.map((currencyCodes) => currencyCodes.currencyCode);
  };

  // Function to get country IDs from countryData
  const getCountryIds = () => {
    return countryData.map((countryId) => countryId.id);
  };

  /********************************************************* */
  // Function to fetch currency and country data
  const syncCurrencyCodes = () => {
    console.log("Syncing Data");
    currencyServices.getCurrenciesAPI().then((data) => {
      setCurrencyData(data);
    });

    countryServices.getCountriesAPI().then((data) => {
      setCountryData(data);
    });
    console.log(countryData);
  };

  /********************************************************* */
  // Function to reset all state variables
  const resetAllStates = () => {
    setSelectedCurrency("");
    setFromCurrency("");
    setToCurrency("");
    setAddCurrency("");
    setDelCurrency("");
    setUpdateCurrency("");
    setCountryId("");
  };

  /********************************************************* */
  // Event handler to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();

    switch (event.target.id) {
      case "fromCC":
        setFromCurrency(event.target.value);
        break;
      case "toCC":
        setToCurrency(event.target.value);
        break;
      case "addCC":
        setAddCurrency(event.target.value);
        break;
      case "deleteCC":
        setDelCurrency(event.target.value);
        break;
      case "updateCC":
        setUpdateCurrency(event.target.value);
        break;
      case "countryId":
        setCountryId(event.target.value);
        break;
    }
  };


  /********************************************************* */
  // JSX
  return (
    <div className="PopUpMenu">
      <h1>CURRENCY CONVERTER</h1>
      {/**********************************/}
      {/* Login/Signup form */}
      <LoginForm
      />

      {/**********************************/}
      {/* Convert currency form */}
      <h3>CONVERT CURRENCY</h3>
      <ConvertForm
        handleSelectChange={handleSelectChange}
        getCurrencyCode={getCurrencyCode}
        convertedAmount={convertedAmount}
        setConvertedAmount={setConvertedAmount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        resetAllStates={resetAllStates}
        syncCurrencyCodes={syncCurrencyCodes}
        currencyData={currencyData}
      />

      {/* Add, Delete, Update currency forms */}
      {disableLogin && (
        <div>
        {/**********************************/}
          <h3>ADD CURRENCY</h3>
          <AddForm
             handleSelectChange={handleSelectChange}
             countryId={countryId}
              getCountryIds={getCountryIds}
              resetAllStates={resetAllStates}
              syncCurrencyCodes={syncCurrencyCodes}
          />
  
        {/**********************************/}
          <h3>DELETE CURRENCY</h3>
          <DeleteForm
              handleSelectChange={handleSelectChange}
              delCurrency={delCurrency}
              currencyData={currencyData}
              getCurrencyCode={getCurrencyCode}
              syncCurrencyCodes={syncCurrencyCodes}
              resetAllStates={resetAllStates}
          />
          
          {/**********************************/}
          <h3>UPDATE CURRENCY</h3>
          <UpdateForm
           handleSelectChange={handleSelectChange}
           updateCurrency={updateCurrency}
           currencyData={currencyData}
           getCurrencyCode={getCurrencyCode}
           syncCurrencyCodes={syncCurrencyCodes}
           resetAllStates={resetAllStates}

          /> 
        </div>
      )}
    </div>
  );
};

export default App;
