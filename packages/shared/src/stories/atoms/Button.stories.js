"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.OCBButton = exports.Primary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Button_1 = require("./Button");
exports["default"] = {
    title: "UI/Atoms/Button",
    component: Button_1.Button,
    argTypes: {
        backgroundColor: { control: "color" }
    }
};
var Template = function (args) { return (0, jsx_runtime_1.jsx)(Button_1.Button, __assign({}, args), void 0); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    primary: true,
    rounded: true,
    label: "aaAAA"
};
exports.OCBButton = Template.bind({});
exports.OCBButton.args = {
    backgroundColor: "#499925",
    color: "white",
    label: "aaAAA"
};
//# sourceMappingURL=Button.stories.js.map