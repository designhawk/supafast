import { Host, h } from "@stencil/core";
export class ContentSwitcherItem {
    selected = false;
    value;
    render() {
        return (h(Host, { key: 'bec94d6a655c33fd0157c5ac4ac03b1c799bd82b' }, h("button", { key: 'b56b2f947981eda121fb4e2ebbe89a2757b59765', class: "ifx-content-switcher-item" + (this.selected ? " selected" : "") }, h("slot", { key: '95df1ad339b9bc481f7caf5f0bda2bf1da04aa33' }))));
    }
    static get is() { return "ifx-content-switcher-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./content-switcher-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["content-switcher-item.css"]
        };
    }
    static get properties() {
        return {
            "selected": {
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
                "attribute": "selected",
                "defaultValue": "false"
            },
            "value": {
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
                "attribute": "value"
            }
        };
    }
}
//# sourceMappingURL=content-switcher-item.js.map
