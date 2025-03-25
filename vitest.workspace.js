import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vitest.config.js",
    test: {
      include: ["**/*.node.test.{jsx, js}"],
      name: "happy-dom",
      environment: "happy-dom",
    }
  },
  {
    extends: "./vitest.config.js",
    test: {
      setupFiles: ['vitest-browser-react'],
      include: ["**/*.browser.test.{jsx, js}"],
      name: "browser",
      browser: {
        provider: "playwright",
        enabled: true,
        name: "firefox",
      }
    }
  }
 ])
