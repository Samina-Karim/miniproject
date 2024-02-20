import React, { useState } from "react";
import "../index.css";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";

const AddForm = ({ handleSelectChange,countryId,getCountryIds,resetAllStates,syncCurrencyCodes}) => {
  // Define state variables
//   const [countryId, setCountryId] = useState("");

  // Event handler for add currency button
  const handleAddCurrencyClick = async (e) => {
    e.preventDefault();

    // Get values from form input
    const addCurrency = e.target.currencyCode.value;
    const countryID = e.target.countryId.value;
    const conversion = e.target.conversionRate.value;

    // Create data object
    const currencyDataValue = {
      currencyCode: addCurrency,
      countryId: countryID,
      conversionRate: conversion,
    };

    // Call API to add currency
    await currencyServices.addCurrencyAPI(currencyDataValue);

    // Reset form inputs
    e.target.currencyCode.value = '';
    e.target.countryId.value = '';
    e.target.conversionRate.value = '';

    // Refresh currency and country data
    await syncCurrencyCodes();
    resetAllStates();
  };

  return (
    <div>
      <form onSubmit={handleAddCurrencyClick}>
        <input
          id="currencyCode"
          name="currencyCode"
          type="text"
          required
          pattern="[A-Za-z]+"
          placeholder="Currency Code"
        />

        <select
          value={countryId}
          id="countryId"
        //   onChange={(e) => setAddCurrency(e.target.value)}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select Country ID</option>
          {getCountryIds().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

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
        <button type="add">Add</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default AddForm;
