import * as _ from "lodash";
import {from, lower} from "./scale";

const triad = {i: 0, iii: 2, v: 4};
const seventh = {i: 0, iii: 2, v: 4, vii: 6};
const ninth = {i: 0, iii: 2, v: 4, vii: 6, ix: 8};
const eleventh = {i: 0, iii: 2, v: 4, vii: 6, ix: 8, xi: 10};
const thirteenth = {i: 0, iii: 2, v: 4, vii: 6, ix: 8, xi: 10, xiii: 12};

function root (chord, tonic) {
    let rootChord = {},
        fromTonic = from(tonic);
    _.each(chord, (v, k) => {
        rootChord[k] = fromTonic(v);
    });
    return rootChord;
}

function inversion (chord, n) {
    let stable = _.take(_.keys(triad), n),
        lowered = _.difference(_.keys(chord), stable);

    let invertedChord = {};
    _.each(stable, (k) => {
        invertedChord[k] = chord[k];
    });

    _.each(lowered, (k) => {
        invertedChord[k] = lower(chord[k]);
    });

    return invertedChord;
}

export {
    triad,
    seventh,
    ninth,
    eleventh,
    thirteenth,

    root,
    inversion
}
