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
exports.Primary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Input_1 = require("./Input");
exports["default"] = {
    title: "UI/Atoms/Input",
    component: Input_1.Input,
    argTypes: {
        backgroundColor: { control: "color" }
    }
};
var Template = function (args) { return (0, jsx_runtime_1.jsx)(Input_1.Input, __assign({}, args), void 0); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    primary: true,
    rounded: true,
    label: "Enter Email",
    onChange: function () {
        console.log("changed");
    },
    onClick: function () {
        console.log("clicked");
    }
};
//# sourceMappingURL=Input.stories.js.map