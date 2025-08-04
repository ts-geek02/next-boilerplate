import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      prettier: prettier,
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',

      // Naming Conventions
      '@typescript-eslint/naming-convention': [
        'error',
        // Enforce camelCase for variables and functions
        {
          selector: ['variable', 'function'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          filter: {
            regex:
              '^(page|layout|loading|error|not-found|global-error|RootLayout|Home|UserProfile)$',
            match: false,
          },
        },
        // Enforce PascalCase for classes, interfaces, and type aliases
        {
          selector: ['class', 'interface', 'typeAlias'],
          format: ['PascalCase'],
        },
        // Enforce camelCase for object properties
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase'],
        },
        // Allow specific patterns for Next.js files
        {
          selector: 'variable',
          filter: {
            regex: '^(page|layout|loading|error|not-found|global-error)$',
            match: true,
          },
          format: null,
        },
      ],

      // Component naming conventions
      'react/jsx-pascal-case': 'error',
      'react/jsx-no-duplicate-props': 'error',

      // Import/Export naming
      'import/no-anonymous-default-export': 'error',
      'import/named': 'error',

      // Variable naming
      'id-length': [
        'error',
        { min: 2, exceptions: ['i', 'j', 'k', 'x', 'y', 'z'] },
      ],
      'no-underscore-dangle': 'error',

      // Function naming
      'func-names': 'error',

      // Class naming - disable for Next.js components
      'new-cap': 'off',

      // Additional TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',
    },
  },
];

export default eslintConfig;
