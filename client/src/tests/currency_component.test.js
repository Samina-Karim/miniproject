/**
 * Before we begin, we need to setup the environment to run React tests:
 * 1- run the following command: npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react
 * 2- In the root directory of the client folder, create a new file and name it ".babelrc"
 * 3- Add the following content to the file: 
 *      {
            "presets": [
                "@babel/preset-env",
                ["@babel/preset-react", { "runtime": "automatic" }]
            ]
        }
 * 4- In package.json, add the following at the end of the file (before the last } bracket):
        ,"jest": {
            "testEnvironment": "jsdom"
        }
 *******       
 * Necessary import:
 */
// import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
/**
 * Import all the related component(s) here:
 * 
 * 
 */
import ConvertForm from "../components/ConvertForm";



/**
 * we will test the conversion section that contains: currency code & amount input fields, 
 *   Convert button and converted amount text. 
 * You need to do write one unit test that ensure the functionality of the section is working as intended.
 * We need to test that the user will be able to type into the input fields then click the Convert button.
 * Once the button is clicked, the conversion amount should be displayed on the screen.
 */


test('Testing conversion section', async() => {
    // convertCurrency is a mock function now

    // const mockConvertCurrency = jest.fn();

    
    const mockResetAllStates = jest.fn();
    const mockSyncCurrencyCodes = jest.fn();
    const mockSetConvertedAmount = jest.fn();
    let convertedAmount =0;
    let fromCurrency='';
    let toCurrency='';
    const currencyData =[{
        currencyCode:'CAD',
        conversionRate:1},
        {
            currencyCode:'USD',
            conversionRate:0.75},
        {
            currencyCode:'GBP',
            conversionRate:0.58}];
        
       

    const getCurrencyCode = () => {
        return currencyData.map((currencyCodes) => currencyCodes.currencyCode);
      };
    
    const handleSelectChange = (event) => {
        event.preventDefault();
        console.log("EVENT",event.target.value);
    
        switch (event.target.id) {
          case "fromCC":
            fromCurrency=event.target.value;
            break;
          case "toCC":
            toCurrency=event.target.value;
            break;
         
        }
      };



    const user = userEvent.setup();
   
            render(
                <ConvertForm
                handleSelectChange={handleSelectChange}
                getCurrencyCode={getCurrencyCode}
                convertedAmount={convertedAmount}
                setConvertedAmount={mockSetConvertedAmount}
                fromCurrency={fromCurrency}
                toCurrency={toCurrency}
                resetAllStates={mockResetAllStates}
                syncCurrencyCodes={mockSyncCurrencyCodes}
                currencyData={currencyData}
              />
            )

            const inputFrom = screen.getByTestId('testFromCC');
            const inputTo = screen.getByTestId('testToCC');
            const inputAmount = screen.getByTestId('testAmount');

            // console.log("InputFrom", inputFrom);
            // console.log("InputTo", inputTo);
            // console.log("Amount", inputAmount);

            await user.selectOptions(inputFrom, 'CAD');
            await user.selectOptions(inputTo, 'USD');
            await user.type(inputAmount,'100');

            // await user.select(inputFrom,'CAD');
            // await user.select(inputTo,'CAD');
           
            const convertButtonClick = screen.queryByText("Convert");
            // const output = screen.getByTestId('conv');
            //assert
           

            user.click(convertButtonClick).then (() =>{
            const output = screen.getByTestId('conv');
                console.log("output", output.textContent);
                // const result = convertCurrency(cdnCurrency, cdnCurrency, 100)
                // expect(output.textContent).toMatch(/75/i);
                console.log("output", output.textContent);
                expect(output.textContent).toBe('75');
               

            })
            
           


        }
        
        // )})}
);


