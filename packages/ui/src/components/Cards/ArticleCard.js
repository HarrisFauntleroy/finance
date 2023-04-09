"use strict";
exports.__esModule = true;
exports.ArticleCard = void 0;
/**
 *
 * Simple vertical map of articles
 *
 */
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
function ArticleCard(_a) {
    var title = _a.title, categories = _a.categories, description = _a.description, icon = _a.icon, date = _a.date;
    return (<react_2.HStack p={{ base: 3, sm: 6 }} bg={(0, react_2.useColorModeValue)('gray.100', 'gray.800')} spacing={5} rounded="lg" alignItems="center" pos="relative" _before={{
            content: '""',
            w: '0',
            h: '0',
            borderColor: "transparent ".concat((0, react_2.useColorModeValue)('#edf2f6', '#1a202c'), " transparent"),
            borderStyle: 'solid',
            borderWidth: '15px 15px 15px 0',
            position: 'absolute',
            left: '-15px',
            display: 'block'
        }}>
      <react_2.Icon as={icon} w={12} h={12} color="teal.400"/>
      <react_2.Box>
        <react_2.HStack spacing={2} mb={1}>
          {categories.map(function (cat) { return (<react_2.Text fontSize="sm" key={cat}>
              {cat}
            </react_2.Text>); })}
        </react_2.HStack>
        <react_2.VStack spacing={2} mb={3} textAlign="left">
          <react_2.chakra.h1 as={react_2.Link} _hover={{ color: 'teal.400' }} fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </react_2.chakra.h1>
          <react_2.Text fontSize="md" noOfLines={2}>
            {description}
          </react_2.Text>
        </react_2.VStack>
        <react_2.Text fontSize="sm">{date}</react_2.Text>
      </react_2.Box>
    </react_2.HStack>);
}
exports.ArticleCard = ArticleCard;
