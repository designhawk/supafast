import { h } from "@stencil/core";
export class CardOverline {
    render() {
        return (h("div", { key: '4170e8538df86de9ba3e0773e1dd31c994511a05', class: "card-overline" }, h("slot", { key: '9a25c2304b5db67dc2c96c3f1e08a52e3fcd4c4b' })));
    }
    static get is() { return "ifx-card-overline"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["card-overline.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-overline.css"]
        };
    }
}
//# sourceMappingURL=card-overline.js.map
