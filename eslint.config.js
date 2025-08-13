import tsParser from '@typescript-eslint/parser';
import ts from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPluginRaw from 'eslint-plugin-import';

export default [
  { ignores: ['dist/**', 'build/**', 'node_modules/**'] },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': ts,
      react,
      'react-hooks': reactHooks,
      import: importPluginRaw.default ?? importPluginRaw,
    },
    settings: {
      react: { version: 'detect' },
      'import/parser': 'babel-eslint',
      'import/resolver': {
        'eslint-import-resolver-custom-alias': {
          alias: {
            '@styles': './src/styles',
            '@assets': './assets',
          },
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.mjs',
            '.json',
            '.eot',
            '.png',
            '.jpg',
            '.jpeg',
            '.webp',
            '.woff',
            '.svg',
            '.woff2',
            '.ttf',
            '.d.ts',
            '.scss',
            '.css',
          ],
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': 'error',
    },
  },
];
