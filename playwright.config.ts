import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "NEXT_PUBLIC_SUPABASE_URL=\"https://test.supabase.co\" NEXT_PUBLIC_SUPABASE_ANON_KEY=\"test\" NEXT_PUBLIC_API_MOCKING=\"enabled\" npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
