"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// port from environment variables or default to 5000
const PORT = process.env.PORT || 6000;
// start the server
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
