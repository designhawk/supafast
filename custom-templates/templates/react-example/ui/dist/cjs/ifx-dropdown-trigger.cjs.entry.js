'use strict';

var index = require('./index-BfM4jcLt.js');

const dropdownTriggerCss = () => `:host{display:inline-block;cursor:pointer}`;

const DropdownItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    isOpen = false;
    render() {
        return index.h("slot", { key: 'b60e214835055b86c02d42eb28a71ac0ad629c7c' });
    }
};
DropdownItem.style = dropdownTriggerCss();

exports.ifx_dropdown_trigger = DropdownItem;
//# sourceMappingURL=ifx-dropdown-trigger.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown-trigger.cjs.entry.js.map