"use strict";

import {expect} from "chai";
import _ from "lodash";
import * as chord from "../src/chord";

describe("chord", () => {

    describe("root", () => {
        it("should translate a chord so that its root is the given tonic", () => {
            expect(chord.root(chord.triad, 0)).to.eql(chord.triad);
            expect(chord.root(chord.triad, 0)).not.to.equal(chord.triad); // check that its a new object

            expect(chord.root(chord.seventh, 2)).to.eql({"i": 2, "iii": 4, "v": 6, "vii": 8});
            expect(chord.root(chord.ninth, 5)).to.eql({"i": 5, "iii": 7, "v": 9, "vii": 11, "ix": 13});
        });
    });

    describe("inversion", () => {
        it("should lower all but the first n tones of the chord", () => {
            expect(chord.inversion(chord.triad, 0)).to.eql({"i": -7, "iii": -5, "v": -3});
            expect(chord.inversion(chord.triad, 1)).to.eql({"i": 0, "iii": -5, "v": -3});
            expect(chord.inversion(chord.triad, 2)).to.eql({"i": 0, "iii": 2, "v": -3});
            expect(chord.inversion(chord.triad, 3)).to.eql({"i": 0, "iii": 2, "v": 4});

            expect(chord.inversion(chord.seventh, 0)).to.eql({"vii": -1, "i": -7, "v": -3, "iii": -5});
            expect(chord.inversion(chord.seventh, 1)).to.eql({"vii": -1, "i": 0, "v": -3, "iii": -5});
            expect(chord.inversion(chord.seventh, 2)).to.eql({"vii": -1, "i": 0, "v": -3, "iii": 2});
            expect(chord.inversion(chord.seventh, 3)).to.eql({"vii": -1, "i": 0, "v": 4, "iii": 2});
            expect(chord.inversion(chord.seventh, 4)).to.eql({"vii": -1, "i": 0, "v": 4, "iii": 2});
        });
    });
});
