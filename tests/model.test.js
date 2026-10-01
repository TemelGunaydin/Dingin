import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dayKey, clockValue, greeting, dailyThought, cleanText, parseFocus, parseSettings } from "../extension/model.js";

const date = (hours, minutes = 0) => new Date(2026, 9, 1, hours, minutes);

test("clock uses 24-hour time by default, with leading zeros", () => {
  assert.deepEqual(clockValue(date(0, 7)), { time: "00:07", period: "" });
  assert.deepEqual(clockValue(date(23, 59)), { time: "23:59", period: "" });
});

test("12-hour time handles midnight, noon and afternoon", () => {
  assert.deepEqual(clockValue(date(0), "12"), { time: "12:00", period: "ÖÖ" });
  assert.deepEqual(clockValue(date(12), "12"), { time: "12:00", period: "ÖS" });
  assert.deepEqual(clockValue(date(15, 8), "12"), { time: "03:08", period: "ÖS" });
});

test("calendar key uses the local date on both sides of midnight", () => {
  assert.equal(dayKey(new Date(2026, 0, 2, 0, 1)), "2026-01-02");
  assert.equal(dayKey(new Date(2026, 0, 1, 23, 59)), "2026-01-01");
});

test("greetings respect all time boundaries and an optional name", () => {
  for (const [hour, expected] of [[0, "İyi geceler"], [4, "İyi geceler"], [5, "Günaydın"], [11, "Günaydın"], [12, "İyi günler"], [17, "İyi günler"], [18, "İyi akşamlar"], [22, "İyi akşamlar"], [23, "İyi geceler"]]) {
    assert.equal(greeting(date(hour)), `${expected}.`);
  }
  assert.equal(greeting(date(10), "  Temel  "), "Günaydın, Temel.");
});

test("text input is normalized and bounded without splitting emoji", () => {
  assert.equal(cleanText("  İlk   adım\n şimdi ", 160), "İlk adım şimdi");
  assert.equal(cleanText("🌿🌿🌿", 2), "🌿🌿");
  assert.equal(cleanText(null, 32), "");
});

test("focus is valid only for the current local day", () => {
  const raw = JSON.stringify({ day: "2026-10-01", text: "  Bir şey  ", done: true });
  assert.deepEqual(parseFocus(raw, "2026-10-01"), { day: "2026-10-01", text: "Bir şey", done: true });
  assert.equal(parseFocus(raw, "2026-10-02"), null);
});

test("corrupt focus storage is safe and never creates a blank focus", () => {
  for (const raw of [null, "", "undefined", "{}", "[]", "null", "{broken", '{"day":"2026-10-01","text":123}', '{"day":"2026-10-01","text":"   "}']) {
    assert.equal(parseFocus(raw, "2026-10-01"), null);
  }
  assert.deepEqual(parseFocus('{"day":"2026-10-01","text":"A","done":"true"}', "2026-10-01"), { day: "2026-10-01", text: "A", done: false });
});

test("unsupported settings fall back to safe defaults", () => {
  assert.deepEqual(parseSettings({}), { name: "", clockFormat: "24", background: "landscape" });
  assert.deepEqual(parseSettings({ name: "Ada", clockFormat: "12", background: "night" }), { name: "Ada", clockFormat: "12", background: "night" });
  assert.deepEqual(parseSettings({ name: {}, clockFormat: "13", background: "url(evil)" }), { name: "", clockFormat: "24", background: "landscape" });
});

test("daily thoughts remain stable for a calendar day", () => {
  assert.equal(dailyThought(date(0)), dailyThought(date(23, 59)));
  assert.notEqual(dailyThought(date(12)), dailyThought(new Date(2026, 9, 2, 12)));
});

test("extension points to packaged assets and requests no permissions", () => {
  const root = new URL("../extension/", import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL("manifest.json", root), "utf8"));
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.chrome_url_overrides.newtab, "newtab.html");
  assert.equal(manifest.permissions, undefined);
  assert.equal(manifest.host_permissions, undefined);
  assert.match(manifest.content_security_policy.extension_pages, /connect-src 'none'/);
  for (const file of [manifest.chrome_url_overrides.newtab, ...Object.values(manifest.icons), "assets/lake.jpg", "newtab.css", "newtab.js", "model.js"]) {
    assert.ok(existsSync(new URL(file, root)), `Missing bundled asset: ${file}`);
  }
});
