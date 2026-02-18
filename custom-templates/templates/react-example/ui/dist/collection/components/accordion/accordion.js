import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Accordion {
    el;
    autoCollapse = false;
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-accordion", await framework);
        }
    }
    async onItemOpen(event) {
        if (this.autoCollapse) {
            const items = Array.from(this.el.querySelectorAll("ifx-accordion-item"));
            for (const item of items) {
                const itemElement = item;
                if (itemElement !== event.target && (await itemElement.open)) {
                    itemElement.open = false;
                }
            }
        }
    }
    render() {
        return (h("div", { key: 'd58ecb8cc8115a73494ff566396817215358ce1b', class: "accordion-wrapper" }, h("slot", { key: 'b6d78a277100955d35240fae3e9f87fd9c539fa5' })));
    }
    static get is() { return "ifx-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get delegatesFocus() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["accordion.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["accordion.css"]
        };
    }
    static get properties() {
        return {
            "autoCollapse": {
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
                "attribute": "auto-collapse",
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "ifxOpen",
                "method": "onItemOpen",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=accordion.js.map
