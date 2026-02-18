import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class ProgressBar {
    el;
    value = 0;
    size;
    showLabel = false;
    internalValue;
    valueChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalValue = newValue;
        }
    }
    componentWillLoad() {
        this.internalValue = this.value;
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-progress-bar", await framework);
        }
    }
    render() {
        return (h("div", { key: '4859e8bf3b9e56120453678fce0081d9710a17f0', role: "progressbar", "aria-valuenow": this.internalValue, "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": `Progress: ${this.internalValue}%`, class: `progress-bar ${this.size}` }, h("div", { key: '9c009ebc9e8f465faefdb6c4f5d8c4315db43329', class: "progress", style: { width: `${this.internalValue}%` } }, this.showLabel && this.size !== "s" && this.internalValue !== 0 && (h("span", { key: '3b425746affc25e6c758aeb42b9d8bb6cc7e317d', class: "label" }, `${this.internalValue}%`)))));
    }
    static get is() { return "ifx-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["progress-bar.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["progress-bar.css"]
        };
    }
    static get properties() {
        return {
            "value": {
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
                "attribute": "value",
                "defaultValue": "0"
            },
            "size": {
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
                "attribute": "size"
            },
            "showLabel": {
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
                "attribute": "show-label",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "internalValue": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChanged"
            }];
    }
}
//# sourceMappingURL=progress-bar.js.map
