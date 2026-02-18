import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';

const breadcrumbItemCss = () => `.breadcrumb-parent{display:flex;flex-direction:row;align-items:center;padding:0px;gap:12px;min-height:24px;justify-content:center}.breadcrumb-parent:hover{cursor:pointer}.breadcrumb-parent .breadcrumb-wrapper{display:flex;flex-direction:row;align-items:center;padding:0px;gap:8px;position:relative}.breadcrumb-parent .breadcrumb-wrapper .dropdown-menu{display:none;position:absolute;top:20px}.breadcrumb-parent .breadcrumb-wrapper .dropdown-menu.open{display:block}.breadcrumb-parent .breadcrumb-wrapper a{text-decoration:none;color:#1D1D1D;font-family:var(--ifx-font-family);font-style:normal;font-weight:400;font-size:0.875rem;line-height:1.25rem;display:flex;align-items:center;color:#1D1D1D;flex-direction:column;justify-content:center;padding:0px;border-bottom:1px solid #1D1D1D}.breadcrumb-parent .breadcrumb-divider{width:10px;height:16px;color:#EEEDED;line-height:13px;font-size:1.25rem;margin-right:12px}`;

const BreadcrumbItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    isLastItem = false;
    get el() { return getElement(this); }
    emittedElement;
    uniqueId;
    hasDropdownMenu = false;
    handleOutsideClick(event) {
        const path = event.composedPath();
        if (!path.includes(this.el)) {
            this.closeDropdownMenu();
        }
    }
    handleKeyDown(ev) {
        if (ev.key === "Enter" || ev.key === " ") {
            this.toggleDropdownMenu();
        }
        else if (ev.key === "Escape") {
            this.closeDropdownMenu();
        }
    }
    getDropdownMenu() {
        const dropdownMenu = this.el.shadowRoot.querySelector(".dropdown-menu");
        return dropdownMenu;
    }
    menuWrapperEventReEmitter(event) {
        this.emittedElement = event.detail;
    }
    getMenuIconWrapper() {
        return this.emittedElement;
    }
    handleClassList(el, type, className) {
        el.classList[type](className);
    }
    closeDropdownMenu() {
        if (this.hasDropdownMenu) {
            const dropdownMenu = this.getDropdownMenu();
            const menuWrapper = this.getMenuIconWrapper();
            this.handleClassList(dropdownMenu, "remove", "open");
            this.handleClassList(menuWrapper, "remove", "show");
        }
    }
    toggleDropdownMenu() {
        if (this.hasDropdownMenu) {
            const dropdownMenu = this.getDropdownMenu();
            const menuWrapper = this.getMenuIconWrapper();
            this.handleClassList(dropdownMenu, "toggle", "open");
            this.handleClassList(menuWrapper, "toggle", "show");
        }
    }
    isDropdownMenuOpen() {
        const dropdownMenu = this.getDropdownMenu();
        return (this.hasDropdownMenu &&
            dropdownMenu &&
            dropdownMenu.classList.contains("open"));
    }
    handleLastItem() {
        const breadcrumbItems = this.el
            .closest("ifx-breadcrumb")
            .querySelectorAll("ifx-breadcrumb-item");
        if (this.el === breadcrumbItems[breadcrumbItems.length - 1]) {
            this.isLastItem = true;
        }
        else
            this.isLastItem = false;
    }
    generateUniqueId(prefix = "id") {
        return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
    }
    componentWillLoad() {
        if (!this.uniqueId) {
            this.uniqueId = this.generateUniqueId("breadcrumb-dropdown");
        }
        this.handleLastItem();
    }
    componentDidUpdate() {
        this.handleLastItem();
    }
    componentWillRender() {
        this.setHasDropdownMenuState();
    }
    setHasDropdownMenuState() {
        const dropdownMenu = this.getIfxDropdownMenuComponent();
        if (dropdownMenu) {
            this.hasDropdownMenu = !!dropdownMenu;
        }
    }
    getIfxDropdownMenuComponent() {
        const dropdownMenu = this.el.querySelector("ifx-dropdown-menu");
        return dropdownMenu;
    }
    componentDidLoad() {
        const dropdownMenu = this.getIfxDropdownMenuComponent();
        if (!this.hasDropdownMenu) {
            const iconMenuWrapper = this.getMenuIconWrapper();
            this.handleClassList(iconMenuWrapper, "toggle", "hide");
        }
        else {
            dropdownMenu.isOpen = true;
        }
    }
    render() {
        return (h("li", { key: 'c97df1c8c3adc0015158af6f036d4178abd57677', class: "breadcrumb-parent", "aria-current": `${this.isLastItem ? "page" : ""}` }, h("li", { key: 'a349a98018f1bd4b5a178661c7296e11acddcdfe', role: "button", tabindex: this.hasDropdownMenu ? 0 : -1, class: "breadcrumb-wrapper", onClick: () => this.toggleDropdownMenu(), "aria-controls": this.uniqueId, "aria-haspopup": "menu", "aria-label": "Toggle dropdown menu" }, h("slot", { key: '8d123b993c9445e37667f07e1eb5ea2ea76a4753', name: "label" }), h("div", { key: '2a5986954ea62822c919e3933377074bbfa52676', id: this.uniqueId, class: "dropdown-menu", "aria-expanded": this.isDropdownMenuOpen(), "aria-label": "Dropdown menu" }, h("slot", { key: 'a0502cabff154555aa1cc8a48ad7db9b52fc826b' }))), !this.isLastItem && (h("span", { key: 'f58935a5c17da74ded1cb60314ad976e783b7c93', class: "breadcrumb-divider", "aria-hidden": "true" }, "/"))));
    }
};
BreadcrumbItem.style = breadcrumbItemCss();

export { BreadcrumbItem as ifx_breadcrumb_item };
//# sourceMappingURL=ifx-breadcrumb-item.entry.js.map

//# sourceMappingURL=ifx-breadcrumb-item.entry.js.map