let _ = require("lodash");

function sumFrom (series, n) {
    return _.sum(_.map(_.range(n), (i) => series[i % series.length]));
}

function create (scale) {
    return _.partial(sumFrom, scale);
}

 let ionian = create([2,2,1,2,2,2,1]),
     dorian = create([2,1,2,2,2,1,2]),
     phrygian = create([1,2,2,2,1,2,2]),
     lydian = create([2,2,2,1,2,2,1]),
     mixolydian = create([2,2,1,2,2,1,2]),
     aeolian = create([2,1,2,2,1,2,2]),
     locrian = create([1,2,2,1,2,2,2]),
     major = ionian,
     minor = aeolian;

function translation (n) {
    return v => n + v;
}

let C = translation(60),
    D = translation(62),
    E = translation(64),
    F = translation(65),
    G = translation(67),
    A = translation(69),
    B = translation(71),
    sharp = translation(1),
    flat = translation(-1);

module.exports = {
    major,
    minor,
    flat,
    sharp,
    ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian,
    C, D, E, F, G, A, B
}
