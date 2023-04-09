"use strict";
exports.__esModule = true;
exports.Primary = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
exports["default"] = {
    title: 'Button',
    component: react_2.Button
};
var Template = function (args) { return <react_2.Button {...args}/>; };
exports.Primary = Template.bind({});
exports.Primary.args = {
    variant: 'outline',
    children: 'Button'
};
