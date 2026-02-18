// dropdown-trigger-button.tsx
import { h } from "@stencil/core";
export class DropdownItem {
    isOpen = false;
    theme = "default";
    variant;
    size = "m";
    disabled;
    hideArrow = false;
    render() {
        return (h("ifx-button", { key: '42d63aa62d05cfc4bbbae6cf3e3cc2ffd95c0ab3', variant: this.variant, theme: this.theme, size: this.size, disabled: this.disabled, class: "dropdown-trigger-button" }, h("slot", { key: '0227f429aa2ca7e837afc06fdf7908eee46fa843' }), !this.hideArrow && (h("ifx-icon", { key: '8c20da11884d2067d6cfca45d1231fadab137c3f', icon: "chevron-down-16", class: `icon${this.isOpen ? " rotate" : ""}` }))));
    }
    static get is() { return "ifx-dropdown-trigger-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["dropdown-trigger-button.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["dropdown-trigger-button.css"]
        };
    }
    static get properties() {
        return {
            "isOpen": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "is-open",
                "defaultValue": "false"
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"default\" | \"danger\" | \"inverse\"",
                    "resolved": "\"danger\" | \"default\" | \"inverse\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "theme",
                "defaultValue": "\"default\""
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"primary\"",
                    "resolved": "\"primary\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "variant"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\"",
                    "resolved": "\"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "\"m\""
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled"
            },
            "hideArrow": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "hide-arrow",
                "defaultValue": "false"
            }
        };
    }
}
//# sourceMappingURL=dropdown-trigger-button.js.map
