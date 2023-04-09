"use strict";
exports.__esModule = true;
exports.useLocalStorage = void 0;
var react_1 = require("react");
/** Custom hook to persist to local storage in the manner of useState */
var useLocalStorage = function (key, initialValue) {
    /**
     * State to store our value
     * Pass initial state function to useState
     */
    var _a = (0, react_1.useState)(function () {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            /** Get from local storage by key */
            var localItem = window.localStorage.getItem(key);
            /** Parse stored json or if none return initialValue */
            return localItem ? JSON.parse(localItem) : initialValue;
        }
        catch (error) {
            /** If error also return initialValue */
            console.error(error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    /**
     * Return a wrapped version of useState's setter function
     * that persists the new value to localStorage.
     */
    var setValue = function (value) {
        try {
            /**
             * Allow value to be a function
             * so we have same API as useState
             */
            var valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
};
exports.useLocalStorage = useLocalStorage;
