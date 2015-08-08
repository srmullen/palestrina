const scale = require("./scale"),
      melody = require("./melody");

if (typeof module === "object") {
    module.exports = {scale, melody};
}

if (typeof window === "object") {
	window.palestrina = {scale, melody};
}
