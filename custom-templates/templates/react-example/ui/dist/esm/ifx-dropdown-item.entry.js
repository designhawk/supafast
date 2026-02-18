import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';

const dropdownItemCss = () => `.dropdown-item{text-decoration:none;color:#1D1D1D;display:flex;align-items:center;padding:8px 16px;gap:8px;font-family:var(--ifx-font-family)}.dropdown-item:focus{outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.dropdown-item.hide{display:none}.dropdown-item span{color:#1D1D1D;font-size:16px;font-style:normal;font-weight:400;line-height:24px;}.dropdown-item.small span{font-size:14px}.dropdown-item:hover{cursor:pointer;background-color:#EEEDED}.dropdown-item:active{background-color:#BFBBBB}.dropdown-item.error{color:#CD002F}.dropdown-item.error span{color:#CD002F}.icon{margin-right:4px}`;

const DropdownItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxDropdownItem = createEvent(this, "ifxDropdownItem", 7);
    }
    icon;
    href = "";
    target = "_self";
    hide = false;
    error = false;
    size = 'l';
    ifxDropdownItem;
    get el() { return getElement(this); }
    handleMenuSize(event) {
        this.size = event.detail;
    }
    handleEventEmission() {
        this.ifxDropdownItem.emit(this.el.textContent);
    }
    render() {
        const hasHref = this.href !== undefined && this.href !== null && this.href !== '';
        const common = {
            class: `dropdown-item ${this.size === 's' ? 'small' : ""} ${this.hide ? 'hide' : ""} ${this.error ? 'error' : ""}`,
            onClick: () => this.handleEventEmission(),
            role: 'menuitem'
        };
        if (!hasHref)
            common.tabIndex = 0;
        return (h("a", { key: '82b8d48c04c38a995de933664d4af83277687ca1', ...common, ...(hasHref ? { href: this.href, target: this.target, error: this.error } : {}) }, this.icon && h("ifx-icon", { key: '6d06b1bbb52976b676ab7f16cac197c6e1c5d2f7', class: "icon", icon: this.icon }), h("span", { key: 'e16250c6965d2b965c9895fa6e4da3a1daa10b3f' }, h("slot", { key: 'b2bb611db6b33d0eac845129d8213124d832285d' }))));
    }
};
DropdownItem.style = dropdownItemCss();

export { DropdownItem as ifx_dropdown_item };
//# sourceMappingURL=ifx-dropdown-item.entry.js.map

//# sourceMappingURL=ifx-dropdown-item.entry.js.map