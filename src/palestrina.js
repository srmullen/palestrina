"use strict";

import scale from "./scale";
import melody from "./melody";

if (typeof module === "object") {
    module.exports = {scale, melody};
}

if (typeof window === "object") {
	window.palestrina = {scale, melody};
}
