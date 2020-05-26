"use strict";

var calculatorView = new CalculatorView();
var calculatorModel = new CalculatorModel();
var calculatorController = null;
var timeoutClearAll;

function CalculatorController () {

    this.toggleSettingsMenu = function () {
        calculatorView.toggleSettingsMenu();
    };

    this.toggleHomeCurrencyDropdownMenu = function () {
        calculatorView.toggleHomeCurrencyDropdownMenu();
    };

    this.toggleVisitingCurrencyDropdownMenu = function () {
        calculatorView.toggleVisitingCurrencyDropdownMenu();
    };

    this.toggleBankFeeDropdownMenu = function () {
        calculatorView.toggleBankFeeDropdownMenu();
    };

    this.addCurrenciesToDropdowns = function () {
        var currencies = calculatorModel.getCurrencies();
        var htmlDropdownHomeCurrency;
        var htmlDropdownVisitingCurrency;

        for (var currency in currencies)
        {
            if (currencies.hasOwnProperty(currency)) {
                htmlDropdownHomeCurrency = '<button id="' + currencies[currency].id + '" class="currency-button" onclick="setHomeCurrency(this.value);" value="' + currencies[currency].id + '">\n' +
        '                            <img class="currency-button-img" src="images/flags/' + currencies[currency].id + '.png" alt="' + currencies[currency].id + ' flag" />\n' +
        '                            <span class="currency-button-span">' + currencies[currency].name + ' (' + currencies[currency].id + ')</span>\n' +
        '                        </button>';
                htmlDropdownVisitingCurrency = '<button id="' + currencies[currency].id + '" class="currency-button" onclick="setVisitingCurrency(this.value);" value="' + currencies[currency].id + '">\n' +
                    '                            <img class="currency-button-img" src="images/flags/' + currencies[currency].id + '.png" alt="' + currencies[currency].id + ' flag" />\n' +
                    '                            <span class="currency-button-span">' + currencies[currency].name + ' (' + currencies[currency].id + ')</span>\n' +
                    '                        </button>';
                calculatorView.addCurrencyToDropdowns(htmlDropdownHomeCurrency, htmlDropdownVisitingCurrency);
            }
        }
    };

    this.updateCalculatorDisplay = function () {
        calculatorView.showValue(calculatorModel.getValue(), calculatorModel.calculate());
    };

    this.cancelClear = function () {
        clearTimeout(timeoutClearAll);
    };

    this.init = function() {
        calculatorView.setSettingsMenuClick( function () {
            calculatorController.toggleSettingsMenu();
        });

        calculatorView.setHomeCurrencyDropdownCallback( function() {
            calculatorController.toggleHomeCurrencyDropdownMenu();
        });

        calculatorView.setVisitingCurrencyDropdownCallback( function() {
            calculatorController.toggleVisitingCurrencyDropdownMenu();
        });

        calculatorView.setBankFeeDropdownCallback( function() {
            calculatorController.toggleBankFeeDropdownMenu();
        });

        calculatorView.setNumpadClickCallback( function (number) {
            calculatorModel.add(number);
            calculatorController.updateCalculatorDisplay();
        });

        calculatorView.setClearClickCallback( function() {
            calculatorModel.clear();
            calculatorController.updateCalculatorDisplay();

            timeoutClearAll = setTimeout(function(){ calculatorModel.clearAll(); calculatorController.updateCalculatorDisplay(); }, 1000);
        });

        calculatorView.setClearReleaseCallback( function() {
            calculatorController.cancelClear();
            calculatorController.updateCalculatorDisplay();
        });

        calculatorView.setDotClickCallback( function() {
            calculatorModel.addDot();
            calculatorController.updateCalculatorDisplay();
        });

        calculatorModel.createCurrencies();
        calculatorController.addCurrenciesToDropdowns();
        calculatorModel.loadLocally();
        calculatorController.updateCalculatorDisplay();
        setTimeout(function() {calculatorModel.updateExchangeRates();}, 1000);
        setTimeout(function() {calculatorModel.saveLocally();}, 2000);
    };
}

calculatorController = new CalculatorController();
window.addEventListener("load", calculatorController.init);

function setHomeCurrency(currency) {
    var button = document.getElementById(currency);

    if (button.value === calculatorModel.getVisitingCurrency()) {
        showSnackbar("Cannot select same currency!");
    }
    else {
        calculatorModel.setHomeCurrencyExchangeRate(button.value);
        calculatorView.changeHomeCurrencyButton(button.innerHTML);
        calculatorController.updateCalculatorDisplay();
    }
}

function setVisitingCurrency(currency) {
    var button = document.getElementById(currency);

    if (button.value === calculatorModel.getHomeCurrency()) {
        showSnackbar("Cannot select same currency!");
    }
    else {
        calculatorModel.setVisitingCurrencyExchangeRate(button.value);
        calculatorView.changeVisitingCurrencyButton(button.innerHTML);
        calculatorController.updateCalculatorDisplay();
    }
}

function setBankFee(percent) {
    var button = document.getElementById("bank_fee_" + percent + "p");

    calculatorModel.setBankFee(button.value);
    calculatorView.changeBankFeeButton(button.innerHTML);
    calculatorController.updateCalculatorDisplay();
}

function showSnackbar(message) {
    calculatorView.showSnackbar(message);
}