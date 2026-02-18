import { r as registerInstance, h } from './index-CA_siwAQ.js';

const dropdownTriggerButtonCss = () => `:host{display:inline-block}.rotate{transition:transform 0.2s ease-in-out;transform:rotate(-180deg);margin-top:0em}.icon{margin-top:0em;transition:transform 0.2s ease-in-out}`;

const DropdownItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    isOpen = false;
    theme = "default";
    variant;
    size = "m";
    disabled;
    hideArrow = false;
    render() {
        return (h("ifx-button", { key: '42d63aa62d05cfc4bbbae6cf3e3cc2ffd95c0ab3', variant: this.variant, theme: this.theme, size: this.size, disabled: this.disabled, class: "dropdown-trigger-button" }, h("slot", { key: '0227f429aa2ca7e837afc06fdf7908eee46fa843' }), !this.hideArrow && (h("ifx-icon", { key: '8c20da11884d2067d6cfca45d1231fadab137c3f', icon: "chevron-down-16", class: `icon${this.isOpen ? " rotate" : ""}` }))));
    }
};
DropdownItem.style = dropdownTriggerButtonCss();

export { DropdownItem as ifx_dropdown_trigger_button };
//# sourceMappingURL=ifx-dropdown-trigger-button.entry.js.map

//# sourceMappingURL=ifx-dropdown-trigger-button.entry.js.map