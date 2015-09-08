"use strict";

import * as scale from "./scale";
import * as melody from "./melody";

if (typeof module === "object") {
    module.exports = {scale, melody};
}

if (typeof window === "object") {
	window.palestrina = {scale, melody};
}
