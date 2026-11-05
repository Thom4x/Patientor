import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';

const isCI = Boolean(
  (globalThis as { process?: { env?: { CI?: string } } }).process?.env?.CI,
);
const projectDir = resolve(process.cwd(), '..', 'patientor');

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run dev',
      cwd: '../patientor/backend',
      url: 'http://localhost:3001/api/ping',
      reuseExistingServer: !isCI,
    },
    {
      command: 'npm run dev',
      cwd: '../patientor/frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !isCI,
      env: {
        VITE_API_BASE_URL: 'http://localhost:3001/api',
      },
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
