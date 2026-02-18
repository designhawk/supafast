// dropdown-trigger-button.tsx
import { h } from "@stencil/core";
export class DropdownItem {
    isOpen = false;
    render() {
        return h("slot", { key: 'b60e214835055b86c02d42eb28a71ac0ad629c7c' });
    }
    static get is() { return "ifx-dropdown-trigger"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["dropdown-trigger.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["dropdown-trigger.css"]
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
            }
        };
    }
}
//# sourceMappingURL=dropdown-trigger.js.map
