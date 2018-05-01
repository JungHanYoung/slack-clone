export default {
    extends: "airbnb",
    plugins: [
        "react",
        "jsx-a11y",
        "import"
    ],
    rules: {
        "react/jsx-filename-extension": 0,
        "no-undef": 0
    },
    globals: {
        document: 1,
    },
}