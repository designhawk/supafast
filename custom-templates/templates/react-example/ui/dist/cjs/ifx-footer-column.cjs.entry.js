'use strict';

var index = require('./index-BfM4jcLt.js');

const footerColumnCss = () => `.col{display:flex;flex-direction:column;gap:12px;padding-right:8px;color:#1D1D1D;font-family:var(--ifx-font-family)}.col ::slotted([slot=title]){box-sizing:border-box;font-weight:600;font-size:1rem;line-height:1.5rem;margin:0;padding:0}.col span{display:flex;flex-direction:column;gap:12px;color:#1D1D1D}.col span ::slotted([slot=link]){box-sizing:border-box;font-weight:400;font-size:1rem;line-height:1.5rem}`;

const FooterColumn = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    render() {
        return (index.h("div", { key: 'c0f23fb98dd66a1f0fbe0e8b552014852729fda3', class: "col" }, index.h("slot", { key: '2b1960a48778097aaf6c10154cc79448ea55495f', name: "title" }), index.h("span", { key: '97b85b7970a55d0dfe637715b62f2c5527b7fafa', "aria-label": "navigation link" }, index.h("slot", { key: '5b10e017bb62df035a2584efc34769fa2b23edb7', name: "link" }))));
    }
};
FooterColumn.style = footerColumnCss();

exports.ifx_footer_column = FooterColumn;
//# sourceMappingURL=ifx-footer-column.entry.cjs.js.map

//# sourceMappingURL=ifx-footer-column.cjs.entry.js.map