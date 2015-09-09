"use strict";

import {expect} from "chai";
import _ from "lodash";
import * as scale from "../src/scale";

describe("scale", () => {
    let negative  = n => 0 - n;

    describe("ionian/major", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.major)).to.eql([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26]);
            expect(_.map(_.range(16), scale.ionian)).to.eql([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26]);
            expect(_.map(_.map(_.range(16), negative), scale.ionian)).to.eql([0, -1, -3, -5, -7, -8, -10, -12, -13, -15, -17, -19, -20, -22, -24, -25]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.ionian)).to.eql([1.0, 3.0, 4.5, 6.0, 8.0, 10.0, 11.5, 13.0]);
        });
    });

    describe("dorian", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.dorian)).to.eql([0, 2, 3, 5, 7, 9, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26]);
            expect(_.map(_.map(_.range(16), negative), scale.dorian)).to.eql([0, -2, -3, -5, -7, -9, -10, -12, -14, -15, -17, -19, -21, -22, -24, -26]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.dorian)).to.eql([1.0, 2.5, 4.0, 6.0, 8.0, 9.5, 11.0, 13.0]);
        });
    });

    describe("phrygian", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.phrygian)).to.eql([0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25]);
            expect(_.map(_.map(_.range(16), negative), scale.phrygian)).to.eql([0, -2, -4, -5, -7, -9, -11, -12, -14, -16, -17, -19, -21, -23, -24, -26]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.phrygian)).to.eql([0.5, 2.0, 4.0, 6.0, 7.5, 9.0, 11.0, 12.5]);
        });
    });

    describe("lydian", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.lydian)).to.eql([0, 2, 4, 6, 7, 9, 11, 12, 14, 16, 18, 19, 21, 23, 24, 26]);
            expect(_.map(_.map(_.range(16), negative), scale.lydian)).to.eql([0, -1, -3, -5, -6, -8, -10, -12, -13, -15, -17, -18, -20, -22, -24, -25]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.lydian)).to.eql([1.0, 3.0, 5.0, 6.5, 8.0, 10.0, 11.5, 13.0]);
        });
    });

    describe("mixolydian", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.mixolydian)).to.eql([0, 2, 4, 5, 7, 9, 10, 12, 14, 16, 17, 19, 21, 22, 24, 26]);
            expect(_.map(_.map(_.range(16), negative), scale.mixolydian)).to.eql([0, -2, -3, -5, -7, -8, -10, -12, -14, -15, -17, -19, -20, -22, -24, -26]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.mixolydian)).to.eql([1.0, 3.0, 4.5, 6.0, 8.0, 9.5, 11.0, 13.0]);
        });
    });

    describe("aeolian/minor", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.aeolian)).to.eql([0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26]);
            expect(_.map(_.range(16), scale.minor)).to.eql([0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24, 26]);
            expect(_.map(_.map(_.range(16), negative), scale.aeolian)).to.eql([0, -2, -4, -5, -7, -9, -10, -12, -14, -16, -17, -19, -21, -22, -24, -26]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.aeolian)).to.eql([1.0, 2.5, 4.0, 6.0, 7.5, 9.0, 11.0, 13.0]);
        });
    });

    describe("locrian", () => {
        it("should map scale degrees to chromatic degrees", function () {
            expect(_.map(_.range(16), scale.locrian)).to.eql([0, 1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25]);
            expect(_.map(_.map(_.range(16), negative), scale.locrian)).to.eql([0, -2, -4, -6, -7, -9, -11, -12, -14, -16, -18, -19, -21, -23, -24, -26]);
            expect(_.map(_.range(0.5, 8.5, 1), scale.locrian)).to.eql([0.5, 2.0, 4.0, 5.5, 7.0, 9.0, 11.0, 12.5]);
        });
    });

    describe("C", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.C)).to.eql([60, 61, 62, 63, 64, 65, 66, 67]);
        });
    });

    describe("D", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.D)).to.eql([62, 63, 64, 65, 66, 67, 68, 69]);
        });
    });

    describe("E", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.E)).to.eql([64, 65, 66, 67, 68, 69, 70, 71]);
        });
    });

    describe("F", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.F)).to.eql([65, 66, 67, 68, 69, 70, 71, 72]);
        });
    });

    describe("G", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.G)).to.eql([67, 68, 69, 70, 71, 72, 73, 74]);
        });
    });

    describe("A", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.A)).to.eql([69, 70, 71, 72, 73, 74, 75, 76]);
        });
    });

    describe("B", () => {
        it("should translate numbers into range", () => {
            expect(_.map(_.range(8), scale.B)).to.eql([71, 72, 73, 74, 75, 76, 77, 78]);
        });
    });

    describe("sharp", () => {
        it("should translate notes down a step", () => {
            expect(scale.sharp(5)).to.equal(6);
            expect(scale.sharp(60)).to.equal(61);
        });
    });

    describe("flat", () => {
        it("should translate notes down a step", () => {
            expect(scale.flat(5)).to.equal(4);
            expect(scale.flat(60)).to.equal(59);
        });
    });

    describe("low", () => {
        it("should translate the midi note down an octave", () => {
            expect(scale.low(69)).to.equal(57);
            expect(scale.low(60)).to.equal(48);
        });
    });

    describe("high", () => {
        it("should translate the midi note up an octave", () => {
            expect(scale.high(69)).to.equal(81);
            expect(scale.high(60)).to.equal(72);
        });
    });

    describe("lower", () => {
        it("should translate the scale degree down an octave", () => {
            expect(scale.lower(69)).to.equal(62);
            expect(scale.lower(60)).to.equal(53);
        });
    });

    describe("raise", () => {
        it("should translate the scale degree up an octave", () => {
            expect(scale.raise(69)).to.equal(76);
            expect(scale.raise(60)).to.equal(67);
        });
    });
});
