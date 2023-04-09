"use strict";
exports.__esModule = true;
exports.PricingCard = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var bs = require("react-icons/bs");
function PricingCard(_a) {
    var features = _a.features, cost = _a.cost, frequency = _a.frequency;
    return (<react_2.Stack w="max-content" spacing={5} p={10} border="1px solid" borderColor={(0, react_2.useColorModeValue)('gray.400', 'gray.600')} rounded="md" margin="0 auto" textAlign="center">
      <react_2.chakra.h1 fontSize="7xl" fontWeight="400">
        {cost}{' '}
        <react_2.Text as="sub" fontSize="md" left="-10px">
          {frequency}
        </react_2.Text>
      </react_2.chakra.h1>

      {features === null || features === void 0 ? void 0 : features.map(function (text) { return (<react_2.HStack key={text.slice(0, 20)} spacing={3}>
          <react_2.Icon as={bs.BsFillCheckCircleFill} h={6} w={6} color="green.400"/>
          <react_2.Text fontSize="lg" color="gray.500">
            {text}
          </react_2.Text>
        </react_2.HStack>); })}
    </react_2.Stack>);
}
exports.PricingCard = PricingCard;
