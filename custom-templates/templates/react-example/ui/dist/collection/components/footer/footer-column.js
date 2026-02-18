import { h } from "@stencil/core";
export class FooterColumn {
    el;
    render() {
        return (h("div", { key: 'c0f23fb98dd66a1f0fbe0e8b552014852729fda3', class: "col" }, h("slot", { key: '2b1960a48778097aaf6c10154cc79448ea55495f', name: "title" }), h("span", { key: '97b85b7970a55d0dfe637715b62f2c5527b7fafa', "aria-label": "navigation link" }, h("slot", { key: '5b10e017bb62df035a2584efc34769fa2b23edb7', name: "link" }))));
    }
    static get is() { return "ifx-footer-column"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./footer-column.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["footer-column.css"]
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=footer-column.js.map
