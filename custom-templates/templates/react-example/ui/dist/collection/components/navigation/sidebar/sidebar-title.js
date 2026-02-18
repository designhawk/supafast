import { h } from "@stencil/core";
export class SidebarTitle {
    el;
    showInCollapsed = false;
    componentWillLoad() {
        // Set data attribute for CSS targeting
        this.el.setAttribute("data-show-in-collapsed", this.showInCollapsed.toString());
    }
    render() {
        return (h("div", { key: '98f8c05081ff7b90c2b4d10a5946c18541f1b92e', class: "sidebar__title" }, h("div", { key: 'd5b21f302971aa6ea3a0c91d21b9866f235d90ee', class: "sidebar__title-label" }, h("slot", { key: 'c24b01560d05a373e8e67ca3893dced67a8ef442' }))));
    }
    static get is() { return "ifx-sidebar-title"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["sidebar-title.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["sidebar-title.css"]
        };
    }
    static get properties() {
        return {
            "showInCollapsed": {
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
                "attribute": "show-in-collapsed",
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=sidebar-title.js.map
