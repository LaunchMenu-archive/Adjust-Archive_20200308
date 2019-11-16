import {Serialize} from "../serialize";
import React, {FC} from "react";
import {Constants} from "../constants";

// Sleep is used to give time for the constants to be exported before being used
const sleep = (duration: number = 0) => new Promise(res => setTimeout(res, duration));

// Define the constants
export const constants = new Constants(__filename);

// Object declaration
const myObject = constants.define({something: /test/g, crap: "test"});

// Function declaration
const Comp: FC<{text: string}> = ({text}) => <div>text</div>;
const myJsxFunc1 = constants.defineFunction((john: string) => <Comp text={john} />);
const myJsxFunc2 = constants.defineFunction((el: JSX.Element) => <div>hoi {el}</div>);

describe("Constants", () => {
    describe("Definition", () => {
        it("Should not be able to define constants after declaration", () => {
            expect(
                (async () => {
                    await sleep();
                    constants.define("Hallo");
                })()
            ).rejects.toEqual(
                new Error("Constants may only be defined during file initialization")
            );
        });
    });
    describe("Serialization/Deserialization", () => {
        it("Should (de)serialize constants", async () => {
            await sleep();
            const objString = JSON.stringify(Serialize.serialize(myObject));
            const obj = Serialize.deserialize(JSON.parse(objString), () => {});

            expect(obj).toMatchObject({
                something: myObject.something,
                crap: myObject.crap,
            });
        });
        it("Should (de)serialize function call results", async () => {
            await sleep();
            const elementRef = myJsxFunc1("hoi");

            const elementString = JSON.stringify(
                Serialize.serialize(elementRef, () => {})
            );
            const element = Serialize.deserialize(JSON.parse(elementString), () => {});

            expect(element).toMatchObject({type: Comp});
        });
        it("Should (de)serialize function calls result using other function call results", async () => {
            await sleep();
            const elementRef = myJsxFunc2(myJsxFunc1("hoi"));

            const elementString = JSON.stringify(
                Serialize.serialize(elementRef, () => {})
            );
            const element = Serialize.deserialize(JSON.parse(elementString), () => {});

            expect(element).toMatchObject({
                type: "div",
                props: {children: ["hoi ", expect.objectContaining({type: Comp})]},
            });
        });
    });
});
