import assert from "node:assert";
import { endsOf } from "../ends.js";
import { reportEnds } from "../report.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("endsOf returns an object", () => {
  assert.strictEqual(typeof endsOf("ab"), "object");
});

check("reportEnds returns firsts", () => {
  assert.ok(Array.isArray(reportEnds(["ab"]).firsts));
});

check("reportEnds returns lasts", () => {
  assert.ok(Array.isArray(reportEnds(["ab"]).lasts));
});

check("render counts words", () => {
  assert.strictEqual(typeof render({ words: ["ab"] }).count, "number");
});

check("render exposes pair flag", () => {
  assert.strictEqual(typeof render({ words: ["ab"] }).pair_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
