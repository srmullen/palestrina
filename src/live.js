const instruments = {};

/*
 * @param part {String} - the name of the part/instrument.
 * @param instrument {(note) => whatever} - A function that plays a given note.
 */
function createPart (part, instrument) {
    instruments[part] = instrument;
}

/*
 * Plays a note according to its part
 */
function playNote (note) {
    let part = note.part || "default";
    return instruments[part](note);
}

function play (notes) {
    return notes.map(playNote);
}

export {
    createPart,
    playNote,
    play
}
