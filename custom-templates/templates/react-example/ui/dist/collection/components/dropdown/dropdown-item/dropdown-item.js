import { h, } from "@stencil/core";
export class DropdownItem {
    icon;
    href = "";
    target = "_self";
    hide = false;
    error = false;
    size = 'l';
    ifxDropdownItem;
    el;
    handleMenuSize(event) {
        this.size = event.detail;
    }
    handleEventEmission() {
        this.ifxDropdownItem.emit(this.el.textContent);
    }
    render() {
        const hasHref = this.href !== undefined && this.href !== null && this.href !== '';
        const common = {
            class: `dropdown-item ${this.size === 's' ? 'small' : ""} ${this.hide ? 'hide' : ""} ${this.error ? 'error' : ""}`,
            onClick: () => this.handleEventEmission(),
            role: 'menuitem'
        };
        if (!hasHref)
            common.tabIndex = 0;
        return (h("a", { key: '82b8d48c04c38a995de933664d4af83277687ca1', ...common, ...(hasHref ? { href: this.href, target: this.target, error: this.error } : {}) }, this.icon && h("ifx-icon", { key: '6d06b1bbb52976b676ab7f16cac197c6e1c5d2f7', class: "icon", icon: this.icon }), h("span", { key: 'e16250c6965d2b965c9895fa6e4da3a1daa10b3f' }, h("slot", { key: 'b2bb611db6b33d0eac845129d8213124d832285d' }))));
    }
    static get is() { return "ifx-dropdown-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["dropdown-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["dropdown-item.css"]
        };
    }
    static get properties() {
        return {
            "icon": {
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
                "attribute": "icon"
            },
            "href": {
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
                "attribute": "href",
                "defaultValue": "\"\""
            },
            "target": {
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
                "attribute": "target",
                "defaultValue": "\"_self\""
            },
            "hide": {
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
                "attribute": "hide",
                "defaultValue": "false"
            },
            "error": {
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
                "attribute": "error",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "size": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxDropdownItem",
                "name": "ifxDropdownItem",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "menuSize",
                "method": "handleMenuSize",
                "target": "body",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=dropdown-item.js.map
