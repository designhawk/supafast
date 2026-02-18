import { h } from "@stencil/core";
export class CardLinks {
    el;
    render() {
        return (h("div", { key: 'fbe1ab9a3d4295479c4b84e5835d38bd54053127', class: "container" }, h("slot", { key: 'ce6d4d1e0ef0dcc37cf958b4706256c767f9c712' })));
    }
    static get is() { return "ifx-card-links"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["card-links.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-links.css"]
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=card-links.js.map
