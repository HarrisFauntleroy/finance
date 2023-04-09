"use strict";
exports.__esModule = true;
exports.MilestoneCard = void 0;
/**
 *
 * Simple vertical map of milestones
 *
 */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function MilestoneCard(_a) {
    var id = _a.id, title = _a.title, description = _a.description, date = _a.date;
    // For even id show card on left side
    // For odd id show card on right side
    var isEvenId = id % 2 === 0;
    var borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px';
    var leftValue = isEvenId ? '-15px' : 'unset';
    var rightValue = isEvenId ? 'unset' : '-15px';
    var isMobile = (0, react_2.useBreakpointValue)({ base: true, md: false });
    if (isMobile) {
        leftValue = '-15px';
        rightValue = 'unset';
        borderWidthValue = '15px 15px 15px 0';
    }
    return (<react_2.HStack flex={1} p={{ base: 3, sm: 6 }} backgroundColor={(0, react_2.useColorModeValue)('gray.100', 'gray.700')} spacing={5} rounded="lg" alignItems="center" pos="relative" _before={{
            content: '""',
            w: '0',
            h: '0',
            borderColor: "transparent ".concat((0, react_2.useColorModeValue)('#edf2f6', '#2D3748'), " transparent"),
            borderStyle: 'solid',
            borderWidth: borderWidthValue,
            position: 'absolute',
            left: leftValue,
            right: rightValue,
            display: 'block'
        }}>
      <react_2.Box>
        <react_2.Text fontSize="lg" color={isEvenId ? 'teal.400' : 'blue.400'}>
          {date}
        </react_2.Text>
        <react_2.VStack spacing={2} mb={3} textAlign="left">
          <react_2.chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </react_2.chakra.h1>
          <react_2.Text fontSize="md">{description}</react_2.Text>
        </react_2.VStack>
      </react_2.Box>
    </react_2.HStack>);
}
exports.MilestoneCard = MilestoneCard;
