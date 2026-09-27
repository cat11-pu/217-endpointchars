// report.js：一次扫描出报表（firsts/lasts/singles/joined）
import { endsOf } from "./ends.js";

export function reportEnds(words) {
  const list = Array.isArray(words) ? words : [];
  const firsts = [];
  const lasts = [];
  const singles = [];
  let joined = "";
  for (let i = 0; i < list.length; i += 1) {
    const ends = endsOf(list[i]);
    firsts.push(ends.first);
    lasts.push(ends.last);
    joined += ends.first;
    if (ends.single) {
      singles.push(i);
    }
  }
  return { firsts, lasts, singles, joined };
}
