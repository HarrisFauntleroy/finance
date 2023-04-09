"use strict";
exports.__esModule = true;
exports.Tabs = void 0;
var react_1 = require("react");
var useLocalStorage_1 = require("../../hooks/useLocalStorage");
var react_2 = require("@chakra-ui/react");
function Tabs(_a) {
    var pages = _a.pages, id = _a.id;
    var _b = (0, useLocalStorage_1.useLocalStorage)("tabs-".concat(id), 0), tabIndex = _b[0], setTabIndex = _b[1];
    var handleTabsChange = function (index) {
        setTabIndex(index);
    };
    return (<react_2.Tabs index={tabIndex} onChange={handleTabsChange}>
      <react_2.TabList height="32px" bg={(0, react_2.useColorModeValue)('gray.50', 'gray.900')}>
        {pages === null || pages === void 0 ? void 0 : pages.map(function (_a, index) {
            var title = _a.title;
            return (<react_2.Tab key={"tab-list-".concat(id, "-").concat(index)}>{title}</react_2.Tab>);
        })}
      </react_2.TabList>
      <react_2.TabPanels>
        {pages === null || pages === void 0 ? void 0 : pages.map(function (_a, index) {
            var page = _a.page;
            return (<react_2.TabPanel padding={{ base: 0, sm: '16px' }} key={"tab-panel-".concat(id, "-").concat(index)}>
            <>{page}</>
          </react_2.TabPanel>);
        })}
      </react_2.TabPanels>
    </react_2.Tabs>);
}
exports.Tabs = Tabs;
