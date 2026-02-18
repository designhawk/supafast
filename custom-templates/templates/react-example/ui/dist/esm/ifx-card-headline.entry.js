import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';

const cardHeadlineCss = () => `:host{pointer-events:none}.card__headline-wrapper{padding-bottom:16px}.card__headline-wrapper.withDesc{padding-bottom:8px}.card-headline{margin-top:0;padding-top:0;font-family:var(--ifx-font-family);font-weight:600;font-size:1.5rem;line-height:2rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}.card-headline.horizontal{font-size:1.25rem;line-height:28px}`;

const CardHeadline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};
CardHeadline.style = cardHeadlineCss();

export { CardHeadline as ifx_card_headline };
//# sourceMappingURL=ifx-card-headline.entry.js.map

//# sourceMappingURL=ifx-card-headline.entry.js.map