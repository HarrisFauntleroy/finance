"use strict";
exports.__esModule = true;
exports.SidebarItem = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var link_1 = require("next/link");
var router_1 = require("next/router");
function SidebarItem(_a) {
    var icon = _a.icon, label = _a.label, drawer = _a.drawer, href = _a.href;
    var color = (0, react_2.useColorModeValue)('gray.600', 'gray.300');
    var bg = (0, react_2.useColorModeValue)('gray.100', 'gray.800');
    var router = (0, router_1.useRouter)();
    var isActive = router.pathname === href;
    return (<link_1["default"] href={href || '#'}>
      <react_2.Flex align="center" justify={{ base: drawer ? 'left' : 'center', md: 'left' }} cursor="pointer" padding="8px" height="64px" role="group" fontWeight="semibold" transition=".15s ease" bg={isActive ? bg : 'inherit'} color={(0, react_2.useColorModeValue)('inherit', 'gray.400')} _hover={{
            bg: bg,
            color: (0, react_2.useColorModeValue)('gray.900', 'gray.200')
        }}>
        {icon && (<react_2.Icon mx="2" boxSize="4" _groupHover={{
                color: color
            }} as={icon} transition="300ms ease transform" transform={isActive ? 'scale(1.5)' : 'scale(1)'}/>)}
        <react_2.Text display={{ base: drawer ? 'unset' : 'none', md: 'unset' }}>
          {label}
        </react_2.Text>
      </react_2.Flex>
    </link_1["default"]>);
}
exports.SidebarItem = SidebarItem;
