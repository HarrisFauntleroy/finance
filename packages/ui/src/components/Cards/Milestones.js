"use strict";
exports.__esModule = true;
exports.Milestones = void 0;
/**
 *
 * Simple vertical map of milestones
 *
 */
var react_1 = require("react");
var EmptyCard_1 = require("../Cards/EmptyCard");
var LineWIthDot_1 = require("../Cards/LineWIthDot");
var MilestoneCard_1 = require("../Cards/MilestoneCard");
var react_2 = require("@chakra-ui/react");
function Milestones(_a) {
    var title = _a.title, milestones = _a.milestones;
    var isMobile = (0, react_2.useBreakpointValue)({ base: true, md: false });
    var isDesktop = (0, react_2.useBreakpointValue)({ base: false, md: true });
    return (<react_2.Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      {title && (<react_2.chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
          {title}
        </react_2.chakra.h3>)}
      {milestones.map(function (milestone) { return (<react_2.Flex key={milestone.id} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && milestone.id % 2 === 0 && (<>
              <EmptyCard_1.EmptyCard />
              <LineWIthDot_1.LineWithDot />
              <MilestoneCard_1.MilestoneCard {...milestone}/>
            </>)}

          {/* Mobile view */}
          {isMobile && (<>
              <LineWIthDot_1.LineWithDot />
              <MilestoneCard_1.MilestoneCard {...milestone}/>
            </>)}

          {/* Desktop view(right card) */}
          {isDesktop && milestone.id % 2 !== 0 && (<>
              <MilestoneCard_1.MilestoneCard {...milestone}/>

              <LineWIthDot_1.LineWithDot />
              <EmptyCard_1.EmptyCard />
            </>)}
        </react_2.Flex>); })}
    </react_2.Container>);
}
exports.Milestones = Milestones;
