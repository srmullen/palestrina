let _ = require("../node_modules/lodash/index.js");

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

/*
 * [a] -> [b] -> [c] ->[{type: a, pitch: b, dynamic: c}]
 */
function phrase (durations=[], pitches=[], dynamic=[]) {
	const ph = new Array(durations.length);

	for (let i = 0; i < durations.length; i++) {
		ph[i] = {type: durations[i], pitch: pitches[i], dynamic: dynamic[i]};
	}

	return ph;
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
function after (wait, notes) {}

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
	return _.assign([], phrase, variationObject);
}

/* Reapeats notes n times */
function times (n, phrase) {
	return _.flatten(_.times(n, () => _.map(phrase, _.clone)));
}

/* Sequences later after earlier */
function then (later, earlier) {
	let mapClone = _.partialRight(_.map, _.clone);
	return mapClone(earlier).concat(mapClone(later));
}

function mapthen (f, ...melodies) {}

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
	mapthen
}
