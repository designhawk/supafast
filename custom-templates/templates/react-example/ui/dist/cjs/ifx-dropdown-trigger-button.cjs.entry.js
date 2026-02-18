'use strict';

var index = require('./index-BfM4jcLt.js');

const dropdownTriggerButtonCss = () => `:host{display:inline-block}.rotate{transition:transform 0.2s ease-in-out;transform:rotate(-180deg);margin-top:0em}.icon{margin-top:0em;transition:transform 0.2s ease-in-out}`;

const DropdownItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    isOpen = false;
    theme = "default";
    variant;
    size = "m";
    disabled;
    hideArrow = false;
    render() {
        return (index.h("ifx-button", { key: '42d63aa62d05cfc4bbbae6cf3e3cc2ffd95c0ab3', variant: this.variant, theme: this.theme, size: this.size, disabled: this.disabled, class: "dropdown-trigger-button" }, index.h("slot", { key: '0227f429aa2ca7e837afc06fdf7908eee46fa843' }), !this.hideArrow && (index.h("ifx-icon", { key: '8c20da11884d2067d6cfca45d1231fadab137c3f', icon: "chevron-down-16", class: `icon${this.isOpen ? " rotate" : ""}` }))));
    }
};
DropdownItem.style = dropdownTriggerButtonCss();

exports.ifx_dropdown_trigger_button = DropdownItem;
//# sourceMappingURL=ifx-dropdown-trigger-button.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown-trigger-button.cjs.entry.js.map