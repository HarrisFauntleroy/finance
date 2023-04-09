"use strict";
exports.__esModule = true;
exports.formatDateAndTime = exports.formatDate = exports.initI18n = void 0;
var en_json_1 = require("./i18n/en.json");
var date_fns_1 = require("date-fns");
var i18next_1 = require("i18next");
var i18next_http_backend_1 = require("i18next-http-backend");
var react_i18next_1 = require("react-i18next");
function initI18n() {
    i18next_1["default"]
        .use(i18next_http_backend_1["default"])
        .use(react_i18next_1.initReactI18next)
        .init({
        debug: false,
        load: 'currentOnly',
        fallbackLng: 'en',
        lng: 'en',
        partialBundledLanguages: true,
        resources: {
            en: { translation: en_json_1["default"] }
        },
        keySeparator: false,
        nsSeparator: false,
        interpolation: {
            escapeValue: false
        }
    });
}
exports.initI18n = initI18n;
function formatDate(date) {
    return (0, date_fns_1.format)(date, (0, i18next_1.t)('dd/MM/yyyy'));
}
exports.formatDate = formatDate;
function formatDateAndTime(date) {
    return (0, date_fns_1.format)(date, (0, i18next_1.t)('dd/MM/yyyy h:mm a'));
}
exports.formatDateAndTime = formatDateAndTime;
exports["default"] = i18next_1["default"];
