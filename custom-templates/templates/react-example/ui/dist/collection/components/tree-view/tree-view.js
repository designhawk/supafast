import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class TreeView {
    el;
    label;
    disableAllItems = false;
    expandAllItems = false;
    ariaLabel;
    ifxTreeViewExpandAllChange;
    ifxTreeViewDisableAllChange;
    handleExpandAllItemsChange(newValue) {
        this.ifxTreeViewExpandAllChange.emit(newValue);
    }
    handleDisableAllItemsChange(newValue) {
        this.ifxTreeViewDisableAllChange.emit(newValue);
    }
    handleSlotRef = (el) => {
        if (el) {
            if (this.disableAllItems) {
                el.setAttribute("data-disable-all-items", "true");
            }
            else {
                el.removeAttribute("data-disable-all-items");
            }
            if (this.expandAllItems) {
                el.setAttribute("data-expand-all-items", "true");
            }
            else {
                el.removeAttribute("data-expand-all-items");
            }
        }
    };
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-tree-view", await framework);
        }
    }
    render() {
        return (h("div", { key: 'f724e2ff30c8851fd5b0b684f8bf8085d26a0a36', class: `tree-view ${this.disableAllItems ? " tree-view--disabled" : ""}`, role: "tree", "aria-label": this.ariaLabel }, this.label && this.label.trim() !== "" && (h("div", { key: '7ee3289331eab5dbd86c997f1f381b04f29f51da', class: "tree-view__label" }, this.label)), h("slot", { key: 'a73b5ad17a5b95edd714a931520046abeb525509', ref: this.handleSlotRef })));
    }
    static get is() { return "ifx-tree-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["tree-view.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["tree-view.css"]
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "label"
            },
            "disableAllItems": {
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
                "attribute": "disable-all-items",
                "defaultValue": "false"
            },
            "expandAllItems": {
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
                "attribute": "expand-all-items",
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
            }
        };
    }
    static get events() {
        return [{
                "method": "ifxTreeViewExpandAllChange",
                "name": "ifxTreeViewExpandAllChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "ifxTreeViewDisableAllChange",
                "name": "ifxTreeViewDisableAllChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "expandAllItems",
                "methodName": "handleExpandAllItemsChange"
            }, {
                "propName": "disableAllItems",
                "methodName": "handleDisableAllItemsChange"
            }];
    }
}
//# sourceMappingURL=tree-view.js.map
