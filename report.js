// report.js：报表
import { endsOf } from "./ends.js";

export function reportEnds(words) {
  const firsts = [];
  const lasts = [];
  const singles = [];
  const joinedParts = [];
  for (let index = 0; index < words.length; index += 1) {
    const ends = endsOf(words[index]);
    firsts.push(ends.first);
    lasts.push(ends.last);
    joinedParts.push(ends.first);
    if (ends.size === 1) {
      singles.push(index);
    }
  }
  return { firsts: firsts, lasts: lasts, singles: singles, joined: joinedParts.join("") };
}
