'use strict';

var index = require('./index-BfM4jcLt.js');

const dropdownSeparatorCss = () => `.dropdown-separator{height:1px;background-color:#EEEDED;margin:8px 16px}`;

const DropdownSeparator = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("div", { key: '66c677bcb4b0ffde8fd191a1a5fcd836d5118957', class: "dropdown-separator" });
    }
};
DropdownSeparator.style = dropdownSeparatorCss();

exports.ifx_dropdown_separator = DropdownSeparator;
//# sourceMappingURL=ifx-dropdown-separator.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown-separator.cjs.entry.js.map