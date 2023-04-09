"use strict";
exports.__esModule = true;
exports.LineWithDot = void 0;
/**
 *
 * Simple vertical map of articles
 *
 */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function LineWithDot() {
    return (<react_2.Flex pos="relative" alignItems="center" mr="40px">
      <react_2.chakra.span position="absolute" left="50%" height="calc(100% + 10px)" border="1px solid" borderColor={(0, react_2.useColorModeValue)('gray.200', 'gray.700')} top="0px"/>
      <react_2.Box pos="relative" p="10px">
        <react_2.Box pos="absolute" width="100%" height="100%" bottom="0" right="0" top="0" left="0" backgroundSize="cover" backgroundRepeat="no-repeat" backgroundPosition="center center" backgroundColor="rgb(255, 255, 255)" borderRadius="100px" border="3px solid rgb(4, 180, 180)" backgroundImage="none" opacity={1}/>
      </react_2.Box>
    </react_2.Flex>);
}
exports.LineWithDot = LineWithDot;
