import {expect} from "chai";
import {parsePitch, noteToMidi} from "../src/pitch";

describe("pitch", () => {
    describe("parsePitch", () => {
        it("should return object with pitchClass", () => {
            const parsed = parsePitch("c");
            expect(parsed.pitchClass).to.be.ok;
            expect(parsed.pitchClass).to.equal("c");
        });

        it("should handle lowercase and uppercase pitch classes", () => {
            const lower = parsePitch("d");
            const upper = parsePitch("D");
            expect(lower.pitchClass).to.equal("d");
            expect(upper.pitchClass).to.equal("D");
        });

        it("should handle accidentals", () => {
            const flat = parsePitch("ab");
            const doubleFlat = parsePitch("Gbb");
            const sharp = parsePitch("A#");
            const doubleSharp = parsePitch("g##");
            expect(flat.pitchClass).to.equal("ab");
            expect(doubleFlat.pitchClass).to.equal("Gbb");
            expect(sharp.pitchClass).to.equal("A#");
            expect(doubleSharp.pitchClass).to.equal("g##");
        });

        it("should not return and octave if not specified", () => {
            const n = parsePitch("c");
            const ns = parsePitch("c#");
            expect(n.octave).not.to.be.ok;
            expect(ns.octave).not.to.be.ok;
        });

        it("should return octave if specified", () => {
            const n1 = parsePitch("c4");
            const n2 = parsePitch("Dbb2")
            expect(n1.octave).to.equal(4);
            expect(n2.octave).to.equal(2);
        });
    });

    describe("noteToMidi", () => {
        it("should handle note objects", () => {
            expect(noteToMidi({pitchClass: "c", octave: 0})).to.equal(12);
            expect(noteToMidi({pitchClass: "C#", octave: 0})).to.equal(13);
            expect(noteToMidi({pitchClass: "db", octave: 0})).to.equal(13);
            expect(noteToMidi({pitchClass: "a", "octave": 4})).to.equal(69);
        });

        it("should handle note strings", () => {
            expect(noteToMidi("c0")).to.equal(12);
            expect(noteToMidi("C#0")).to.equal(13);
            expect(noteToMidi("db0")).to.equal(13);
            expect(noteToMidi("a4")).to.equal(69);
        });
    });
});
