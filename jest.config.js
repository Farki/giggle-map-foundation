module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/test"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
