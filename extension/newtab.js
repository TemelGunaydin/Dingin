import { KEYS, dayKey, clockValue, greeting, dailyThought, cleanText, parseFocus, parseSettings } from "./model.js";

const $ = (id) => document.getElementById(id);
const memory = new Map();
const dateFormatter = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", weekday: "long" });
const focusForm = $("focus-form");
const focusInput = $("focus-input");
const focusResult = $("focus-result");
const focusCheckbox = $("focus-done");
const dialog = $("settings-dialog");
const settingsForm = $("settings-form");
let timer;
let editing = false;

function read(key) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) memory.delete(key);
    else memory.set(key, value);
    return value;
  } catch {
    $("storage-notice").hidden = false;
    return memory.get(key) ?? null;
  }
}

function write(key, value) {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    $("storage-notice").hidden = false;
  }
}

function loadSettings() {
  return parseSettings({ name: read(KEYS.name), clockFormat: read(KEYS.clockFormat), background: read(KEYS.background) });
}

let settings = loadSettings();
let today = dayKey(new Date());
let focus = parseFocus(read(KEYS.focus), today);

function announce(message) {
  $("status").textContent = message;
}

function renderScene() {
  document.body.dataset.background = settings.background;
  const landscape = settings.background === "landscape";
  $("scene-name").textContent = landscape ? "Braies Gölü, İtalya" : settings.background === "dusk" ? "Alacakaranlık" : "Gecenin sessizliği";
  $("photo-credit").hidden = !landscape;
  $("scene-note").hidden = landscape;
}

function renderFocus() {
  const showEditor = !focus || editing;
  focusForm.hidden = !showEditor;
  focusResult.hidden = showEditor;
  $("focus-cancel").hidden = !focus || !editing;
  $("focus-remove").hidden = !focus || !editing;
  $("focus-hint").textContent = editing ? "Değiştir ve Enter’a bas" : "Yaz ve Enter’a bas";
  document.querySelector(".focus").classList.toggle("is-done", Boolean(focus?.done));
  if (focus) {
    $("focus-text").textContent = focus.text;
    focusCheckbox.checked = focus.done;
  }
  // Do not replace an unsaved draft when another tab updates storage.
}

function refreshDay(now) {
  const day = dayKey(now);
  if (day === today) return false;
  today = day;
  focus = parseFocus(read(KEYS.focus), today);
  editing = false;
  focusInput.value = "";
  renderFocus();
  return true;
}

function tick() {
  const now = new Date();
  refreshDay(now);
  const clock = clockValue(now, settings.clockFormat);
  if ($("clock").textContent !== clock.time) $("clock").textContent = clock.time;
  $("clock").dateTime = `${today}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  $("clock").setAttribute("aria-label", `Saat ${clock.time}${clock.period ? ` ${clock.period}` : ""}`);
  $("clock-period").textContent = clock.period;
  $("clock-period").hidden = !clock.period;
  $("date").textContent = dateFormatter.format(now);
  $("greeting").textContent = greeting(now, settings.name);
  $("daily-thought").textContent = dailyThought(now);
}

function saveFocus(value) {
  focus = value;
  write(KEYS.focus, value ? JSON.stringify(value) : null);
  editing = false;
  focusInput.value = "";
  renderFocus();
}

focusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = cleanText(focusInput.value, 160);
  // Read the day at submission too, including when a suspended tab wakes up.
  tick();
  if (!text) {
    if (editing && focus) {
      saveFocus(null);
      announce("Günlük odak kaldırıldı.");
    }
    return;
  }
  saveFocus({ day: today, text, done: false });
  focusCheckbox.focus();
  announce("Günlük odağın kaydedildi.");
});

focusCheckbox.addEventListener("change", () => {
  const done = focusCheckbox.checked;
  if (refreshDay(new Date()) || !focus) return;
  saveFocus({ ...focus, done });
  announce(done ? "Günlük odağın tamamlandı. Eline sağlık!" : "Günlük odağın tekrar açık.");
});

$("focus-edit").addEventListener("click", () => {
  if (refreshDay(new Date()) || !focus) return;
  editing = true;
  focusInput.value = focus.text;
  renderFocus();
  focusInput.focus();
  focusInput.select();
});

function cancelFocusEdit() {
  editing = false;
  focusInput.value = "";
  renderFocus();
  if (focus) $("focus-edit").focus();
}

$("focus-cancel").addEventListener("click", cancelFocusEdit);
focusInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && editing) {
    event.preventDefault();
    cancelFocusEdit();
  }
});
$("focus-remove").addEventListener("click", () => {
  // Never delete a new day's focus through yesterday's editor.
  if (refreshDay(new Date())) return;
  saveFocus(null);
  focusInput.focus();
  announce("Günlük odak kaldırıldı.");
});

$("settings-open").addEventListener("click", () => {
  $("name-input").value = settings.name;
  settingsForm.elements["clock-format"].value = settings.clockFormat;
  settingsForm.elements.background.value = settings.background;
  dialog.showModal();
});

$("settings-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  settings = parseSettings({
    name: $("name-input").value,
    clockFormat: settingsForm.elements["clock-format"].value,
    background: settingsForm.elements.background.value,
  });
  write(KEYS.name, settings.name);
  write(KEYS.clockFormat, settings.clockFormat);
  write(KEYS.background, settings.background);
  renderScene();
  tick();
  dialog.close();
  announce("Tercihlerin kaydedildi.");
});

window.addEventListener("storage", (event) => {
  if (event.key === null || Object.values(KEYS).includes(event.key)) {
    settings = loadSettings();
    refreshDay(new Date());
    focus = parseFocus(read(KEYS.focus), today);
    renderScene();
    renderFocus();
    tick();
  }
});

function startClock() {
  clearInterval(timer);
  tick();
  if (!document.hidden) timer = setInterval(tick, 1000);
}
document.addEventListener("visibilitychange", startClock);
window.addEventListener("pageshow", startClock);

renderScene();
renderFocus();
startClock();
