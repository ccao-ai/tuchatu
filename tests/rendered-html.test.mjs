import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("exports a GitHub Pages-ready static site", async () => {
  const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
  assert.match(html, /词跃｜小托福 50 词能力检测/);
  assert.match(html, /https:\/\/ccao-ai\.github\.io\/tuchatu\//);
  assert.match(html, /\/tuchatu\/assets\//);
  assert.doesNotMatch(html, /chatgpt\.site|codex-preview/);
  const assets = await readdir(new URL("../docs/assets/", import.meta.url));
  assert.ok(assets.some((file) => file.endsWith(".js")));
  assert.ok(assets.some((file) => file.endsWith(".css")));
});

test("ships exactly 50 vocabulary entries and review features", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.equal((page.match(/\{ word: "/g) ?? []).length, 50);
  assert.match(page, /开始测试/);
  assert.match(page, /即时定位/);
  assert.match(page, /错词复盘/);
});
