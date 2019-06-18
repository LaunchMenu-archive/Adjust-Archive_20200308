const config = {
    // verbose: true,
    transform: {},
    rootDir: "./dist",
    testRegex: "./_tests/.*(?<!\\.helper|\\.main|\\.environment)\\.js",
    moduleFileExtensions: ["js", "jsx"],
};

module.exports = {
    projects: [
        config,
        {
            ...config,
            runner: "@jest-runner/electron/main",
            testEnvironment: "node",
            testRegex: "./_tests/.*\\.main\\.js$",
        },
        {
            ...config,
            runner: "@jest-runner/electron",
            testEnvironment: "@jest-runner/electron/environment",
            testRegex: "./_tests/.*\\.environment\\.js$",
        },
    ],
};
