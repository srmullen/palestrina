let _ = require("../node_modules/lodash/index.js"),
    F = require("../node_modules/fraction.js/fraction.js");

// common
function maybe (fn) {
	return function (arg) {
		if (arg !== undefined && arg !== null) {
			return fn(arg);
		} else {
			return arg;
		}
	}
}

function concat (a, b) {
    return a.concat([b]);
}

function calculateTimes (phrase) {
    return _.map(_.reduce(phrase, (acc, note) => {
        let previous = _.last(acc);
        if (previous) {
            note.time = new F(previous.duration).add(previous.time);
        } else {
            note.time = 0;
        }
        return concat(acc, note);
    }, []), (note) => {
        note.time = note.time.valueOf();
        return note;
    });
}

/*
 * [a] -> [b] -> [c] ->[{duration: a, pitch: b, velocity: c}]
 */
function phrase (durations=[], pitches=[], velocity=[]) {
	// const ph = new Array(durations.length);
    const ph = new Array(Math.min(durations.length, pitches.length));
    // console.log(ph.length);
	for (let i = 0; i < ph.length; i++) {
		ph[i] = {duration: durations[i], pitch: pitches[i], velocity: velocity[i]};
	}

	return calculateTimes(ph);
}

/*
 * ...[{time}] -> [...{time}]
 * Same as Leipzig.with
 */
// neccessary?
function accompany (...phrases) {
	return phrases;
}

/* Delay notes by wait */
// neccessary?
function after (wait, notes) {
    const time = new F(wait);
    return _.map(notes, (note) => {
        note.time = time.add(note.time).valueOf();
        return note;
    });
}

/* Zips and arbitrary property onto a melody */
function having (prop, values, phrase) {
	return _.map(phrase, (event, i) => {
		var property = {};
		property[prop] = values[i];
		return _.assign({}, event, property);
	});
}

function is (x) {
	return () => x;
}

/* Sets a constant value for each note of a melody */
function all (prop, value, phrase) {
	let property = {};
	property[prop] = value;
	return _.map(phrase, (event, i) => {
		return _.assign({}, event, property);
	});
}

/* Applies f to the k key of each note in notes, ignoring missing keys */
function where (prop, fn, phrase) {
	let maybeDo = maybe(fn);

	return _.map(phrase, (event) => {
		let property = {};
		property[prop] = maybeDo(event[prop]);
		return _.assign({}, event, property);
	});
}

/* Replaces part of the melody with another */
function but (start, end, variation, phrase) {
	let variationObject = _.mapKeys(_.take(variation, end - start), (val, k) => +k + start);
	return calculateTimes(_.assign([], phrase, variationObject));
}

/* Reapeats notes n times */
function times (n, phrase) {
	return calculateTimes(_.flatten(_.times(n, () => _.map(phrase, _.clone))));
}

let mapClone = _.partialRight(_.map, _.clone);

/* Sequences later after earlier */
function then (later, earlier) {
	return calculateTimes(mapClone(earlier).concat(mapClone(later)));
}

function mapthen (f, ...melodies) {}

/*
 * tempo: Number
 * Returns a function that translates a beat number into seconds.
 */
function bpm (tempo) {
    return (beat) => (beat / tempo) * 60;
}

function duration (notes) {
    return _.sum(notes, n => n.duration);
}

module.exports = {
	phrase,
	accompany,
	having,
	is,
	all,
	where,
	but,
	times,
	then,
	mapthen,
    after,
    bpm,
    duration
}
