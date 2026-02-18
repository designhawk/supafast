'use strict';

var index = require('./index-BfM4jcLt.js');

const cardLinksCss = () => `.container{display:flex;align-items:center;gap:20px;flex-wrap:wrap;text-decoration:none;color:#1D1D1D;padding:0px 24px 24px 24px;word-wrap:break-word;overflow-wrap:anywhere;}.container:hover{cursor:initial}`;

const CardLinks = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    render() {
        return (index.h("div", { key: 'fbe1ab9a3d4295479c4b84e5835d38bd54053127', class: "container" }, index.h("slot", { key: 'ce6d4d1e0ef0dcc37cf958b4706256c767f9c712' })));
    }
};
CardLinks.style = cardLinksCss();

exports.ifx_card_links = CardLinks;
//# sourceMappingURL=ifx-card-links.entry.cjs.js.map

//# sourceMappingURL=ifx-card-links.cjs.entry.js.map