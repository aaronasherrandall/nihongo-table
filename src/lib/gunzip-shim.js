// kuromoji does require("zlibjs/bin/gunzip.min.js") and reads .Zlib from it.
// That file exports by assigning to its top-level `this`, which differs between the dev
// pre-bundle and the Rollup production build. Evaluate it with an explicit scope instead
// so it behaves the same everywhere. (Aliased in vite.config.js.)
import src from "../../node_modules/zlibjs/bin/gunzip.min.js?raw";
const scope = {};
new Function(src).call(scope);
const Zlib = scope.Zlib;
export { Zlib };
export default { Zlib };
