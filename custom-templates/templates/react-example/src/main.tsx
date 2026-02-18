import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// ============================================================================
// INFINEON DESIGN SYSTEM - LOCAL COMPONENTS
// ============================================================================
// Components are loaded from local ui/dist/ folder (NOT from npm or CDN)
// This registers all Infineon web components globally so you can use them anywhere:
//   <ifx-button>, <ifx-card>, <ifx-text-field>, <ifx-checkbox>, <ifx-select>, etc.
// 
// DO NOT install @infineon packages from npm - use the local components!
// ============================================================================
import { defineCustomElements } from "../ui/dist/loader/index.js";
import "../ui/dist/infineon-design-system-stencil/infineon-design-system-stencil.css";

defineCustomElements(window);
// ============================================================================

console.log("✅ Infineon Design System components loaded from local ui/dist/");
console.log("Available components: ifx-button, ifx-card, ifx-text-field, ifx-checkbox, etc.");

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
