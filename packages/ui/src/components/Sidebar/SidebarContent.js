"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.SidebarContent = void 0;
var react_1 = require("react");
var SidebarItem_1 = require("../Sidebar/SidebarItem");
var react_2 = require("@chakra-ui/react");
var image_1 = require("next/image");
function SidebarContent(_a) {
    var links = _a.links, drawer = _a.drawer, props = __rest(_a, ["links", "drawer"]);
    return (<react_2.Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="8" bg={(0, react_2.useColorModeValue)('gray.50', 'gray.900')} overflowX="hidden" overflowY="auto" shadow="2xl" w={{ base: 0, sm: '64px', md: '200px' }} {...props}>
      <react_2.Center height="64px" justifyContent={{
            base: drawer ? 'left' : 'center',
            sm: drawer ? 'left' : 'center'
        }}>
        <image_1["default"] src="/images/logodark.png" height="32" width="32" alt="logo"/>
        <react_2.Text ml="2" fontSize="2xl" fontWeight="semibold" display={{ sm: 'none', md: 'unset' }}>
          Elixir Money
        </react_2.Text>
      </react_2.Center>
      <react_2.Divider />
      <react_2.Stack as="nav" aria-label="Main Navigation">
        {links === null || links === void 0 ? void 0 : links.map(function (_a) {
            var href = _a.href, icon = _a.icon, label = _a.label;
            return (<SidebarItem_1.SidebarItem key={href} href={href} icon={icon} label={label} drawer={drawer}/>);
        })}
      </react_2.Stack>
    </react_2.Box>);
}
exports.SidebarContent = SidebarContent;
