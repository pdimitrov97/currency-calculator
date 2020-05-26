"use strict";

function CalculatorModel() {
    var input = "0";
    var result = 0;
    var dot = 0;
    var home_currency = "GBP";
    var visiting_currency = "EUR";
    var home_currency_exchange_rate = 1;
    var visiting_currency_exchange_rate = 1;
    var bank_fee = 0;
    var home_dot_allowed = 1;
    var visiting_dot_allowed = 1;
    var currencies = {};

    this.calculate = function () {
        result = parseFloat(input) / visiting_currency_exchange_rate * home_currency_exchange_rate;
        result = result + (result * bank_fee / 100);
        
        if (home_dot_allowed === 1) {
            result = Math.round(result * 100) / 100;
        }
        else {
            result = Math.round(result);
        }

        return "= " + result + " " + home_currency;
    };

    this.add = function (number) {
        if (input.length < 14 || dot > 0) {
            if (parseFloat(input) === 0) {
                if (dot === 10 || dot === 100) {
                    input = input + number;
                    dot = dot * 10;
                } else if (dot !== 1000) {
                    input = number;
                }
                else {
                    showSnackbar("Maximum 2 decimal places!");
                }
            } else {
                if (dot === 10 || dot === 100) {
                    input = input + number;
                    dot = dot * 10;
                } else if (dot !== 1000) {
                    input = input + number;
                }
                else {
                    showSnackbar("Maximum 2 decimal places!");
                }
            }
        }
        else {
            showSnackbar("Maximum number length exceeded!");
        }
    };

    this.addDot = function () {
        if (dot === 0 && visiting_dot_allowed === 1) {
            dot = 10;
            input = input + ".";
        }
    };

    this.clear = function () {
        if (input.length === 1) {
            input = "0";
        }
        else {
            input = input.substring(0, (input.length - 1));
        }

        if (dot === 10) {
            dot = 0;
        }
        else if (dot === 100 || dot === 1000) {
            dot = dot / 10;
        }
    };

    this.clearAll = function () {
        input = "0";
    };

    this.setHomeCurrencyExchangeRate = function (currency) {
        home_currency = currency;
        home_currency_exchange_rate = currencies[currency].rate;
        home_dot_allowed = currencies[currency].decimal;

        if (testLocalStorage() === true) {
            localStorage.setItem("home_currency", home_currency);
        }
    };

    this.setVisitingCurrencyExchangeRate = function (currency) {
        input = "0";
        dot = 0;
        visiting_currency = currency;
        visiting_currency_exchange_rate = currencies[currency].rate;
        visiting_dot_allowed = currencies[currency].decimal;

        if (testLocalStorage() === true) {
            localStorage.setItem("visiting_currency", visiting_currency);
        }
    };

    this.setBankFee = function (fee) {
        bank_fee = fee;

        if (testLocalStorage() === true) {
            localStorage.setItem("bank_fee", bank_fee);
        }
    };

    this.getHomeCurrency = function () {
        return home_currency;
    };

    this.getVisitingCurrency = function () {
        return visiting_currency;
    };

    this.getValue = function () {
        return input + " " + visiting_currency;
    };

    this.getCurrencies = function () {
        return currencies;
    };

    this.updateExchangeRates = function () {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var i;
                var id;
                var rate;
                var xmlDoc = this.responseXML;
                var x = xmlDoc.getElementsByTagName("Cube");

                for (i = 2 ; i < x.length ; i++)
                {
                    id = x[i].getAttribute("currency");
                    rate = x[i].getAttribute("rate");
                    currencies[id].rate = rate;
                }
            }
        };

        xhttp.open("GET", "https://devweb2018.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
        xhttp.send();
    };

    this.createCurrencies = function () {
        var EUR = new Currency("EUR", "Euro", 1.0, 1);
        var USD = new Currency("USD", "US dollar", 1.1422, 1);
        var JPY = new Currency("JPY", "Japanese yen", 125.03, 0);
        var BGN = new Currency("BGN", "Bulgarian lev", 1.9558, 1);
        var CZK = new Currency("CZK", "Czech koruna", 25.747, 1);
        var DKK = new Currency("DKK", "Danish krone", 7.4650, 1);
        var GBP = new Currency("GBP", "Pound sterling", 0.86735, 1);
        var HUF = new Currency("HUF", "Hungarian forint", 317.21, 1);
        var PLN = new Currency("PLN", "Polish zloty", 4.2976, 1);
        var RON = new Currency("RON", "Romanian leu", 4.7562, 1);
        var SEK = new Currency("SEK", "Swedish krona", 10.3508, 1);
        var CHF = new Currency("CHF", "Swiss franc", 1.1352, 1);
        var ISK = new Currency("ISK", "Icelandic krona", 136.80, 0);
        var NOK = new Currency("NOK", "Norwegian krone", 9.7035, 1);
        var HRK = new Currency("HRK", "Croatian kuna", 7.4233, 1);
        var RUB = new Currency("RUB", "Russian rouble", 75.6887, 1);
        var TRY = new Currency("TRY", "Turkish lira", 6.0665, 1);
        var AUD = new Currency("AUD", "Australian dollar", 1.5954, 1);
        var BRL = new Currency("BRL", "Brazilian real", 4.2735, 1);
        var CAD = new Currency("CAD", "Canadian dollar", 1.5142, 1);
        var CNY = new Currency("CNY", "Chinese yuan renminbi", 7.6927, 1);
        var HKD = new Currency("HKD", "Hong Kong dollar", 8.9620, 1);
        var IDR = new Currency("IDR", "Indonesian rupiah", 16093.60, 0);
        var ILS = new Currency("ILS", "Israeli shekel", 4.2010, 1);
        var INR = new Currency("INR", "Indian rupee", 81.3060, 1);
        var KRW = new Currency("KRW", "South Korean won", 1277.32, 0);
        var MXN = new Currency("MXN", "Mexican peso", 21.7153, 1);
        var MYR = new Currency("MYR", "Malaysian ringgit", 4.6931, 1);
        var NZD = new Currency("NZD", "New Zealand dollar", 1.6694, 1);
        var PHP = new Currency("PHP", "Philippine peso", 59.947, 1);
        var SGD = new Currency("SGD", "Singapore dollar", 1.5444, 1);
        var THB = new Currency("THB", "Thai baht", 35.991, 1);
        var ZAR = new Currency("ZAR", "South African rand", 15.5560, 1);

        currencies[EUR.id] = EUR;
        currencies[USD.id] = USD;
        currencies[JPY.id] = JPY;
        currencies[BGN.id] = BGN;
        currencies[CZK.id] = CZK;
        currencies[DKK.id] = DKK;
        currencies[GBP.id] = GBP;
        currencies[HUF.id] = HUF;
        currencies[PLN.id] = PLN;
        currencies[RON.id] = RON;
        currencies[SEK.id] = SEK;
        currencies[CHF.id] = CHF;
        currencies[ISK.id] = ISK;
        currencies[NOK.id] = NOK;
        currencies[HRK.id] = HRK;
        currencies[RUB.id] = RUB;
        currencies[TRY.id] = TRY;
        currencies[AUD.id] = AUD;
        currencies[BRL.id] = BRL;
        currencies[CAD.id] = CAD;
        currencies[CNY.id] = CNY;
        currencies[HKD.id] = HKD;
        currencies[IDR.id] = IDR;
        currencies[ILS.id] = ILS;
        currencies[INR.id] = INR;
        currencies[KRW.id] = KRW;
        currencies[MXN.id] = MXN;
        currencies[MYR.id] = MYR;
        currencies[NZD.id] = NZD;
        currencies[PHP.id] = PHP;
        currencies[SGD.id] = SGD;
        currencies[THB.id] = THB;
        currencies[ZAR.id] = ZAR;
    };

    this.saveLocally = function () {
        if (testLocalStorage() === true) {
            for (var currency in currencies) {
                localStorage.setItem(currency, currencies[currency].rate);
            }
        }
    };

    this.loadLocally = function () {
        if (testLocalStorage() === true) {
            var temp;

            for (var currency in currencies) {
                temp = localStorage.getItem(currency);
                
                if (temp !== null) {
                    currencies[currency].rate = temp;
                }
            }

            temp = localStorage.getItem("home_currency");

            if (temp !== null) {
                setHomeCurrency(temp);
            }
            else {
                setHomeCurrency("GBP");
            }

            temp = localStorage.getItem("visiting_currency");

            if (temp !== null) {
                setVisitingCurrency(temp);
            }
            else {
                setVisitingCurrency("EUR");
            }

            temp = localStorage.getItem("bank_fee");

            if (temp !== null) {
                setBankFee(temp);
            }
            else {
                setBankFee("0");
            }
        }
    };
}

function Currency(id, name, rate, decimal) {
    this.id = id;
    this.name = name;
    this.rate = rate;
    this.decimal = decimal;
}

function testLocalStorage() {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('feature_test', 'yes');
                if (localStorage.getItem('feature_test') === 'yes') {
                    localStorage.removeItem('feature_test');
                    return true;
                }
                else {
                    return false;
                }
            }
            catch(e) {
                return false;
            }
        }
        else {
            return false;
        }
}
