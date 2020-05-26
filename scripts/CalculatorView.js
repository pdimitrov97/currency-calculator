"use strict";

function CalculatorView() {
    var buttonSettingsMenu = document.getElementById("settings_menu_button");
    var settingsMenu = document.getElementById("settings_menu");

    var buttonHomeCurrencyDropdown = document.getElementById("button_home_currency_dropdown");
    var dropdownHomeCurrency = document.getElementById("dropdown_home_currency");
    var buttonVisitingCurrencyDropdown = document.getElementById("button_visiting_currency_dropdown");
    var dropdownVisitingCurrency = document.getElementById("dropdown_visiting_currency");
    var buttonBankFeeDropdown = document.getElementById("button_bank_fee_dropdown");
    var dropdownBankFee = document.getElementById("dropdown_bank_fee");

    var inputElement = document.getElementById("display_input");
    var resultElement = document.getElementById("display_result");

    var buttonNumpad7 = document.getElementById("numpad_7");
    var buttonNumpad8 = document.getElementById("numpad_8");
    var buttonNumpad9 = document.getElementById("numpad_9");
    var buttonNumpad4 = document.getElementById("numpad_4");
    var buttonNumpad5 = document.getElementById("numpad_5");
    var buttonNumpad6 = document.getElementById("numpad_6");
    var buttonNumpad1 = document.getElementById("numpad_1");
    var buttonNumpad2 = document.getElementById("numpad_2");
    var buttonNumpad3 = document.getElementById("numpad_3");
    var buttonNumpadClear = document.getElementById("numpad_clear");
    var buttonNumpad0 = document.getElementById("numpad_0");
    var buttonNumpadDot = document.getElementById("numpad_dot");

    var timeoutSnackbar;
    var snackbar = document.getElementById("snackbar");

    this.toggleSettingsMenu = function () {
        dropdownHomeCurrency.classList.remove("show");
        dropdownVisitingCurrency.classList.remove("show");
        dropdownBankFee.classList.remove("show");
        buttonSettingsMenu.classList.toggle("open");
        settingsMenu.classList.toggle("open");
    };

    this.toggleHomeCurrencyDropdownMenu = function () {
        dropdownVisitingCurrency.classList.remove("show");
        dropdownBankFee.classList.remove("show");
        dropdownHomeCurrency.classList.toggle("show");
    };

    this.toggleVisitingCurrencyDropdownMenu = function () {
        dropdownHomeCurrency.classList.remove("show");
        dropdownBankFee.classList.remove("show");
        dropdownVisitingCurrency.classList.toggle("show");
    };

    this.toggleBankFeeDropdownMenu = function () {
        dropdownHomeCurrency.classList.remove("show");
        dropdownVisitingCurrency.classList.remove("show");
        dropdownBankFee.classList.toggle("show");
    };

    this.setSettingsMenuClick = function (callback) {
        buttonSettingsMenu.addEventListener("click", callback);
    };

    this.setHomeCurrencyDropdownCallback = function (callback) {
        buttonHomeCurrencyDropdown.addEventListener("click", callback);
    };

    this.setVisitingCurrencyDropdownCallback = function (callback) {
        buttonVisitingCurrencyDropdown.addEventListener("click", callback);
    };

    this.setBankFeeDropdownCallback = function (callback) {
        buttonBankFeeDropdown.addEventListener("click", callback);
    };

    this.showValue = function (input, result) {
        inputElement.innerText = input;
        resultElement.innerText = result;
    };

    this.setNumpadClickCallback = function (callback) {
        buttonNumpad7.addEventListener("click", callback.bind(null, buttonNumpad7.value));
        buttonNumpad8.addEventListener("click", callback.bind(null, buttonNumpad8.value));
        buttonNumpad9.addEventListener("click", callback.bind(null, buttonNumpad9.value));
        buttonNumpad4.addEventListener("click", callback.bind(null, buttonNumpad4.value));
        buttonNumpad5.addEventListener("click", callback.bind(null, buttonNumpad5.value));
        buttonNumpad6.addEventListener("click", callback.bind(null, buttonNumpad6.value));
        buttonNumpad1.addEventListener("click", callback.bind(null, buttonNumpad1.value));
        buttonNumpad2.addEventListener("click", callback.bind(null, buttonNumpad2.value));
        buttonNumpad3.addEventListener("click", callback.bind(null, buttonNumpad3.value));
        buttonNumpad0.addEventListener("click", callback.bind(null, buttonNumpad0.value));
    };

    this.setClearClickCallback = function (callback) {
        buttonNumpadClear.addEventListener("touchstart", callback);
    };

    this.setClearReleaseCallback = function (callback) {
        buttonNumpadClear.addEventListener("touchend", callback);
    };

    this.setDotClickCallback = function (callback) {
        buttonNumpadDot.addEventListener("click", callback);
    };

    this.addCurrencyToDropdowns = function (forDropdownHomeCurrency, forDropdownVisitingCurrency) {
        dropdownHomeCurrency.insertAdjacentHTML('beforeend', forDropdownHomeCurrency);
        dropdownVisitingCurrency.insertAdjacentHTML('beforeend', forDropdownVisitingCurrency);
    };

    this.changeHomeCurrencyButton = function (button) {
        buttonHomeCurrencyDropdown.innerHTML = button;
        dropdownHomeCurrency.classList.remove("show");
    };

    this.changeVisitingCurrencyButton = function (button) {
        buttonVisitingCurrencyDropdown.innerHTML = button;
        dropdownVisitingCurrency.classList.remove("show");
    };

    this.changeBankFeeButton = function (button) {
        buttonBankFeeDropdown.innerHTML = button;
        dropdownBankFee.classList.remove("show");
    };

    this.showSnackbar = function(message) {
        clearTimeout(timeoutSnackbar);
        snackbar.innerText = message;
        snackbar.classList.add("show");
        timeoutSnackbar = setTimeout(function(){ snackbar.classList.remove("show"); }, 3000);
    };
}
