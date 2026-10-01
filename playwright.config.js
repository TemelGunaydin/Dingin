import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "newtab.spec.js",
  workers: 1,
  timeout: 30_000,
  reporter: "list",
});
