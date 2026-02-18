'use strict';

var index = require('./index-BfM4jcLt.js');

const dropdownHeaderCss = () => `.dropdown-header{display:flex;padding:8px 16px;align-items:center;gap:8px;align-self:stretch;border-bottom:1px solid #EEEDED;font-family:var(--ifx-font-family)}.dropdown-header span{color:#575352;font-family:var(--ifx-font-family);font-size:14px;font-style:normal;font-weight:400;line-height:20px;}`;

const DropdownHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("div", { key: 'ad7f59091f6fb31b1941f0948bc61b9707c91fb2', class: "dropdown-header" }, index.h("span", { key: '71402d91012e90d1c5eca4b92989aae83dc3d16b' }, index.h("slot", { key: 'eb3394b40cb8cfface86f28e73392656d0c5adc2' }))));
    }
};
DropdownHeader.style = dropdownHeaderCss();

exports.ifx_dropdown_header = DropdownHeader;
//# sourceMappingURL=ifx-dropdown-header.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown-header.cjs.entry.js.map