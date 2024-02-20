import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";

const DeleteForm = ({handleSelectChange,delCurrency,currencyData,getCurrencyCode,syncCurrencyCodes,resetAllStates  }) => {

    /********************************************************/
  // Event handler for delete currency button
  const handleDeleteCurrencyCodeClick = async (e) => {
    e.preventDefault();

    // Find currency ID in currencyData to delete which matches the currencyCode
    const currencyFound = currencyData.find(
      (currencyFound) => currencyFound.currencyCode == delCurrency
    );

    // Call API to delete currency
    await currencyServices.deleteCurrencyAPI(currencyFound.id);

    // Refresh currency data
    await syncCurrencyCodes();
    resetAllStates();
  };

    return(
        <div>
        <form onSubmit={handleDeleteCurrencyCodeClick}>
            <select
              value={delCurrency}
              id="deleteCC"
              onChange={handleSelectChange}
              required
            >
              <option value="">Select CurrencyCode</option>
              {getCurrencyCode().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br></br>
            <br></br>
            <button type="delete">Delete</button>
          </form>
          <br></br>
          <br></br>
         </div>


    )

}

export default DeleteForm;