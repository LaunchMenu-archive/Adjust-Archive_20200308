Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@adjust/core");
const core_2 = require("@emotion/core");
// Replace react's createElement with Emotion's version
exports.React = Object.assign({}, core_1.React, { createElement: core_2.jsx });
//# sourceMappingURL=React.js.map