import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["lib/__tests__/**/*.test.ts", "lib/__tests__/**/*.test.tsx"],
  },
});
