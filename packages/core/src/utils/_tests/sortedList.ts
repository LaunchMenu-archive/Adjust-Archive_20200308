import {SortedList} from "../sortedList";

describe("SortedList", () => {
    describe("Push", () => {
        const list = new SortedList<number>((a, b) => a - b);
        it("Should keep the array sorted", () => {
            list.push(5);
            list.push(1);
            list.push(9);
            list.push(3, 6, 2, 4);
            expect(list.get()).toEqual([1, 2, 3, 4, 5, 6, 9]);
        });
    });
    describe("Pop", () => {
        let list: SortedList<number>;
        beforeEach(() => {
            list = new SortedList<number>((a, b) => a - b);
            list.push(5, 4, 3, 2, 6, 8, 7, 1, 0);
        });
        it("Should keep the array sorted", () => {
            list.pop(4);
            list.pop(6, 5);
            expect(list.get()).toEqual([0, 1, 2, 3, 7, 8]);
        });
        it("Should return the index of the removed item", () => {
            expect(list.pop(4)).toBe(4);
        });
        it("Should return the index of the removed items", () => {
            expect(list.pop(4, 5)).toEqual([4, 5]);
        });
        it("Should be able to remove items based on a description", () => {
            expect(list.pop(v => v > 3 && v < 6)).toEqual([4, 5]);
        });
    });
    describe("Get", () => {
        const list = new SortedList<number>((a, b) => a - b);
        list.push(0, 1, 2, 3, 4);
        it("Should get the correct item", () => {
            expect(list.get(4)).toBe(4);
            expect(list.get(1)).toBe(1);
        });
        it("Should wrap indices indefinitely", () => {
            expect(list.get(5)).toBe(0);
            expect(list.get(16)).toBe(1);
        });
        it("Should wrap negative indices", () => {
            expect(list.get(-1)).toBe(4);
            expect(list.get(-7)).toBe(3);
        });
    });
});
