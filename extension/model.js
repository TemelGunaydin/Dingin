export const BACKGROUNDS = ["landscape", "dusk", "night"];

export const KEYS = {
  name: "dingin.name",
  clockFormat: "dingin.clock-format",
  background: "dingin.background",
  focus: "dingin.focus",
};

const THOUGHTS = [
  "Her şeyi değil, bugün önemli olanı yap.",
  "Küçük bir adım da bir başlangıçtır.",
  "Biraz boşluk bırak. Güzel şeyler orada büyür.",
  "Acele etmeden de ilerleyebilirsin.",
  "Bugünün ritmini kendin seç.",
  "Dikkatini verdiğin yerde hayat büyür.",
  "Bazen en iyi başlangıç, derin bir nefestir.",
];

export function cleanText(value, limit) {
  if (typeof value !== "string") return "";
  return Array.from(value.replace(/\s+/gu, " ").trim()).slice(0, limit).join("");
}

// Use the local calendar, not UTC: a new day starts at the user's midnight.
export function dayKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function clockValue(date, format = "24") {
  const hours = date.getHours();
  return {
    time: `${String(format === "12" ? hours % 12 || 12 : hours).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
    period: format === "12" ? (hours < 12 ? "ÖÖ" : "ÖS") : "",
  };
}

export function greeting(date, name = "") {
  const hour = date.getHours();
  const text = hour >= 5 && hour < 12 ? "Günaydın" : hour >= 12 && hour < 18 ? "İyi günler" : hour >= 18 && hour < 23 ? "İyi akşamlar" : "İyi geceler";
  const safeName = cleanText(name, 32);
  return safeName ? `${text}, ${safeName}.` : `${text}.`;
}

export function dailyThought(date) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  return THOUGHTS[((day % THOUGHTS.length) + THOUGHTS.length) % THOUGHTS.length];
}

export function parseFocus(raw, today) {
  try {
    const value = JSON.parse(raw);
    if (!value || value.day !== today || typeof value.text !== "string") return null;
    const text = cleanText(value.text, 160);
    return text ? { day: today, text, done: value.done === true } : null;
  } catch {
    return null;
  }
}

export function parseSettings(values) {
  return {
    name: cleanText(values.name, 32),
    clockFormat: values.clockFormat === "12" ? "12" : "24",
    background: BACKGROUNDS.includes(values.background) ? values.background : "landscape",
  };
}
