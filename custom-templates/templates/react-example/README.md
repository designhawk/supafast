# Infineon React Starter

A starter template using Infineon Design System web components with React.

## How it works

This template includes the Infineon Design System as local web components in the `ui/dist` folder. The components are registered in `src/main.tsx` using the Stencil loader.

## Usage

Components are used as native web elements (not React components):

```tsx
<ifx-button variant="primary">Click me</ifx-button>
<ifx-card>
  <div slot="header">Card Title</div>
  <p>Card content</p>
</ifx-card>
```

## Available Components

- `<ifx-button>` - Buttons (primary, secondary, ghost, danger)
- `<ifx-card>` - Card container
- `<ifx-text-field>` - Text input
- `<ifx-checkbox>` - Checkbox
- And many more...

## Local Components

The Infineon components are bundled locally in `ui/dist/` - no npm package required!
