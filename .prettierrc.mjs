export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 150,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],

  blankLines: {
    beforeFunction: 1,
    afterFunction: 1,
    beforeVariable: 1,
    afterVariable: 1,
    beforeProperty: 1,
    afterProperty: 1,
  },
  endOfLine: 'lf',
};
