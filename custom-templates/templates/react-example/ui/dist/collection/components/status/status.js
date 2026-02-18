import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Status {
    el;
    label;
    border = false;
    color = "orange-500";
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-status", await framework);
        }
    }
    render() {
        const effectiveColor = this.color?.trim() ? this.color : "orange-500";
        const containerClass = this.border
            ? `container border-${effectiveColor}`
            : "container no-border";
        return (h("div", { key: '6348c96a80c7af32942af500926b2e8126bc1497', role: "status", class: containerClass }, h("span", { key: 'e4936e37f36f76d8d840c8f7f4f8446172c4f167', class: `dot ${effectiveColor}` }), h("p", { key: '3151bc179108afed160cfc559a2c9dd958c62971', class: "text" }, this.label)));
    }
    static get is() { return "ifx-status"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["status.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["status.css"]
        };
    }
    static get properties() {
        return {
            "label": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "attribute": "label"
            },
            "border": {
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
                "attribute": "border",
                "defaultValue": "false"
            },
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
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
                "attribute": "color",
                "defaultValue": "\"orange-500\""
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=status.js.map
