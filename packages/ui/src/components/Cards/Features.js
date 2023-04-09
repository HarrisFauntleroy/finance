"use strict";
exports.__esModule = true;
exports.Features = void 0;
var react_1 = require("react");
var FeatureCard_1 = require("../Cards/FeatureCard");
var Grid_1 = require("../Grid");
var react_2 = require("@chakra-ui/react");
function Features(_a) {
    var features = _a.features;
    return (<react_2.Container maxW="6xl" p={{ base: 5, md: 10 }}>
      <Grid_1.Grid gap={10}>{features.map(FeatureCard_1.FeatureCard)}</Grid_1.Grid>
    </react_2.Container>);
}
exports.Features = Features;
