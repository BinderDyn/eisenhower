module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    roots: ['src/components', 'src/stores'],
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        // '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    testURL: 'http://localhost/',
}