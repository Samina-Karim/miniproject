import React from "react";
import { useState, useEffect } from "react";
// import "../index.css";
import convertCurrency from "../utils/currency_utils";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";


const ConvertForm = ({
  handleSelectChange,
  getCurrencyCode,
//   convertedAmount,
//   setConvertedAmount,
  fromCurrency,
  toCurrency,
  resetAllStates,
  syncCurrencyCodes,
  currencyData
}) => {

  const [convertedAmount, setConvertedAmount] = useState(0);
  // Event handler for convert button
  const handleConvertClick = async (e) => {
    e.preventDefault();
    
    console.log("E",e.target);
    
    const Amount = e.target.amount.value;

    // Find conversion rates for fromCurrency and toCurrency
    const currencyTo = currencyData.find(
      (currencyTo) => currencyTo.currencyCode === toCurrency
    );
    const toConversionRate = currencyTo.conversionRate;

    const currencyFrom = currencyData.find(
      (currencyFrom) => currencyFrom.currencyCode === fromCurrency
    );
    // const fromConversionRate = currencyFrom.conversionRate;

    // Calculate converted amount
    const result = convertCurrency(currencyFrom,currencyTo, Amount);
        
        
    
    setConvertedAmount(result);

    // Reset form input
    e.target.amount.value = "";

    // Refresh currency and country data
    await syncCurrencyCodes();
    resetAllStates();
  };

  return (
    <div>
      <form onSubmit={handleConvertClick}>
        <select
          value={fromCurrency}
          data-testid="testFromCC"
          id="fromCC"
          onChange={handleSelectChange}
          required
        >
          <option value="">From Currency Code</option>
          {getCurrencyCode().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={toCurrency}
          data-testid="testToCC"
          id="toCC"
          onChange={handleSelectChange}
          required
        >
          <option value="">To Currency Code</option>
          {getCurrencyCode().map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          id="amount"
          data-testid="testAmount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          required
          pattern="[[0-9]+"
          placeholder="Amount"
        />
        <br></br>
        <br></br>
        <label htmlFor="convertedAmount"> Converted Amount </label>
        <div>
          <h1 data-testid="conv" >{Math.round(convertedAmount)}</h1>
        </div>

        <br></br>
        <br></br>
        <button type="convert">Convert</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default ConvertForm;

