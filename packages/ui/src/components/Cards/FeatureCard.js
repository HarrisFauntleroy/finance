"use strict";
exports.__esModule = true;
exports.FeatureCard = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function FeatureCard(_a) {
    var icon = _a.icon, heading = _a.heading, content = _a.content;
    return (<react_2.Box key={"feature_element".concat(heading)} bg={(0, react_2.useColorModeValue)('gray.100', 'gray.900')} p={6} rounded="lg" textAlign="center" pos="relative" height="100%">
      <react_2.Flex p={2} w="max-content" color="white" bgGradient="linear(to-br, #228be6, #15aabf)" rounded="md" marginInline="auto" pos="absolute" left={0} right={0} top="-1.5rem" boxShadow="lg">
        <>{icon}</>
      </react_2.Flex>
      <react_2.chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
        {heading}
      </react_2.chakra.h3>
      <react_2.Text fontSize="md" mt={4}>
        {content}
      </react_2.Text>
      <react_2.Link href="#" mt={4} fontSize="sm" color="blue.400">
        Learn more →
      </react_2.Link>
    </react_2.Box>);
}
exports.FeatureCard = FeatureCard;
