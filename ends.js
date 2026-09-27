// ends.js：取两端（去首尾空白后，首字符与尾字符；空词报 E_BAD_WORD）
export function endsOf(word) {
  const text = String(word == null ? "" : word).trim();
  if (text.length === 0) {
    const error = new Error("word is empty after trimming");
    error.code = "E_BAD_WORD";
    throw error;
  }
  const chars = Array.from(text);
  return { first: chars[0], last: chars[chars.length - 1], single: chars.length === 1 };
}
