"use strict";
exports.__esModule = true;
exports.TextInput = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var TextInput = function (_a) {
    var name = _a.name, label = _a.label, inputProps = _a.inputProps, register = _a.register, error = _a.error, validation = _a.validation;
    return (<react_2.FormControl isInvalid={!!error}>
    <react_2.FormLabel htmlFor={name}>{label}</react_2.FormLabel>
    <react_2.Input id={name} {...register(name, validation)} {...inputProps}/>
    <react_2.FormErrorMessage>{error}</react_2.FormErrorMessage>
  </react_2.FormControl>);
};
exports.TextInput = TextInput;
