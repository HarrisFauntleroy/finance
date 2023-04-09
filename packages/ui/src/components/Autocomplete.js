"use strict";
exports.__esModule = true;
exports.Autocomplete = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var chakra_autocomplete_1 = require("@choc-ui/chakra-autocomplete");
var react_hook_form_1 = require("react-hook-form");
function Autocomplete(_a) {
    var _b, _c;
    var label = _a.label, data = _a.data;
    var _d = (0, react_hook_form_1.useFormContext)(), control = _d.control, errors = _d.formState.errors;
    return (<react_2.FormControl isInvalid={!!errors.userCurrency}>
      <react_2.FormLabel htmlFor="marketId">{label}</react_2.FormLabel>
      <react_hook_form_1.Controller control={control} name="userCurrency" render={function (_a) {
            var field = _a.field;
            return (<chakra_autocomplete_1.AutoComplete filter={function (query, optionLabel) { return optionLabel.includes(query); }} maxSuggestions={10} onChange={function (value) {
                    field.onChange(value);
                }}>
            <chakra_autocomplete_1.AutoCompleteInput size="sm" placeholder="Currency" onChange={field.onChange} value={field.value || ''} bg={'white.300'} _dark={{
                    bg: 'gray.700'
                }}/>
            <chakra_autocomplete_1.AutoCompleteList>
              {data === null || data === void 0 ? void 0 : data.map(function (option, oid) { return (<chakra_autocomplete_1.AutoCompleteItem key={"option-".concat(oid)} value={option.ticker} textTransform="capitalize">
                  <react_2.HStack alignItems="center">
                    <react_1.Suspense fallback={<react_2.SkeletonCircle size="10"/>}>
                      <react_2.Avatar mr={2} size="xs" name={option.name} src={option.image || option.name}/>
                    </react_1.Suspense>
                    <react_2.Text>
                      {option.name}: ({option.ticker})
                    </react_2.Text>
                  </react_2.HStack>
                </chakra_autocomplete_1.AutoCompleteItem>); })}
            </chakra_autocomplete_1.AutoCompleteList>
          </chakra_autocomplete_1.AutoComplete>);
        }}/>
      <react_2.FormErrorMessage>
        {(_c = (_b = errors.userCurrency) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.toString()}
      </react_2.FormErrorMessage>
    </react_2.FormControl>);
}
exports.Autocomplete = Autocomplete;
