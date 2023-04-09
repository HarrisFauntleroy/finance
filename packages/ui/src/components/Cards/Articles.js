"use strict";
exports.__esModule = true;
exports.Articles = void 0;
/**
 *
 * Simple vertical map of articles
 *
 */
var react_1 = require("react");
var ArticleCard_1 = require("../Cards/ArticleCard");
var LineWIthDot_1 = require("../Cards/LineWIthDot");
var react_2 = require("@chakra-ui/react");
function Articles(_a) {
    var articles = _a.articles;
    return (<react_2.Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
      <react_2.chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
        Articles
      </react_2.chakra.h3>
      {articles.map(function (milestone) { return (<react_2.Flex key={milestone.id} mb="10px">
          <LineWIthDot_1.LineWithDot />
          <ArticleCard_1.ArticleCard {...milestone}/>
        </react_2.Flex>); })}
    </react_2.Container>);
}
exports.Articles = Articles;
