// app.js：渲染结果
import { endsOf } from "./ends.js";
import { reportEnds } from "./report.js";

export function render(spec) {
  const words = spec.words || [];
  const view = reportEnds(words);
  const firsts = view.firsts || [];
  const lasts = view.lasts || [];
  const singles = view.singles || [];
  return { firsts: firsts, lasts: lasts, singles: singles, joined: view.joined || "",
           count: firsts.length, single_count: singles.length,
           pair_ok: firsts.length === lasts.length,
           tail: endsOf("ab").first };
}
