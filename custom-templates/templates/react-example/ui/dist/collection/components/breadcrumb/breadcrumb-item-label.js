import { h, } from "@stencil/core";
export class BreadcrumbItemLabel {
    icon;
    href;
    target = "_self";
    el;
    breadcrumbMenuIconWrapper;
    componentDidLoad() {
        const container = this.el.shadowRoot.querySelector(".breadcrumb-item-label-container");
        const menuWrapper = container.querySelector(".menu-icon-wrapper");
        this.breadcrumbMenuIconWrapper.emit(menuWrapper);
    }
    render() {
        return (h("a", { key: 'eb39eeb687c3bc04eedb3e21698a6921f2cb7a91', href: this.href, target: this.target, class: "breadcrumb-item-label-container", role: "link" }, h("ifx-icon", { key: '38d68e9cf885cf7ef2de9e7c574468a07aa75aca', icon: this.icon, "aria-hidden": "true" }), h("span", { key: '03c9dc04e7e5d14d9ad96699be54a20cdca64233', class: "label-wrapper" }, h("slot", { key: '06efe9f1937791ae8bd82b3b1e1ce149716cd5f4' })), h("span", { key: 'a6946ba4a3abfe71fea8028211d5928f6304c3cf', class: "menu-icon-wrapper", "aria-hiden": "true" }, h("ifx-icon", { key: '931b00789f1b78b64d9aea359755976661c37e62', icon: "chevron-down-16" }))));
    }
    static get is() { return "ifx-breadcrumb-item-label"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["breadcrumb-item-label.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["breadcrumb-item-label.css"]
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
                "attribute": "href"
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
            }
        };
    }
    static get events() {
        return [{
                "method": "breadcrumbMenuIconWrapper",
                "name": "breadcrumbMenuIconWrapper",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "CustomEvent",
                    "resolved": "CustomEvent<any>",
                    "references": {
                        "CustomEvent": {
                            "location": "global",
                            "id": "global::CustomEvent"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=breadcrumb-item-label.js.map
