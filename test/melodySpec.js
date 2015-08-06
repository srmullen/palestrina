"use strict";

import {expect} from "chai";
import _ from "lodash";
import * as melody from "../src/melody";

describe("melody", () => {
    describe("phrase", () => {
        it("should return an array", () => {
            expect(melody.phrase()).to.be.an("array");
        });

        it("should have lenth of the first input array", () => {
            expect(melody.phrase().length).to.equal(0);
            expect(melody.phrase([1,2,3],[1]).length).to.equal(3);
            expect(melody.phrase([1,2], [1,2,3,4], [1,2,3,4,5]).length).to.equal(2);
        });

        it("should set type, pitch, and dynamic", () => {
            let phrase = melody.phrase([4, 8, 16, 32], ["c4", "d2", "f#5"], ["ff"]);
            expect(phrase[0]).to.eql({type: 4, pitch: "c4", dynamic: "ff"});
            expect(phrase[2]).to.eql({type: 16, pitch: "f#5", dynamic: undefined});
            expect(phrase[3]).to.eql({type: 32, pitch: undefined, dynamic: undefined});
        });
    });

    describe("accompany", () => {
        it("should return an array with length of the given arguments", () => {
            expect(melody.accompany().length).to.equal(0);
            expect(melody.accompany([]).length).to.equal(1);
            expect(melody.accompany([], [], [], [], []).length).to.equal(5);
        });
    });

    // describe("after",  {
    //     it("should exist", () => {
    //
    //     });
    // });

    describe("having", () => {
        it("should zip an arbitrary quality on a melody", () => {
            let phrase = melody.phrase([2, 4, 3, 5]);
            expect(melody.having("drum", ["kick", "snare", "kick", "snare"], phrase)).to.eql([
                {type: 2, pitch: undefined, dynamic: undefined, drum: "kick"},
                {type: 4, pitch: undefined, dynamic: undefined, drum: "snare"},
                {type: 3, pitch: undefined, dynamic: undefined, drum: "kick"},
                {type: 5, pitch: undefined, dynamic: undefined, drum: "snare"}
            ]);

            expect(melody.having("drum", ["kick", "snare"], phrase)).to.eql([
                {type: 2, pitch: undefined, dynamic: undefined, drum: "kick"},
                {type: 4, pitch: undefined, dynamic: undefined, drum: "snare"},
                {type: 3, pitch: undefined, dynamic: undefined, drum: undefined},
                {type: 5, pitch: undefined, dynamic: undefined, drum: undefined}
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
            let phrase = melody.phrase([4,4,4], ["c", "d", "e"]);
            expect(melody.all("part", "lead", phrase)).to.eql([
                {type: 4, pitch: "c", dynamic: undefined, part: "lead"},
                {type: 4, pitch: "d", dynamic: undefined, part: "lead"},
                {type: 4, pitch: "e", dynamic: undefined, part: "lead"}
            ]);
        });
    });

    describe("where", () => {
        it("Applies f to the k key of each note in notes, ignoring missing keys", () => {
            let phrase = melody.phrase([1, 2, 3, 4], [null, 4, null, 5]);
            expect(melody.where("pitch", v => v + 1, phrase)).to.eql([
                {type: 1, pitch: null, dynamic: undefined},
                {type: 2, pitch: 5, dynamic: undefined},
                {type: 3, pitch: null, dynamic: undefined},
                {type: 4, pitch: 6, dynamic: undefined}
            ]);

            expect(melody.where("type",  _.constant(4), phrase)).to.eql([
                {type: 4, pitch: null, dynamic: undefined},
                {type: 4, pitch: 4, dynamic: undefined},
                {type: 4, pitch: null, dynamic: undefined},
                {type: 4, pitch: 5, dynamic: undefined}
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

});
