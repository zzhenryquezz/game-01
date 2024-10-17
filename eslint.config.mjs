import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default tsEslint.config(
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    eslintPluginPrettierRecommended,
    ...tsEslint.configs.recommended,
    {
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    trailingComma: 'es5',
                    semi: false,
                    singleQuote: true,
                    useTabs: false,
                    quoteProps: 'consistent',
                    tabWidth: 4,
                    bracketSpacing: true,
                    arrowParens: 'always',
                    printWidth: 100,
                },
            ],
        },
    }
)
