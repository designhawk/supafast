import "react";

// ============================================================================
// INFINEON DESIGN SYSTEM - ALL AVAILABLE COMPONENTS
// ============================================================================
// These web components are registered globally via main.tsx
// Use kebab-case: <ifx-button> not <IfxButton>
// All components are in the local ui/dist/ folder - NO npm install needed
// ============================================================================

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // Layout & Containers
      "ifx-card": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-accordion": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-tabs": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-modal": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          onIfxClose?: () => void;
        },
        HTMLElement
      >;

      // Buttons
      "ifx-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "primary" | "secondary" | "ghost" | "danger";
          size?: "s" | "m" | "l" | "xl";
          disabled?: boolean;
          icon?: string;
          onClick?: () => void;
        },
        HTMLElement
      >;
      "ifx-icon-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          icon: string;
          variant?: "primary" | "secondary" | "ghost" | "danger";
          size?: "s" | "m" | "l";
          disabled?: boolean;
        },
        HTMLElement
      >;

      // Form Inputs
      "ifx-text-field": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          value?: string;
          disabled?: boolean;
          readonly?: boolean;
          error?: boolean;
          errorMessage?: string;
          label?: string;
          onIfxInput?: (event: CustomEvent) => void;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-textarea": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          value?: string;
          rows?: number;
          disabled?: boolean;
          readonly?: boolean;
          label?: string;
          onIfxInput?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-checkbox": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          value?: string;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-checkbox-group": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string[];
          direction?: "horizontal" | "vertical";
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-radio-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          value?: string;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-radio-button-group": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          direction?: "horizontal" | "vertical";
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-select": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          value?: string;
          disabled?: boolean;
          error?: boolean;
          errorMessage?: string;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-search-field": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placeholder?: string;
          value?: string;
          disabled?: boolean;
          onIfxInput?: (event: CustomEvent) => void;
          onIfxSearch?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-slider": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          min?: number;
          max?: number;
          step?: number;
          disabled?: boolean;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-switch": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-date-picker": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          min?: string;
          max?: string;
          disabled?: boolean;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-file-upload": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          accept?: string;
          multiple?: boolean;
          disabled?: boolean;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;

      // Data Display
      "ifx-list-group": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-chip": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "primary" | "secondary";
          size?: "s" | "m";
          removable?: boolean;
          onIfxRemove?: () => void;
        },
        HTMLElement
      >;
      "ifx-badge": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "primary" | "secondary" | "success" | "warning" | "danger";
        },
        HTMLElement
      >;
      "ifx-progress-bar": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          max?: number;
          size?: "s" | "m" | "l";
        },
        HTMLElement
      >;
      "ifx-spinner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          size?: "s" | "m" | "l";
          variant?: "primary" | "secondary";
        },
        HTMLElement
      >;
      "ifx-status": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "success" | "warning" | "error" | "info";
          size?: "s" | "m";
        },
        HTMLElement
      >;
      "ifx-tooltip": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          text: string;
          position?: "top" | "right" | "bottom" | "left";
        },
        HTMLElement
      >;
      "ifx-popover": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          placement?: "top" | "right" | "bottom" | "left";
          onIfxClose?: () => void;
        },
        HTMLElement
      >;

      // Navigation
      "ifx-breadcrumb": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-dropdown": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          label?: string;
          disabled?: boolean;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-pagination": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          totalItems: number;
          itemsPerPage?: number;
          currentPage?: number;
          onIfxPageChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-stepper": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          activeStep?: number;
          orientation?: "horizontal" | "vertical";
        },
        HTMLElement
      >;

      // Tables
      "ifx-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          striped?: boolean;
          bordered?: boolean;
          hover?: boolean;
        },
        HTMLElement
      >;
      "ifx-table-row": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-table-cell": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      // Feedback
      "ifx-alert": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "success" | "warning" | "error" | "info";
          dismissible?: boolean;
          onIfxDismiss?: () => void;
        },
        HTMLElement
      >;
      "ifx-notification": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: "success" | "warning" | "error" | "info";
          title?: string;
          message?: string;
        },
        HTMLElement
      >;

      // Icons
      "ifx-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          icon: string;
          size?: "s" | "m" | "l" | "xl";
        },
        HTMLElement
      >;

      // Other
      "ifx-link": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          href?: string;
          target?: string;
          disabled?: boolean;
        },
        HTMLElement
      >;
      "ifx-segmented-control": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-content-switcher": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          onIfxChange?: (event: CustomEvent) => void;
        },
        HTMLElement
      >;
      "ifx-action-list": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ifx-download": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          href: string;
          filename?: string;
        },
        HTMLElement
      >;
    }
  }
}
