module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {},
};
