import { h } from "@stencil/core";
export class CardHeadline {
    el;
    direction;
    hasDesc;
    componentWillLoad() {
        const cardElement = this.el.closest("ifx-card");
        if (cardElement) {
            const cardClass = cardElement.shadowRoot.querySelector(".card")?.className;
            if (cardClass && cardClass.includes("horizontal")) {
                this.direction = "horizontal";
            }
            const desc = cardElement.querySelector("ifx-card-text");
            if (desc) {
                this.hasDesc = true;
            }
        }
    }
    render() {
        return (h("div", { key: 'b0f8d9e0293dd753a5e6170fe5d68617ef941f88', class: `card__headline-wrapper ${this.hasDesc ? "withDesc" : ""}` }, h("div", { key: '0b314253f35c5614170ad3d374865f052ac23084', class: `card-headline ${this.direction}` }, h("slot", { key: '088721fc4ca3f3307c50680d3f69f1f2e4d46184' }))));
    }
    static get is() { return "ifx-card-headline"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["card-headline.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-headline.css"]
        };
    }
    static get states() {
        return {
            "direction": {},
            "hasDesc": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=card-headline.js.map
