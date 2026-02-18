import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Indicator {
    el;
    filteredNumber;
    inverted = false;
    ariaLabel;
    variant = "number";
    number = 0;
    handleNumber() {
        this.filteredNumber =
            !isNaN(this.number) && this.number > 99 ? "99+" : this.number;
    }
    componentWillLoad() {
        this.handleNumber();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-indicator", await framework);
        }
    }
    componentWillUpdate() {
        this.handleNumber();
    }
    render() {
        return (h("div", { key: '897dbea43ffd2fb4d15cc1c6b109f8835e838237', "aria-label": this.ariaLabel, class: "indicator__container" }, this.variant === "number" && (h("div", { key: '0fbea4c3ab0db12c0e18fa206bc2404664497787', class: `number__container ${this.inverted ? "inverted" : ""}` }, h("div", { key: '77faab8eb00a1e3f0112fc8e107f5b48f20cef88', class: "number__wrapper" }, this.filteredNumber))), this.variant === "dot" && h("div", { key: 'd6019acf06f6e9e3120a03a6ea7307c02ce2851a', class: "dot__wrapper" })));
    }
    static get is() { return "ifx-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["indicator.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["indicator.css"]
        };
    }
    static get properties() {
        return {
            "inverted": {
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
                "attribute": "inverted",
                "defaultValue": "false"
            },
            "ariaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
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
                "attribute": "aria-label"
            },
            "variant": {
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
                "attribute": "variant",
                "defaultValue": "\"number\""
            },
            "number": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "number",
                "defaultValue": "0"
            }
        };
    }
    static get states() {
        return {
            "filteredNumber": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=indicator.js.map
