import resolve from 'rollup-plugin-node-resolve';

export default {
  input: ['pricing-selector-component.'],
  output: {
    file: 'pricing-selector-component.js',
    format: 'iife'
  },
  plugins: [
    resolve()
  ]
};
