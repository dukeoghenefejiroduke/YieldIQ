import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        poolOptions: {
            threads: {
                singleThread: true,
            },
        },
    },
});
//# sourceMappingURL=vitest.config.js.map