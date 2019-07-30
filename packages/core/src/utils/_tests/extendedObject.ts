import {ExtendedObject} from "../extendedObject";
// TODO: Test cases will have to be written for all methods

describe("Object", () => {
    describe("ForEach", () => {
        const data = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: {
                    f: 4,
                    g: {
                        h: {
                            i: 5,
                        },
                    },
                    j: 6,
                },
            },
            k: 7,
        };
        it("Should cover all values", () => {
            const fields = [];
            ExtendedObject.forEach(data, (key, value) => {
                fields.push({key: key, value: value});
            });

            [
                {key: "a", value: 1},
                {key: "b", value: 2},
                {
                    key: "c",
                    value: {
                        d: 3,
                        e: {
                            f: 4,
                            g: {
                                h: {
                                    i: 5,
                                },
                            },
                            j: 6,
                        },
                    },
                },
                {key: "k", value: 7},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to recurse", () => {
            const fields = [];
            ExtendedObject.forEach(
                data,
                (key, value, path) => {
                    fields.push({path: path, value: value});
                },
                true
            );

            [
                {path: "a", value: 1},
                {path: "b", value: 2},
                {path: "c.d", value: 3},
                {path: "c.e.f", value: 4},
                {path: "c.e.g.h.i", value: 5},
                {path: "c.e.j", value: 6},
                {path: "k", value: 7},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to recurse with a custom function", () => {
            const fields = [];
            ExtendedObject.forEach(
                data,
                (key, value, path) => {
                    fields.push({path: path, value: value});
                },
                (key, value, path) => key != "g"
            );

            [
                {path: "a", value: 1},
                {path: "b", value: 2},
                {path: "c.d", value: 3},
                {path: "c.e.f", value: 4},
                {
                    path: "c.e.g",
                    value: {
                        h: {
                            i: 5,
                        },
                    },
                },
                {path: "c.e.j", value: 6},
                {path: "k", value: 7},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
    });
    describe("ForEachPaired", () => {
        const obj1 = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: {
                    f: 4,
                    g: {
                        h: {
                            i: 5,
                        },
                    },
                    j: 6,
                },
            },
            k: 7,
        };
        const obj2 = {
            a: 11,
            b: 12,
            c: {
                d: 13,
                e: {
                    f: 14,
                    g: {
                        h: {
                            i: 15,
                        },
                    },
                    j: 16,
                },
            },
            k: 17,
        };
        const obj3 = {
            a: 21,
            b: {
                l: 22,
            },
            c: {
                d: 23,
                e: {
                    g: {
                        h: 25,
                    },
                    j: 26,
                },
                m: 28,
            },
            k: 27,
        };
        it("Should cover all values", () => {
            const fields = [];
            ExtendedObject.forEachPaired([obj1, obj2], (key, values) => {
                fields.push({key: key, values: values});
            });

            [
                {key: "a", values: [1, 11]},
                {key: "b", values: [2, 12]},
                {
                    key: "c",
                    values: [
                        {
                            d: 3,
                            e: {
                                f: 4,
                                g: {
                                    h: {
                                        i: 5,
                                    },
                                },
                                j: 6,
                            },
                        },
                        {
                            d: 13,
                            e: {
                                f: 14,
                                g: {
                                    h: {
                                        i: 15,
                                    },
                                },
                                j: 16,
                            },
                        },
                    ],
                },
                {key: "k", values: [7, 17]},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to recurse", () => {
            const fields = [];
            ExtendedObject.forEachPaired(
                [obj1, obj2],
                (key, values, path) => {
                    fields.push({path: path, values: values});
                },
                true
            );

            [
                {path: "a", values: [1, 11]},
                {path: "b", values: [2, 12]},
                {path: "c.d", values: [3, 13]},
                {path: "c.e.f", values: [4, 14]},
                {path: "c.e.g.h.i", values: [5, 15]},
                {path: "c.e.j", values: [6, 16]},
                {path: "k", values: [7, 17]},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to recurse with a custom function", () => {
            const fields = [];
            ExtendedObject.forEachPaired(
                [obj1, obj2],
                (key, values, path) => {
                    fields.push({path: path, values: values});
                },
                (key, values, path) => key != "g"
            );

            [
                {path: "a", values: [1, 11]},
                {path: "b", values: [2, 12]},
                {path: "c.d", values: [3, 13]},
                {path: "c.e.f", values: [4, 14]},
                {
                    path: "c.e.g",
                    values: [
                        {
                            h: {
                                i: 5,
                            },
                        },
                        {
                            h: {
                                i: 15,
                            },
                        },
                    ],
                },
                {path: "c.e.j", values: [6, 16]},
                {path: "k", values: [7, 17]},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to handle different structures", () => {
            const fields = [];
            ExtendedObject.forEachPaired(
                [obj1, obj2, obj3],
                (key, values, path) => {
                    fields.push({path: path, values: values});
                },
                true
            );

            [
                {path: "a", values: [1, 11, 21]},
                {path: "b", values: [2, 12, {l: 22}]},
                {path: "c.d", values: [3, 13, 23]},
                {path: "c.e.g.h", values: [{i: 5}, {i: 15}, 25]},
                {path: "c.e.j", values: [6, 16, 26]},
                {path: "k", values: [7, 17, 27]},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
        it("Should be able to handle different structures with a leading structure", () => {
            const fields = [];
            ExtendedObject.forEachPaired(
                [obj1, obj2, obj3],
                (key, values, path) => {
                    fields.push({path: path, values: values});
                },
                true,
                true
            );

            [
                {path: "a", values: [1, 11, 21]},
                {path: "b", values: [2, 12, {l: 22}]},
                {path: "c.d", values: [3, 13, 23]},
                {path: "c.e.f", values: [4, 14, undefined]},
                {path: "c.e.g.h.i", values: [5, 15, undefined]},
                {path: "c.e.j", values: [6, 16, 26]},
                {path: "k", values: [7, 17, 27]},
            ].forEach(v => {
                expect(fields).toContainEqual(v);
            });
        });
    });
    describe("CopyData", () => {
        it("Should correctly copy shallow data", () => {
            const data = ExtendedObject.copyData(
                {
                    a: 3,
                    b: true,
                    c: 9,
                    d: "yes",
                },
                {
                    d: 3,
                    e: 6,
                    f: false,
                }
            );
            expect(data).toEqual({
                a: 3,
                b: true,
                c: 9,
                d: "yes",
                e: 6,
                f: false,
            });
        });
        it("Should correctly copy deep data", () => {
            const data = ExtendedObject.copyData(
                {
                    a: {
                        b: true,
                        c: 9,
                        d: {
                            e: true,
                        },
                    },
                    f: "yes",
                },
                {
                    a: {
                        d: {
                            g: false,
                        },
                        h: true,
                    },
                    f: "no",
                }
            );
            expect(data).toEqual({
                a: {
                    b: true,
                    c: 9,
                    d: {
                        e: true,
                        g: false,
                    },
                    h: true,
                },
                f: "yes",
            });
        });
        it("Should only copy the specified data", () => {
            const data = ExtendedObject.copyData(
                {
                    a: {
                        b: true,
                        c: 9,
                        d: {
                            e: true,
                        },
                    },
                    f: "yes",
                },
                {
                    a: {
                        d: {
                            g: false,
                        },
                        h: true,
                    },
                    f: "no",
                },
                {
                    a: {
                        c: true,
                    },
                    f: true,
                }
            );
            expect(data).toEqual({
                a: {
                    c: 9,
                    d: {
                        g: false,
                    },
                    h: true,
                },
                f: "yes",
            });
        });
        it("Should be able to get rid of undefined values", () => {
            const data = ExtendedObject.copyData(
                {
                    a: {
                        b: undefined,
                        c: 9,
                        d: {
                            e: undefined,
                        },
                    },
                },
                {
                    a: {
                        b: "test",
                        c: 2,
                        d: {
                            e: 4,
                        },
                    },
                    f: "no",
                },
                null,
                false,
                false
            );
            expect(data).toEqual({
                a: {
                    c: 9,
                },
                f: "no",
            });
        });
    });
});
