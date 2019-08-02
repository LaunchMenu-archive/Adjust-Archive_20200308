import {Data} from "../data";

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
        const data = new Data(initial);

        it("Should have all the passed fields available", () => {
            if (data) {
                expect(data.get).toEqual(initial);
            } else expect(false).toBeTruthy();
        });
        it("Should correctly initialise with undefined als defaults", () => {
            const data = new Data(
                {
                    a: undefined,
                    b: {
                        c: undefined,
                        d: {
                            e: undefined as number,
                        },
                        f: undefined,
                    },
                },
                false
            );
            expect(data.get.b.d.e).toBe(undefined);
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
        let data: Data<typeof initial>;
        beforeEach(() => {
            data = new Data(initial);
        });

        it("Should changes a single field", () => {
            data.changeData({a: {b: {d: "new"}}});
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
            data.changeData({a: {b: {d: "s", c: 8}}, e: false});
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

        it("Should call the listeners", () => {
            let called = false;
            data.on("change", (changedProps, previousProps) => {
                called = true;
                expect(changedProps).toEqual({a: {b: {d: "s", c: 8}}});
                expect(previousProps).toEqual({a: {b: {d: "test", c: 3}}});
            });

            data.changeData({a: {b: {d: "s", c: 8}}});

            expect(called).toBeTruthy();
        });

        it("Should get rid of undefined values if specified", () => {
            data = new Data(initial, false, false);
            data.changeData({a: {b: undefined}, e: undefined});
            expect(data.get).toEqual({f: {g: 5}});
        });
    });
});
