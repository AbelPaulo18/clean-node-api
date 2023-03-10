export default {
  roots: ["<rootDir>"],
  rootDir: "./",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
