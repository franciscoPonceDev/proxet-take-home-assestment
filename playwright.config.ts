import { defineConfig } from "@playwright/test";

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL,
  },
  ...(isCI
    ? {}
    : {
        webServer: {
          command: "npm run dev",
          url: baseURL,
          reuseExistingServer: !isCI,
        },
      }),
});
