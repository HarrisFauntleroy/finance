"use strict";
exports.__esModule = true;
exports.Stepper = void 0;
var react_1 = require("@chakra-ui/react");
var chakra_ui_steps_1 = require("chakra-ui-steps");
var fi_1 = require("react-icons/fi");
var Stepper = function (_a) {
    var steps = _a.steps;
    var _b = (0, chakra_ui_steps_1.useSteps)({
        initialStep: 0
    }), nextStep = _b.nextStep, prevStep = _b.prevStep, resetSteps = _b.reset, activeStep = _b.activeStep;
    return (<react_1.Stack>
      {activeStep === steps.length ? (<react_1.Flex p={4}>
          <react_1.Button mx="auto" size="sm" onClick={resetSteps}>
            Reset
          </react_1.Button>
        </react_1.Flex>) : (<react_1.Flex width="100%" justify="space-between">
          <react_1.Button isDisabled={activeStep === 0} mr={4} onClick={prevStep} variant="ghost">
            Prev
          </react_1.Button>
          <react_1.Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </react_1.Button>
        </react_1.Flex>)}
      <chakra_ui_steps_1.Steps orientation="vertical" activeStep={activeStep} checkIcon={fi_1.FiCheckCircle}>
        {steps.map(function (_a) {
            var label = _a.label, content = _a.content;
            return (<chakra_ui_steps_1.Step label={label} key={label}>
            <>{content}</>
          </chakra_ui_steps_1.Step>);
        })}
      </chakra_ui_steps_1.Steps>
    </react_1.Stack>);
};
exports.Stepper = Stepper;
