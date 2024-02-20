import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";

const UpdateForm = ({ handleSelectChange, updateCurrency, currencyData, getCurrencyCode, syncCurrencyCodes, resetAllStates }) => {

  // Event handler for update currency button
  const handleUpdateCurrencyCodeClick = async (e) => {
    e.preventDefault();

    // Get new conversion rate
    const newRate = e.target.conversionRate.value;

    // Find currency ID in currencyData to update which matches the currencyCode
    const currencyFound = currencyData.find(
      (currencyFound) => currencyFound.currencyCode === updateCurrency
    );

    // Call API to update conversion rate of the currency id
    await currencyServices.updateCurrencyAPI(currencyFound.id, newRate);

    // Refresh currency data
    await syncCurrencyCodes();
    e.target.conversionRate.value = "";
    resetAllStates();
  };

  return (
    <div>
      <form onSubmit={handleUpdateCurrencyCodeClick}>
        <select
          value={updateCurrency}
          id="updateCC"
          required
          onChange={handleSelectChange}
        >
          <option value="">Select CurrencyCode</option>
          {getCurrencyCode().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="conversionRate">Conversion Rate:</label>
        <input
          id="conversionRate"
          name="conversionRate"
          type="number"
          min="0"
          step="0.01"
          required
          pattern="[0-9]+"
          placeholder="Conversion Rate"
        />
        <br></br>
        <br></br>
        <button type="update">Update</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default UpdateForm;
