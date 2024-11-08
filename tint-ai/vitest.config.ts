import dotenv  from 'dotenv';
import { defineConfig } from 'vitest/config'
import { resolve } from "node:path";

dotenv.configDotenv({ path: './.env.test' });

export default defineConfig({
    test: {
        globals: true,
        setupFiles: [
            './src/tests/cleanPersistedData.ts',
        ],
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
})