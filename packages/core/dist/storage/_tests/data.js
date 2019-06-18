Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
describe("Data", () => {
    describe("Instanciation", () => {
        let initial = {
            a: {
                b: {
                    c: 3,
                    d: "test",
                },
            },
            e: true,
            f: {},
        };
        const data = new data_1.Data(initial);
        it("Should have all the passed fields available", () => {
            if (data) {
                expect(data.get).toEqual(initial);
            }
            else
                expect(false).toBeTruthy();
        });
        it("Should correctly initialise with undefined als defaults", () => {
            const data = new data_1.Data({
                a: undefined,
                b: {
                    c: undefined,
                    d: {
                        e: undefined,
                    },
                    f: undefined,
                },
            }, false);
            data.set.b.d.e(3);
            expect(data.get.b.d.e).toBe(3);
        });
    });
    describe("ChangeData", () => {
        const initial = {
            a: {
                b: {
                    c: 3,
                    d: "test",
                },
            },
            e: true,
            f: {
                g: 5,
            },
        };
        let data;
        beforeEach(() => {
            data = new data_1.Data(initial);
        });
        it("Should changes a single field", () => {
            data.changeData({ a: { b: { d: "new" } } });
            expect(data.get).toEqual({
                a: {
                    b: {
                        c: 3,
                        d: "new",
                    },
                },
                e: true,
                f: {
                    g: 5,
                },
            });
        });
        it("Should change multiple fields", () => {
            data.changeData({ a: { b: { d: "s", c: 8 } }, e: false });
            expect(data.get).toEqual({
                a: {
                    b: {
                        c: 8,
                        d: "s",
                    },
                },
                e: false,
                f: {
                    g: 5,
                },
            });
        });
        it("Should all the listeners", () => {
            let called = false;
            data.on("change", (changedProps, previousProps) => {
                called = true;
                expect(changedProps).toEqual({ a: { b: { d: "s", c: 8 } } });
                expect(previousProps).toEqual({ a: { b: { d: "test", c: 3 } } });
            });
            data.changeData({ a: { b: { d: "s", c: 8 } } });
            expect(called).toBeTruthy();
        });
    });
    describe("Set", () => {
        const initial = {
            a: {
                b: {
                    c: 3,
                    d: "test",
                },
            },
            e: true,
            f: {
                g: 5,
            },
        };
        let data;
        beforeEach(() => {
            data = new data_1.Data(initial);
        });
        it("Should change a leaf property", () => {
            data.set.f.g(9);
            expect(data.get).toEqual({
                a: {
                    b: {
                        c: 3,
                        d: "test",
                    },
                },
                e: true,
                f: {
                    g: 9,
                },
            });
        });
        it("Should change an inner node property", () => {
            data.set.a.b({
                c: 9,
                d: "hallo",
            });
            expect(data.get).toEqual({
                a: {
                    b: {
                        c: 9,
                        d: "hallo",
                    },
                },
                e: true,
                f: {
                    g: 5,
                },
            });
        });
        it("Should call the listeners", () => {
            let called = false;
            data.on("change", (changedProps, previousProps) => {
                called = true;
                expect(changedProps).toEqual({ a: { b: { d: "s", c: 8 } } });
                expect(previousProps).toEqual({ a: { b: { d: "test", c: 3 } } });
            });
            data.set.a.b({ d: "s", c: 8 });
            expect(called).toBeTruthy();
        });
        it("Should get rid of undefined values if specified", () => {
            data = new data_1.Data(initial, false);
            data.set.a.b.d(undefined);
            data.set.a.b.c(undefined);
            expect(data.get.a).toBe(undefined);
            data.set.a.b.d("yes");
            expect(data.get.a.b).toEqual({ c: undefined, d: "yes" });
        });
    });
});
//# sourceMappingURL=data.js.map