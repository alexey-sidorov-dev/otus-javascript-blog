module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["./src/*.js"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["html", "text", "json"],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  testEnvironment: "jsdom",
};
