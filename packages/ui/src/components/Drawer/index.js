"use strict";
exports.__esModule = true;
exports.Drawer = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function Drawer(_a) {
    var children = _a.children, onClose = _a.onClose, isOpen = _a.isOpen;
    return (<react_2.Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <react_2.DrawerOverlay />
      <react_2.DrawerContent>
        <>
          <react_2.DrawerCloseButton />
          {children}
        </>
      </react_2.DrawerContent>
    </react_2.Drawer>);
}
exports.Drawer = Drawer;
