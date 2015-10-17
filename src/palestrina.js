"format es6";

import * as scale from "./scale";
import * as melody from "./melody";
import * as chord from "./chord";
import * as live from "./live";

export {scale, melody, chord, live};

if (typeof window === "object") {
	window.palestrina = {scale, melody, chord, live};
}
