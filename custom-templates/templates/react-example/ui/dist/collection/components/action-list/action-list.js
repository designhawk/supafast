import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class ActionList {
    el;
    /**
     * Aria label for accessibility support
     */
    listAriaLabel;
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-action-list", await framework);
        }
    }
    render() {
        return (h("div", { key: '65f1a9439f9d7c3465d657eefcea947e177f6c2a', class: "action-list", role: "list", "aria-label": this.listAriaLabel }, h("slot", { key: '53b65f0e8f9b727de1ff0bf06140b60e4ba85928' })));
    }
    static get is() { return "ifx-action-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["action-list.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["action-list.css"]
        };
    }
    static get properties() {
        return {
            "listAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Aria label for accessibility support"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "list-aria-label"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=action-list.js.map
