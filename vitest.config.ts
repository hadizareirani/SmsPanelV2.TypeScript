import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: [
      'node_modules/',
      'lib/',
      '**/*.integration.test.ts',  // Exclude integration tests by default
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'lib/',
        'examples.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '**/*.integration.test.ts',
      ],
    },
  },
});
