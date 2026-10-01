import { test as base, expect, chromium } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";

const bravePath = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const executablePath = process.env.BROWSER_PATH || (existsSync(bravePath) ? bravePath : undefined);
const extensionPath = path.resolve("extension");
const fixedTime = new Date("2026-10-01T07:00:00Z"); // 10:00 in Istanbul

const test = base.extend({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext("", {
      ...(executablePath ? { executablePath } : { channel: "chromium" }),
      headless: true,
      viewport: { width: 1440, height: 900 },
      timezoneId: "Europe/Istanbul",
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        "--no-first-run",
        "--disable-component-update",
        "--disable-background-networking",
      ],
    });
    await context.setOffline(true);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.clock.install({ time: fixedTime });
    await page.clock.pauseAt(fixedTime);
    await page.goto("chrome://newtab/");
    await expect(page.locator("#clock")).toHaveText("10:00");
    await use(page);
  },
});

async function addFocus(page, text = "Kitabımdan on sayfa okumak") {
  await page.getByLabel("Bugün senin için önemli olan ne?").fill(text);
  await page.getByRole("button", { name: "Odağı kaydet", exact: true }).click();
  await expect(page.locator("#focus-text")).toHaveText(text);
}

async function openSettings(page) {
  await page.getByRole("button", { name: "Kişiselleştir" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

test("Brave's actual new tab runs offline, with no external requests or errors", async ({ page, context }) => {
  const external = [];
  const errors = [];
  context.on("request", (request) => {
    if (/^https?:/.test(request.url())) external.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page.locator("#clock")).toHaveText("10:00");
  await expect(page.getByRole("heading", { name: "Günaydın." })).toBeVisible();
  await expect(page.locator("#date")).toContainText("1 Ekim");
  const imageLoaded = await page.evaluate(async () => {
    const image = new Image();
    image.src = new URL("assets/lake.jpg", location.href).href;
    await image.decode();
    return image.naturalWidth > 0;
  });
  expect(imageLoaded).toBe(true);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
  // Keep a local preview for visual inspection, outside the extension package.
  await page.screenshot({ path: "test-results/dingin-desktop.png" });
});

test("focus can be saved, completed, edited, cancelled and removed", async ({ page }) => {
  await addFocus(page);
  await page.locator("#focus-done").check();
  await expect(page.locator("#completion")).toBeVisible();
  await page.reload();
  await expect(page.locator("#focus-done")).toBeChecked();
  await page.getByRole("button", { name: "Odağı düzenle" }).click();
  await page.locator("#focus-input").fill("Yarım kalan işi bitirmek");
  await page.locator("#focus-input").press("Enter");
  await expect(page.locator("#focus-text")).toHaveText("Yarım kalan işi bitirmek");
  await expect(page.locator("#focus-done")).not.toBeChecked();
  await page.getByRole("button", { name: "Odağı düzenle" }).click();
  await page.locator("#focus-input").fill("Kaydedilmemeli");
  await page.locator("#focus-input").press("Escape");
  await expect(page.locator("#focus-text")).toHaveText("Yarım kalan işi bitirmek");
  await page.getByRole("button", { name: "Odağı düzenle" }).click();
  await page.getByRole("button", { name: "Kaldır", exact: true }).click();
  await expect(page.locator("#focus-form")).toBeVisible();
  await page.reload();
  await expect(page.locator("#focus-form")).toBeVisible();
});

test("personalization persists, and Escape cancels unsaved preferences", async ({ page }) => {
  await openSettings(page);
  await page.getByLabel("Sana nasıl seslenelim?").fill("Temel");
  await page.getByText("12 saat", { exact: true }).click();
  await page.getByText("Alacakaranlık", { exact: true }).click();
  await page.getByRole("button", { name: "Kaydet", exact: true }).click();
  await expect(page.locator("#greeting")).toHaveText("Günaydın, Temel.");
  await expect(page.locator("#clock-period")).toHaveText("ÖÖ");
  await expect(page.locator("body")).toHaveAttribute("data-background", "dusk");
  await expect(page.locator("#photo-credit")).toBeHidden();
  await page.reload();
  await expect(page.locator("#greeting")).toHaveText("Günaydın, Temel.");
  await expect(page.locator("body")).toHaveAttribute("data-background", "dusk");
  await openSettings(page);
  await page.getByLabel("Sana nasıl seslenelim?").fill("Kaydedilmemeli");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.locator("#settings-open")).toBeFocused();
  await expect(page.locator("#greeting")).toHaveText("Günaydın, Temel.");
});

test("clock advances and daily focus resets at local midnight", async ({ page }) => {
  await page.clock.resume();
  await page.clock.pauseAt(new Date("2026-10-01T20:59:59Z"));
  await expect(page.locator("#clock")).toHaveText("23:59");
  await addFocus(page);
  await page.clock.runFor(2000);
  await expect(page.locator("#clock")).toHaveText("00:00");
  await expect(page.locator("#date")).toContainText("2 Ekim");
  await expect(page.locator("#focus-form")).toBeVisible();
  await expect(page.locator("#focus-input")).toHaveValue("");
  await page.reload();
  await expect(page.locator("#focus-form")).toBeVisible();
});

test("separate new tabs synchronize saved focus and preferences", async ({ page, context }) => {
  const other = await context.newPage();
  await other.goto("chrome://newtab/");
  await expect(other.locator("#clock")).toHaveText("10:00");
  // Preserve the first tab's unsaved draft when the second tab saves.
  await page.locator("#focus-input").fill("Benim taslağım");
  await addFocus(other, "Birlikte güncellenen odak");
  await expect(page.locator("#focus-text")).toHaveText("Birlikte güncellenen odak");
  await other.locator("#focus-done").check();
  await expect(page.locator("#focus-done")).toBeChecked();
  await openSettings(other);
  await other.getByLabel("Sana nasıl seslenelim?").fill("Ada");
  await other.getByRole("button", { name: "Kaydet", exact: true }).click();
  await expect(page.locator("#greeting")).toHaveText("Günaydın, Ada.");
  await page.getByRole("button", { name: "Odağı düzenle" }).click();
  await page.locator("#focus-input").fill("Kaydedilmemiş düzenleme");
  await openSettings(other);
  await other.getByText("Gece", { exact: true }).click();
  await other.getByRole("button", { name: "Kaydet", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-background", "night");
  await expect(page.locator("#focus-input")).toHaveValue("Kaydedilmemiş düzenleme");
  await other.close();
});

test("corrupt storage and HTML-looking input cannot break or inject the page", async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem("dingin.focus", "not json");
    localStorage.setItem("dingin.background", "invalid");
    localStorage.setItem("dingin.clock-format", "invalid");
  });
  await page.reload();
  await expect(page.locator("#focus-form")).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-background", "landscape");
  const text = '<img src=x onerror="window.injected=true">';
  await addFocus(page, text);
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
  await expect(page.locator("#focus-text img")).toHaveCount(0);
});

test("blocked storage keeps the page usable and explains the limitation", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Blocked", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); };
    Storage.prototype.removeItem = () => { throw new DOMException("Blocked", "SecurityError"); };
  });
  await page.reload();
  await expect(page.locator("#clock")).toHaveText("10:00");
  await expect(page.locator("#storage-notice")).toBeVisible();
  await addFocus(page);
  await page.locator("#focus-done").check();
  await expect(page.locator("#completion")).toBeVisible();
});

test("narrow viewports and long input do not overflow, and settings stay keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await addFocus(page, "Uzun bir odağın da rahatça okunması gerekiyor ".repeat(3).trim());
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await openSettings(page);
  await expect(page.locator("#name-input")).toBeFocused();
  await page.screenshot({ path: "test-results/dingin-mobile-settings.png" });
  await page.keyboard.press("Escape");
  await expect(page.locator("#settings-open")).toBeFocused();
  await page.screenshot({ path: "test-results/dingin-mobile.png" });
});
