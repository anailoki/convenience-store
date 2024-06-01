import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // you can use a list of glob patterns to define your workspaces
  // Vitest expects a list of config files
  // or directories where there is a config file
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  // you can even run the same tests,
  // but with different configs in the same "vitest" process
  {
    test: {
      globals: true,
      name: 'jsdom',
      environment: 'jsdom',
      include: ['**/*.test.tsx', '**/*.test.ts'],
      setupFiles: ['./testSetup.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './src/shared',
      environment: 'node',
      include: ['**/*.test.ts'],
    },
  },
]);
