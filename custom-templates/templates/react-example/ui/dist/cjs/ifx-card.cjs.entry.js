'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const cardCss = () => `:host{display:inline-flex}.card{position:relative;display:inline-flex;flex-direction:column;word-wrap:break-word;background-color:#FFFFFF;background-clip:border-box;border:2px solid #EEEDED;border-radius:2px;width:350px;height:auto;font-family:var(--ifx-font-family)}.card:has(.card-href:focus),.card:has(.card-href:hover){outline:none;border-color:#0A8276}.card:has(.card-href:focus) ::slotted(ifx-card-headline),.card:has(.card-href:hover) ::slotted(ifx-card-headline){color:#0A8276}.card.noBtns .vertical .lower__body-wrapper{padding-bottom:24px}.card.noBtns .horizontal .lower__body-wrapper{padding-bottom:24px}.card .horizontal{display:flex;flex-direction:row;min-height:218px}.card .horizontal .card-img{flex:1;text-decoration:none}.card .horizontal .card-img.noImage{display:none}.card .horizontal .card-img ::slotted([slot=img]){width:100%;vertical-align:bottom}.card .horizontal .lower__body-wrapper{flex:1;display:grid;grid-template-rows:1fr auto}.card .horizontal .lower__body-wrapper .upper-body{display:flex;flex-direction:column;text-decoration:none;color:#1D1D1D;padding:24px 24px 0px 24px}.card .vertical .upper__body-wrapper{text-decoration:none;color:#1D1D1D}.card .vertical .upper__body-wrapper .card-img{height:190px}.card .vertical .upper__body-wrapper .card-img.noImage{display:none}.card .vertical .upper__body-wrapper .upper-body{padding:24px 24px 0px 24px}.card .vertical .lower__body-wrapper:hover{border-color:#EEEDED}.card.horizontal{flex-direction:row;width:538px}.card.horizontal .card-img{flex:1;order:2}.card.horizontal .card-img ::slotted([slot=img]){width:100%;height:100%;vertical-align:bottom;object-fit:cover}.card.horizontal.left .horizontal .card-img{order:1}.card.horizontal.left .horizontal .lower__body-wrapper{order:2}.card .card-href:focus{outline:none}`;

const Card = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    noBtns;
    direction = "vertical";
    alignment;
    noImg;
    href = "";
    internalHref = "";
    target = "_self";
    ariaLabel;
    setImgPosition(event) {
        this.alignment = event.detail;
    }
    handleComponentAdjustment() {
        const image = this.el.querySelector("ifx-card-image");
        const links = this.el.querySelector("ifx-card-links");
        this.noImg = !image;
        this.noBtns = !links;
        if (this.href.trim() === "") {
            this.internalHref = undefined;
        }
        else {
            this.internalHref = this.href;
        }
    }
    componentWillLoad() {
        this.handleComponentAdjustment();
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-card", await framework);
        }
    }
    componentWillUpdate() {
        this.handleComponentAdjustment();
    }
    render() {
        return (index.h(index.Host, { key: 'ac68cddd666db698857e3eb10d86cbe77e364618' }, index.h("div", { key: '591f0ea9b76f9fca3f30eef1c83b9423d85e7b08', "aria-label": this.ariaLabel, class: `card 
            ${this.noBtns ? "noBtns" : ""}
            ${this.direction} 
            ${this.alignment}`, role: "group" }, this.direction === "horizontal" && (index.h("div", { key: '79e1bfb0ab14d27cad85ea769bba000134eb4f67', class: "horizontal" }, index.h("a", { key: 'b361a82ee361638555f33dfc0d385e6bd373692e', class: `card-img ${this.noImg ? "noImage" : ""} ${this.internalHref ? "card-href" : ""}`, href: this.internalHref }, index.h("slot", { key: '43b6e03c316fdf4638715c43d0b468e54009c7f1', name: "img" })), index.h("div", { key: '7fd8fe601252de72c4827ece503de252b2cb7e8e', class: "lower__body-wrapper" }, index.h("a", { key: '54e08c6b2a853e9bb1c8e2b12f4ab8343737962c', class: `upper-body ${this.internalHref ? "card-href" : ""}`, href: this.internalHref, id: "upper-body-content" }, index.h("slot", { key: '69675c7dae8742e4824acb77437ad24c6973e55d' })), index.h("div", { key: '6d64de2be47f2e350c19501c10bb58bceb90178c' }, index.h("slot", { key: '9fa0acb4053477e64315037adad8f2fc2182410f', name: "buttons" }))))), this.direction === "vertical" && (index.h("div", { key: 'b09ad059ebb0562072d97724b1468e0a4039fbbb', class: "vertical" }, index.h("a", { key: 'f946270697e1def8ff3338d2571134f4537a1ba5', class: `upper__body-wrapper ${this.internalHref ? "card-href" : ""}`, href: this.internalHref, target: this.target }, index.h("div", { key: '483d9b4cc3474859010aaab1e72598dfac058324', class: `card-img ${this.noImg ? "noImage" : ""}` }, index.h("slot", { key: 'ca41b186041671328e7917c28598bd025895b15a', name: "img" })), index.h("div", { key: '69f281f061770ebbe9d806e399e0f4637a99236a', class: "upper-body", id: "upper-body-content" }, index.h("slot", { key: 'a8300f60cf8873fa3cbbca27d3104fdd920376b6' }))), index.h("div", { key: 'b995106b4caf531b7c1230f7721d88102229733d', class: "lower__body-wrapper", role: "group", "aria-labelledby": "upper-body-content" }, index.h("slot", { key: 'b792f52c8a05fe31dbf73526888816f8b341efa1', name: "buttons" })))))));
    }
};
Card.style = cardCss();

exports.ifx_card = Card;
//# sourceMappingURL=ifx-card.entry.cjs.js.map

//# sourceMappingURL=ifx-card.cjs.entry.js.map