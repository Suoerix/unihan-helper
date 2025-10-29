export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-less',
        'stylelint-prettier/recommended',
    ],
    plugins: ['stylelint-less', 'stylelint-no-unsupported-browser-features'],
    rules: {
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
            },
        ],
        'selector-class-pattern': null,
    },
};
