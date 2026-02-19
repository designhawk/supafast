# AI Agent Guidelines

This is a React template using Infineon Design System components.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Type check

## Project Structure

- `src/client/` - React frontend
  - `components/` - React components
  - `routes/` - TanStack Router routes
  - `styles/` - Global styles
- `src/server/` - Express server

## Key Dependencies

- `@infineon/infineon-design-system-react` - Infineon UI components
- `@tanstack/react-router` - Routing
- `@tanstack/react-query` - Data fetching

## Using Infineon Components

Import components:
```tsx
import { IfxButton, IfxCard, IfxHeading } from "@infineon/infineon-design-system-react";
```

Components are already initialized in `main.tsx` with `defineCustomElements(window)`.

## Documentation

- [Infineon Design System Storybook](https://infineon.github.io/infineon-design-system-stencil/)
