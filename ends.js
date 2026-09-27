// ends.js：取两端
export function endsOf(word) {
  const trimmed = String(word).trim();
  if (trimmed.length === 0) {
    const error = new Error("E_BAD_WORD: word is empty after trimming");
    error.code = "E_BAD_WORD";
    throw error;
  }
  const chars = Array.from(trimmed);
  return { first: chars[0], last: chars[chars.length - 1], size: chars.length };
}
