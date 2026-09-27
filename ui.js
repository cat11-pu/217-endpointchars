// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "词 " + (spec.words || []).length + " 个，点按钮取首尾字符。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.words || []).forEach(function (word, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = word;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "首 " + view.firsts[spot] + " 尾 " + view.lasts[spot];
      row.appendChild(mark);
      const single = document.createElement("span");
      single.className = "chip";
      single.textContent = view.singles.indexOf(spot) !== -1 ? "单字符" : "多字符";
      row.appendChild(single);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "词数 " + view.count + "，单字符词 " + view.singles.length + " 个";
    parts.log.textContent = "首字符串 " + view.joined;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "取首尾字符";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个词";
  addButton.addEventListener("click", function () {
    spec.words = (spec.words || []).concat(["zulu"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.words = (spec.words || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个词";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "x";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { words: (spec.words || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 的首尾是 " + view.firsts[view.firsts.length - 1] + " 与 " + view.lasts[view.lasts.length - 1];
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看单字符词数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "单字符词 " + view.singles.length + " 个，词数 " + view.count;
  });
  parts.controls.appendChild(readButton);

  draw();
}
