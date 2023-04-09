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
exports.Sidebar = void 0;
var react_1 = require("react");
var SidebarContent_1 = require("./SidebarContent");
var react_2 = require("@chakra-ui/react");
function Sidebar(_a) {
    var links = _a.links, props = __rest(_a, ["links"]);
    return (<>
      <SidebarContent_1.SidebarContent links={links} w={{ sm: '64px', md: '200px' }} borderRight="none" display={{ base: 'none', sm: 'unset' }}/>
      <react_2.Drawer isOpen={props.isOpen} onClose={props.onClose} placement="left">
        <react_2.DrawerOverlay />
        <react_2.DrawerContent maxWidth="200px" aria-modal="true">
          <SidebarContent_1.SidebarContent links={links} w="full" borderRight="none" drawer/>
        </react_2.DrawerContent>
      </react_2.Drawer>
    </>);
}
exports.Sidebar = Sidebar;
