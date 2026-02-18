# AGENTS.md

This file provides guidelines for AI coding agents working in the Quests repository.

## Build, Lint & Test Commands

### Running Tests

```bash
# Run all tests
pnpm test

# Run a single test file
pnpm test path/to/file.test.ts

# Run tests in a specific package
pnpm test packages/workspace/src/lib/generate-folder-name.test.ts
```

### Lint & Format

```bash
# Check all (format, lint, types, spelling, unused, etc.)
pnpm check

# Fix formatting
pnpm fix:format
# or
pnpm format

# Fix linting issues
pnpm lint:fix

# Run full validation (checks + tests)
pnpm check-and-test
```

### Type Checking

```bash
# Check types (don't run tsc manually, use built-in diagnostics)
pnpm check:types
```

### Development

```bash
# Start studio in dev mode
pnpm dev:studio

# Build all packages
pnpm build
```

## Code Style Guidelines

### TypeScript

- **NEVER use non-null assertions (`!`)** - Always use proper type guards or optional chaining
- **Never use `as any`** - Avoid casting unless necessary; add a comment explaining why if you must
- **Avoid `any` type** - Use proper typing
- **Use kebab-case for filenames** (e.g., `my-component.tsx`)
- **Prefer non-default exports** whenever possible
- **Prefer inline type declarations** when short and not exported
- **Prefer object types for functions** with multiple parameters: `({ a, b }: { a: number, b: number }) => number`
- **Avoid `Array#reduce()`** - Use `.map`, `.filter`, or `for-of` instead
- **Don't define return types** unless necessary
- **Use `z.output<typeof Schema>` over `z.infer<typeof Schema>`** for Zod types

### React

- **Avoid `useEffect`** whenever possible in favor of declarative logic
- **Use inline types for component props**, not interfaces
- **React Compiler is enabled** - Basic memoization (`memo`, `useMemo`, `useCallback`) is not needed
- **Use `cn` helper** from `@/client/lib/utils` instead of template literals for className

### Tailwind CSS

- Use `size-` over `w-` and `h-` when width and height are the same
- Use `gap-x-` or `gap-y-` over `space-x` or `space-y` for gaps
- Use shadcn Tailwind colors (e.g., `bg-background` instead of `bg-white`)
- **No `cursor: pointer`** for links (desktop app behavior)

### Imports

- **Use type imports**: `import { type Foo } from "..."` (inline type imports required)
- Sort order is handled by ESLint perfectionist plugin - don't manually sort
- External imports before internal imports
- The `radashi` library is available for lodash-style utilities

### Naming Conventions

- **Filenames**: kebab-case (e.g., `external-link.tsx`)
- **Components**: PascalCase (e.g., `ExternalLink`)
- **Functions/variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants

### Error Handling

- **No console.log in production code** - Use proper error handling
- Scripts in `scripts/` folder can use `console.log` (disabled rule)
- Use structured error handling with proper types

### Comments

- **Only add comments if explicitly asked**
- **Never remove existing comments**
- **Never use em dashes** in text
- **No JSX section comments** like `{/* Header */}`

### Testing

- Use `it.each` for testing repetitive cases
- Generate empty `toMatchInlineSnapshot` and let the test run fill it in
- Mock files appropriately (e.g., `vi.mock("electron")` in setup)

## Project Structure

### Monorepo Packages

- `apps/studio/` - Electron desktop app (React 19 + TanStack Router)
- `packages/workspace/` - Core AI agents and workspace management
- `packages/ai-gateway/` - Local AI gateway
- `packages/shim-client/` - Injected control plane for user apps
- `packages/components/` - Shared UI components
- `packages/shared/` - Shared utilities and schemas

### Studio Client (`apps/studio/src/client/`)

- Uses TanStack Router for routing
- shadcn components in `@/client/components/ui`
- oRPC for communication with main process
- External links: use `<ExternalLink />` or `rpcClient.utils.openExternalLink`
- RPC calls: Use `.call()` for imperative use, `useQuery` with `.queryOptions()` for React

## Environment

- Node.js ≥ 22.16.0 required
- pnpm package manager
- TypeScript 5.9.2 with strict mode enabled
- Vitest for testing
- ESLint with TypeScript, Unicorn, and Perfectionist plugins
- Prettier for formatting
