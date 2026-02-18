import { h } from "@stencil/core";
export class CardText {
    el;
    hasBtn;
    componentWillLoad() {
        const link = this.el.closest("ifx-card").querySelector("ifx-link");
        const button = this.el.closest("ifx-card").querySelector("ifx-button");
        if (link || button) {
            this.hasBtn = true;
        }
    }
    render() {
        return (h("div", { key: '3abbca766a886f604fc8e7ea81a1c084b0e6f6ff', class: `card__text-wrapper ${this.hasBtn ? "hasBtn" : ""}` }, h("div", { key: '3cea0153f87729f93fa4a87690cc4fd7edc1be80', class: `card-text` }, h("slot", { key: '91b363563df14204c304ae1a450cc47a4f6a7c6d' }))));
    }
    static get is() { return "ifx-card-text"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./card-text.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-text.css"]
        };
    }
    static get states() {
        return {
            "hasBtn": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=card-text.js.map
