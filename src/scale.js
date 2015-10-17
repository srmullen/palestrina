"format es6";
import _ from "lodash";

// because Array.prototype.reverse mutates the array
function reverse (array) {
    return _.reduceRight(array, (acc, n) => {
        acc.push(n);
        return acc;
    }, []);
}

function sumFrom (series, n) {
    if (Math.floor(n) !== n) {
        let lower = sumFrom(series, Math.floor(n)),
            upper = sumFrom(series, Math.ceil(n)),
            fraction = n - Math.floor(n);
        return lower + (fraction * (upper - lower));
    } else if (n < 0) {
        let rseries = _.map(reverse(series), n => 0 - n);
        return _.sum(_.map(_.range(Math.abs(n)), (i) => rseries[i % rseries.length]));
    } else if (n >= 0) {
        return _.sum(_.map(_.range(n), (i) => series[i % series.length]));
    }
}

function create (scale) {
    return _.partial(sumFrom, scale);
}

function mode (scale, n, scaleLenth=7) {
    return _.compose((x) => x - scale(n), scale, from(n));
}

let major = create([2,2,1,2,2,2,1]),
    minor = create([2,1,2,2,1,2,2]),
    ionian = mode(major, 0),
    dorian = mode(major, 1),
    phrygian = mode(major, 2),
    lydian = mode(major, 3),
    mixolydian = mode(major, 4),
    aeolian = mode(major, 5),
    locrian = mode(major, 6);

function from (base) {
    return (root) => root + base;
}

/*
 * Lower midi one octave.
 */
function low (midi) {
    return from(-12)(midi);
}

/*
 * Raise midi one octave.
 */
function high (midi) {
    return from(12)(midi);
}

/*
 * Lower degree one octave (assuming heptatonic scale).
 */
function lower (degree) {
    return from(-7)(degree);
}

/*
 * Raise degree one octave (assuming heptatonic scale).
 */
function raise (degree) {
    return from(7)(degree);
}

let C = from(60),
    D = from(62),
    E = from(64),
    F = from(65),
    G = from(67),
    A = from(69),
    B = from(71),
    sharp = from(1),
    flat = from(-1);

export {
    major,
    minor,
    mode,
    flat,
    sharp,
    ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian,
    C, D, E, F, G, A, B,
    from, low, high, lower, raise
}
