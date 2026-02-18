import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';

const cardTextCss = () => `:host{pointer-events:none}.card__text-wrapper{padding-bottom:0px}.card__text-wrapper.hasBtn{padding-bottom:16px}.card-text{line-height:1.5rem;font-size:1rem;font-weight:400;white-space:wrap;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}`;

const CardText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
};
CardText.style = cardTextCss();

export { CardText as ifx_card_text };
//# sourceMappingURL=ifx-card-text.entry.js.map

//# sourceMappingURL=ifx-card-text.entry.js.map