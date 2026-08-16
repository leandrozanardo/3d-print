/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  // Tests import the package by name in some places; resolve to sources, not dist.
  moduleNameMapper: {
    "^@fix-my-print/knowledge-compiler$": "<rootDir>/src/index.ts",
  },
};
