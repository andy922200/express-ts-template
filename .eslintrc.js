module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    ignorePatterns: ["dist/*", "node_modules"],
    rules: {
        indent: [2, 4],
        quotes: [2, "double"],
        semi: [2, "never"],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-use-before-define": [2, "nofunc"],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "comma-spacing": [
            2,
            {
                before: false,
                after: true,
            },
        ],
        "key-spacing": [
            1,
            {
                beforeColon: false,
                afterColon: true,
            },
        ],
        "import/first": [0]
    },
}