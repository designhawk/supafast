'use strict';

var index = require('./index-BfM4jcLt.js');

const cardOverlineCss = () => `:host{pointer-events:none}.card-overline{font-size:1rem;font-weight:400;color:#575352;padding-bottom:4px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;word-break:break-all}`;

const CardOverline = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("div", { key: '4170e8538df86de9ba3e0773e1dd31c994511a05', class: "card-overline" }, index.h("slot", { key: '9a25c2304b5db67dc2c96c3f1e08a52e3fcd4c4b' })));
    }
};
CardOverline.style = cardOverlineCss();

exports.ifx_card_overline = CardOverline;
//# sourceMappingURL=ifx-card-overline.entry.cjs.js.map

//# sourceMappingURL=ifx-card-overline.cjs.entry.js.map