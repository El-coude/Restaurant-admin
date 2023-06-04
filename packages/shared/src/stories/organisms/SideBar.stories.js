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
exports.Closed = exports.Open = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SideBar_1 = require("./SideBar");
exports["default"] = {
    title: "UI/Oranisms/SideBar",
    component: SideBar_1.SideBar,
    argTypes: {
        backgroundColor: { control: "color" }
    }
};
var Template = function (args) { return ((0, jsx_runtime_1.jsx)(SideBar_1.SideBar, __assign({}, args), void 0)); };
exports.Open = Template.bind({});
var open = true;
exports.Open.args = {
    children: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SideBar_1.SideBarElement, { icon: (0, jsx_runtime_1.jsx)("img", { src: "/favicon.ico" }, void 0), text: "Dashboard", link: "/dash", open: true }, void 0), (0, jsx_runtime_1.jsx)(SideBar_1.SideBarElement, { icon: (0, jsx_runtime_1.jsx)("img", { src: "/favicon.ico" }, void 0), text: "Dash", link: "/dash", open: true }, void 0)] }, void 0)),
    logo: ((0, jsx_runtime_1.jsx)("img", { src: "/favicon.ico", width: 42, style: {
            margin: "auto",
            display: "block"
        } }, void 0)),
    toggle: function (open) {
        console.log(open);
    }
};
exports.Closed = Template.bind({});
exports.Closed.args = {
    children: ((0, jsx_runtime_1.jsx)(SideBar_1.SideBarElement, { icon: (0, jsx_runtime_1.jsx)("img", { src: "/favicon.ico" }, void 0), text: "Dashboard", link: "/dash", open: false }, void 0)),
    logo: ((0, jsx_runtime_1.jsx)("img", { src: "/favicon.ico", width: 42, style: {
            margin: "auto",
            display: "block"
        } }, void 0)),
    toggle: function (open) {
        console.log(open);
    }
};
//# sourceMappingURL=SideBar.stories.js.map