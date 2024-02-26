"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var port = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(port, function () {
    console.log("Server is running");
});
// console.log("server is working")
