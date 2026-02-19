# Infineon React Example

A React template using the Infineon Design System components.

## Features

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Infineon Design System React components

## Infineon Design System

This template uses the [Infineon Design System Stencil](https://github.com/Infineon/infineon-design-system-stencil) React wrappers.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Usage

Import components from the Infineon Design System:

```tsx
import { IfxButton, IfxCard, IfxHeading } from "@infineon/infineon-design-system-react";
```

Initialize the design system in your entry point:

```tsx
import { defineCustomElements } from "@infineon/infineon-design-system-react";
defineCustomElements(window);
```

## Documentation

- [Infineon Design System Storybook](https://infineon.github.io/infineon-design-system-stencil/)
- [React Integration Guide](https://infineon.github.io/infineon-design-system-stencil/storybook/?path=/docs/setup-installation-framework-integration-react--development)
