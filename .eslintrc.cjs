module.exports = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        Promise: "readonly",
    },
    parser: "@typescript-eslint/parser",
    extends: ["standard-with-typescript", "plugin:vue/vue3-essential"],

    plugins: ["@typescript-eslint"],
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["tsconfig.json"],
    },
    plugins: ["vue"],
    rules: {},
};
