var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_1 = require("../serialize");
const react_1 = __importDefault(require("react"));
const constants_1 = require("../constants");
// Sleep is used to give time for the constants to be exported before being used
const sleep = (duration = 0) => new Promise(res => setTimeout(res, duration));
// Define the constants
exports.constants = new constants_1.Constants(__filename);
// Object declaration
const myObject = exports.constants.define({ something: /test/g, crap: "test" });
// Function declaration
const Comp = ({ text }) => react_1.default.createElement("div", null, "text");
const myJsxFunc1 = exports.constants.defineFunction((john) => react_1.default.createElement(Comp, { text: john }));
const myJsxFunc2 = exports.constants.defineFunction((el) => react_1.default.createElement("div", null,
    "hoi ",
    el));
describe("Constants", () => {
    describe("Definition", () => {
        it("Should not be able to define constants after declaration", () => {
            expect((async () => {
                await sleep();
                exports.constants.define("Hallo");
            })()).rejects.toEqual(new Error("Constants may only be defined during file initialization"));
        });
    });
    describe("Serialization/Deserialization", () => {
        it("Should (de)serialize constants", async () => {
            await sleep();
            const objString = JSON.stringify(serialize_1.Serialize.serialize(myObject));
            const obj = serialize_1.Serialize.deserialize(JSON.parse(objString), () => { });
            expect(obj).toMatchObject({
                something: myObject.something,
                crap: myObject.crap,
            });
        });
        it("Should (de)serialize function call results", async () => {
            await sleep();
            const elementRef = myJsxFunc1("hoi");
            const elementString = JSON.stringify(serialize_1.Serialize.serialize(elementRef, () => { }));
            const element = serialize_1.Serialize.deserialize(JSON.parse(elementString), () => { });
            expect(element).toMatchObject({ type: Comp });
        });
        it("Should (de)serialize function calls result using other function call results", async () => {
            await sleep();
            const elementRef = myJsxFunc2(myJsxFunc1("hoi"));
            const elementString = JSON.stringify(serialize_1.Serialize.serialize(elementRef, () => { }));
            const element = serialize_1.Serialize.deserialize(JSON.parse(elementString), () => { });
            expect(element).toMatchObject({
                type: "div",
                props: { children: ["hoi ", expect.objectContaining({ type: Comp })] },
            });
        });
    });
});
//# sourceMappingURL=constants.js.map