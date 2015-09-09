"use strict";

import * as scale from "./scale";
import * as melody from "./melody";
import * as chord from "./chord";

if (typeof module === "object") {
    module.exports = {scale, melody, chord};
}

if (typeof window === "object") {
	window.palestrina = {scale, melody, chord};
}
