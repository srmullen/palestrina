"use strict";

import {expect} from "chai";
import _ from "lodash";
import * as melody from "../src/melody";
import F from "fraction.js";

describe("melody", () => {
    describe("phrase", () => {
        it("should return an array", () => {
            expect(melody.phrase()).to.be.an("array");
        });

        it("should have lenth of the shorter of durations and pitches", () => {
            expect(melody.phrase().length).to.equal(0);
            expect(melody.phrase([1,2,3],[1]).length).to.equal(1);
            expect(melody.phrase([1,2], [1,2,3,4], [1,2,3,4,5]).length).to.equal(2);
        });

        it("should set duration, pitch, velocity, and time", () => {
            let phrase = melody.phrase([1/4, 1/8, 1/16, 1/32], ["c4", "d2", "f#5"], ["ff"]);
            expect(phrase[0]).to.eql({duration: 1/4, pitch: "c4", velocity: "ff", time: 0});
            expect(phrase[1]).to.eql({duration: 1/8, pitch: "d2", velocity: undefined, time: 1/4})
            expect(phrase[2]).to.eql({duration: 1/16, pitch: "f#5", velocity: undefined, time: 3/8});
            expect(phrase[3]).to.not.be.defined;
        });

        it("should avoid floating point errors", () => {

        });
    });

    describe("accompany", () => {
        it("should return an array with length of the given arguments", () => {
            let mel = melody.accompany(melody.phrase([2, 2, 2, 2], [1, 1, 1, 1]), melody.phrase([3, 3, 3, 3], [2, 2, 2, 2]));
            expect(mel.length).to.equal(8);
            expect(mel).to.eql([
                {duration: 2, pitch: 1, time: 0, velocity: undefined},
                {duration: 3, pitch: 2, time: 0, velocity: undefined},
                {duration: 2, pitch: 1, time: 2, velocity: undefined},
                {duration: 3, pitch: 2, time: 3, velocity: undefined},
                {duration: 2, pitch: 1, time: 4, velocity: undefined},
                {duration: 2, pitch: 1, time: 6, velocity: undefined},
                {duration: 3, pitch: 2, time: 6, velocity: undefined},
                {duration: 3, pitch: 2, time: 9, velocity: undefined}
            ]);
        });
    });

    describe("having", () => {
        it("should zip an arbitrary quality on a melody", () => {
            let phrase = melody.phrase([1/4, 1/4, 1/4, 1/4], [1, 2, 3, 4]);
            expect(melody.having("drum", ["kick", "snare", "kick", "snare"], phrase)).to.eql([
                {duration: 1/4, pitch: 1, velocity: undefined, drum: "kick", time: 0},
                {duration: 1/4, pitch: 2, velocity: undefined, drum: "snare", time: 1/4},
                {duration: 1/4, pitch: 3, velocity: undefined, drum: "kick", time: 2/4},
                {duration: 1/4, pitch: 4, velocity: undefined, drum: "snare", time: 3/4}
            ]);

            expect(melody.having("drum", ["kick", "snare"], phrase)).to.eql([
                {duration: 1/4, pitch: 1, velocity: undefined, drum: "kick", time: 0},
                {duration: 1/4, pitch: 2, velocity: undefined, drum: "snare", time: 1/4},
                {duration: 1/4, pitch: 3, velocity: undefined, drum: undefined, time: 2/4},
                {duration: 1/4, pitch: 4, velocity: undefined, drum: undefined, time: 3/4}
            ]);
        });
    });

    describe("is", () => {
        it("should return a function", () => {
            expect(melody.is()).is.a("function");
        });

        it("should return its input when called", () => {
            expect(melody.is("bass")()).to.equal("bass")
            expect(melody.is("lead")(1, 2, 3)).to.equal("lead");
        });
    });

    describe("all", () => {
        it("Sets a constant value for each note of a melody", () => {
            let phrase = melody.phrase([1/4, 1/4, 1/4], ["c", "d", "e"]);
            expect(melody.all("part", "lead", phrase)).to.eql([
                {duration: 1/4, pitch: "c", velocity: undefined, part: "lead", time: 0},
                {duration: 1/4, pitch: "d", velocity: undefined, part: "lead", time: 1/4},
                {duration: 1/4, pitch: "e", velocity: undefined, part: "lead", time: 2/4}
            ]);
        });
    });

    describe("where", () => {
        it("Applies f to the k key of each note in notes, ignoring missing keys", () => {
            let phrase = melody.phrase([1/8, 1/8, 1/8, 1/8], [null, 4, null, 5]);
            expect(melody.where("pitch", v => v + 1, phrase)).to.eql([
                {duration: 1/8, pitch: null, velocity: undefined, time: 0},
                {duration: 1/8, pitch: 5, velocity: undefined, time: 1/8},
                {duration: 1/8, pitch: null, velocity: undefined, time: 2/8},
                {duration: 1/8, pitch: 6, velocity: undefined, time: 3/8}
            ]);

            expect(melody.where("duration",  _.constant(4), phrase)).to.eql([
                {duration: 4, pitch: null, velocity: undefined, time: 0},
                {duration: 4, pitch: 4, velocity: undefined, time: 1/8},
                {duration: 4, pitch: null, velocity: undefined, time: 1/4},
                {duration: 4, pitch: 5, velocity: undefined, time: 3/8}
            ]);
        });
    });

    describe("but", () => {
        it("Replaces part of the melody with another", () => {
            let phrase = melody.phrase([1,2,3,4,5,6], [1,2,3,4,5,6], _.times(6, _.constant("p"))),
                variation = melody.phrase([1,2], [1,2], ["fff", "fff"]);
            expect(melody.but(2, 4, variation, phrase)).to.eql(melody.phrase([1,2,1,2,5,6], [1,2,1,2,5,6], ["p", "p", "fff", "fff", "p", "p"]));
        });
    });

    describe("after", () => {
        it("delays notes for the wait time", () => {
            expect(melody.after(1/4, melody.phrase([1/8], [60]))).to.eql([
                {duration: 1/8, pitch: 60, velocity: undefined, time: 1/4}
            ]);

            expect(melody.after(2, melody.phrase([1/4, 1/8, 1/4], [5, 5, 5]))).to.eql([
                {duration: 1/4, pitch: 5, velocity: undefined, time: 2},
                {duration: 1/8, pitch: 5, velocity: undefined, time: 9/4},
                {duration: 1/4, pitch: 5, velocity: undefined, time: 19/8}
            ]);
        });
    });

    describe("times", () => {
        let phrase = melody.phrase([1,2], [1,2]);
        it("Reapeats notes n times", () => {
            expect(melody.times(3, phrase)).to.eql(melody.phrase([1,2,1,2,1,2], [1,2,1,2,1,2]));
        });

        it("should give new objects", () => {
            let ostinato = melody.times(3, phrase);
            expect(phrase[0].pitch).to.equal(1);
            ostinato[0].pitch = 60;
            expect(phrase[0].pitch).to.equal(1);
            expect(ostinato[2].pitch).to.equal(1);
        });
    });

    describe("then", () => {
        let before = melody.phrase([1,2,3],[1,2,3]),
            after = melody.phrase([4,5,6],[4,5,6]);
        it("Sequences later after earlier", () => {
            expect(melody.then(after, before)).to.eql(melody.phrase([1,2,3,4,5,6],[1,2,3,4,5,6]));
        });

        it("should give new object", () => {
            let qna = melody.then(after, before);
            _.map(qna, (n) => {
                n.pitch = n.pitch + 1;
                return n;
            });
            expect(qna).to.eql(melody.phrase([1,2,3,4,5,6], [2,3,4,5,6,7]));
            expect(before).to.eql(melody.phrase([1,2,3],[1,2,3]));
            expect(after).to.eql(melody.phrase([4,5,6],[4,5,6]));
        });
    });

    describe("bpm", () => {
        let bpm90 = melody.bpm(90),
            bpm120 = melody.bpm(120);
        it("should return a function", () => {
            expect(melody.bpm()).to.be.a("function");
        });

        it("should return the correct time in seconds", () => {
            // Using Fraction to handle rounding errors
            expect(new F(bpm90(5)).valueOf()).to.equal(new F(10/3).valueOf());
            expect(bpm120(5)).to.equal(5/2);
            expect(bpm90(120)).to.equal(80);
            expect(bpm120(120)).to.equal(60);
            expect(bpm90(259)).to.equal(518/3);
            expect(bpm120(259)).to.equal(259/2);
        });
    });

    describe("duration", () => {
        it("returns the total duration of notes", () => {
            expect(melody.duration(melody.phrase([1/4], [5]))).to.equal(1/4);
            expect(melody.duration(melody.phrase([1/8, 1/8], [5, 5]))).to.equal(1/4);
            expect(melody.duration(melody.phrase([1/16, 1/16, 1/16, 1/16], [5, 5, 5, 5]))).to.equal(1/4);
            expect(melody.duration(melody.phrase([2, 1, 1/16, 1/16], [5, 5, 5, 5]))).to.equal(25/8);
        });
    });

    describe("rhythm", () => {
        it("returns a phrase without pitches", () => {
            expect(melody.rhythm([1/4, 1/8, 1/4])).to.eql(melody.phrase([1/4, 1/8, 1/4], [null, null, null]));
        });
    });

    describe("wherever", () => {
        it("applies a given function to the note wherever applicable returns true", () => {
            expect(melody.wherever(n => n.duration === 1/4, "pitch", p => p - 1, melody.phrase([1/4], [60]))).to.eql(melody.phrase([1/4], [59]));
            expect(melody.wherever(n => n.duration === 1/2, "pitch", p => p - 1, melody.phrase([1/4], [60]))).to.eql(melody.phrase([1/4], [60]));
            expect(melody.wherever(n => n.pitch, "part", melody.is("piano"), melody.phrase([1/4, 1/4, 1/4, 1/4], ["Ab", null, "B#", null])))
                .to.eql([
                    {duration: 1/4, time: 0, part: "piano", pitch: "Ab", velocity: undefined},
                    {duration: 1/4, time: 1/4, pitch: null, velocity: undefined},
                    {duration: 1/4, time: 2/4, part: "piano", pitch: "B#", velocity: undefined},
                    {duration: 1/4, time: 3/4, pitch: null, velocity: undefined}
                ]);
        });
    });

    describe("tempo", () => {
        it("transforms both the time and duration according to the given timing", () => {
            let phrase = melody.phrase([1, 1/2, 1/4, 1/8, 1/16], [1,2,3,4,5]);
            expect(melody.tempo(melody.bpm(120), phrase)).to.eql([
                {pitch: 1, time: 0, duration: 1/2, velocity: undefined},
                {pitch: 2, time: 1/2, duration: 1/4, velocity: undefined},
                {pitch: 3, time: 3/4, duration: 1/8, velocity: undefined},
                {pitch: 4, time: 7/8, duration: 1/16, velocity: undefined},
                {pitch: 5, time: 15/16, duration: 1/32, velocity: undefined}
            ]);
            expect(phrase).to.eql(melody.phrase([1, 1/2, 1/4, 1/8, 1/16], [1,2,3,4,5]));
        });
    });

    describe("accelerando", () => {
        it("returns a function that linearly interpolates the phrase between from and to", () => {
            let phrase = melody.phrase([1, 1/2, 1/4, 1/8, 1/16], [1,2,3,4,5]);
            expect(melody.tempo(melody.accelerando(0, 4, 3/2), phrase)).to.eql([
                {pitch: 1, time: 0, duration: 17/16, velocity: undefined},
                {pitch: 2, time: 17/16, duration: 37/64, velocity: undefined},
                {pitch: 3, time: 105/64, duration: 77/256, velocity: undefined},
                {pitch: 4, time: 497/256, duration: 157/1024, velocity: undefined},
                {pitch: 5, time: 2145/1024, duration: 317/4096, velocity: undefined},
            ]);
            expect(phrase).to.eql(melody.phrase([1, 1/2, 1/4, 1/8, 1/16], [1,2,3,4,5]));
        });
    });

});
