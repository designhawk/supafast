'use strict';

var index = require('./index-BfM4jcLt.js');

const sidebarItemCss = () => `:host{position:relative;display:block}:host([data-has-icon=false]){display:var(--ifx-sidebar-item-without-icon-display, block)}.sidebar__nav-item:focus-visible,.sidebar__nav-item.header__section:focus-visible{outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.sidebar__nav-item:focus-visible .sidebar__nav-item-icon-wrapper,.sidebar__nav-item.header__section:focus-visible .sidebar__nav-item-icon-wrapper{color:#08665C}.sidebar__nav-item:focus-visible .sidebar__nav-item-label,.sidebar__nav-item.header__section:focus-visible .sidebar__nav-item-label{outline:none;color:#08665C}.sidebar__nav-item:focus-visible .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon,.sidebar__nav-item.header__section:focus-visible .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon{color:#08665C}.sidebar__nav-item:hover,.sidebar__nav-item.header__section:hover{outline:none}.sidebar__nav-item:hover .sidebar__nav-item-icon-wrapper,.sidebar__nav-item.header__section:hover .sidebar__nav-item-icon-wrapper{color:#08665C}.sidebar__nav-item:hover .sidebar__nav-item-label,.sidebar__nav-item.header__section:hover .sidebar__nav-item-label{outline:none;color:#08665C}.sidebar__nav-item:hover .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon,.sidebar__nav-item.header__section:hover .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon{color:#08665C}.sidebar__nav-item{display:flex;flex-direction:var(--ifx-sidebar-item-flex-direction, row);align-items:center;width:100%;padding:8px 0px;gap:4px;flex:none;order:0;flex-grow:0;text-decoration:none;color:#1D1D1D;cursor:pointer;font-family:var(--ifx-font-family)}.sidebar__nav-item.extra-padding__bottom{padding:8px 0px 16px 0px}.sidebar__nav-item.active{color:#0A8276}.sidebar__nav-item.active-section::before{content:"";position:absolute;left:-32px;height:40px;width:2px;background:#0A8276}.sidebar__nav-item.open{padding:8px 0px}.sidebar__nav-item.open .sidebar__nav-item-label{font-size:16px;font-style:normal;font-weight:400;line-height:24px}.sidebar__nav-item.open .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon{transform:rotate(-180deg)}.sidebar__nav-item.header__section{box-sizing:padding-box;border-top:1px solid #EEEDED;padding:16px 0px;display:-webkit-flex;-webkit-line-clamp:1;-webkit-box-orient:horizontal;overflow:hidden;text-overflow:ellipsis}.sidebar__nav-item.header__section.no-top-border{border-top:none}.sidebar__nav-item.header__section.active-section::before{content:"";position:absolute;left:-32px;height:40px;width:2px;background:#0A8276}.sidebar__nav-item.header__section.open{padding:16px 0px 8px 0px}.sidebar__nav-item.header__section.open .sidebar__nav-item-indicator .item__arrow-wrapper ifx-icon{transform:rotate(-180deg)}.sidebar__nav-item.header__section .sidebar__nav-item-label{color:#1D1D1D;font-family:Source Sans 3;font-size:16px;font-style:normal;font-weight:600;line-height:24px}.sidebar__nav-item.submenu__item{padding:4px 0px}.sidebar__nav-item.submenu__item.extra-padding__bottom{padding:4px 0px 16px 0px}.sidebar__nav-item .sidebar__nav-item-icon-wrapper{display:flex;width:24px;height:24px;justify-content:center;align-items:center;gap:8px;flex-shrink:0}.sidebar__nav-item .sidebar__nav-item-icon-wrapper.noIcon{display:none}.sidebar__nav-item .sidebar__nav-item-icon-wrapper ifx-icon{width:16px;height:16px}.sidebar__nav-item .sidebar__nav-item-label{font-style:normal;font-weight:400;font-size:1rem;line-height:1.5rem;display:flex;align-items:center;flex:none;order:1;flex-grow:1;cursor:pointer;display:var(--ifx-sidebar-item-text-display, flex)}.sidebar__nav-item .sidebar__nav-item-indicator{display:var(--ifx-sidebar-item-text-display, flex);flex-direction:row;justify-content:center;align-items:center;padding:0px 4px;flex:none;order:2;flex-grow:0;position:relative}:host([data-sidebar-collapsed]) .sidebar__nav-item .sidebar__nav-item-indicator{position:absolute;top:0;right:0;z-index:10;padding:0}.expandable__submenu{display:none;list-style-type:none;flex-direction:column;padding:0;margin:0;padding-left:40px}.expandable__submenu.open{display:flex}.header__section+.expandable__submenu{padding-left:0}`;

const SidebarItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxSidebarMenu = index.createEvent(this, "ifxSidebarMenu", 7);
        this.ifxSidebarNavigationItem = index.createEvent(this, "ifxSidebarNavigationItem", 7);
        this.ifxSidebarActionItem = index.createEvent(this, "ifxSidebarActionItem", 7);
    }
    get el() { return index.getElement(this); }
    icon = "";
    showIcon = true;
    showIconWrapper = false;
    href = "";
    internalHref = "";
    target = "_self";
    isExpandable = false;
    isNested = true;
    isSubMenuItem = false;
    numberIndicator;
    active = false; // set to true manually or by clicking on a navigation item
    isActionItem = false; // if an item is an action item, it can not become active
    indicatorVariant = "number";
    internalActiveState = false;
    ifxSidebarMenu;
    ifxSidebarNavigationItem;
    ifxSidebarActionItem;
    handleItemClick;
    titleText = "";
    handleActiveChange(newValue, oldValue) {
        // If the item is an action item, ignore the active prop
        if (this.isActionItem) {
            this.internalActiveState = false;
            return;
        }
        this.internalActiveState = newValue;
        if (newValue !== oldValue) {
            const labelElement = this.getNavItem(this.el.shadowRoot);
            if (!this.isExpandable && !newValue) {
                this.handleClassList(labelElement, "remove", "active");
            }
            if (!this.isExpandable && newValue) {
                this.handleClassList(labelElement, "add", "active");
            }
        }
    }
    handleNumberIndicatorChange() {
        this.updateIndicatorVariant();
    }
    handleConsoleError(event) {
        if (event.detail) {
            this.showIcon = false;
        }
        else {
            this.showIcon = true;
        }
    }
    handleEventEmission() {
        // Get the active item section
        this.ifxSidebarMenu.emit(this.el);
    }
    handleClassList(el, type, className) {
        el.classList[type](className);
        if (type === "contains") {
            return el.classList.contains(className);
        }
    }
    getExpandableMenu() {
        const expandableSubmenu = this.el.shadowRoot.querySelector(".expandable__submenu");
        return expandableSubmenu;
    }
    getNavItem(el) {
        return el?.querySelector(".sidebar__nav-item");
    }
    getSidebarMenuItems(el = this.el) {
        const sidebarItems = el.querySelectorAll("ifx-sidebar-item");
        if (sidebarItems.length === 0) {
            return el.shadowRoot.querySelectorAll("ifx-sidebar-item");
        }
        return sidebarItems;
    }
    getSidebarMenuItem() {
        const sidebarItem = this.el.shadowRoot.querySelector(".sidebar__nav-item");
        return sidebarItem;
    }
    toggleSubmenu() {
        if (this.isExpandable) {
            const menuItem = this.getSidebarMenuItem();
            const expandableMenu = this.getExpandableMenu();
            this.handleClassList(expandableMenu, "toggle", "open");
            this.handleClassList(menuItem, "toggle", "open");
            // Emit an event with the current component
            this.handleEventEmission();
        }
        else {
            // If the sidebar item is not expandable, it's a leaf item without a submenu.
            // Emit an event to the parent `ifx-sidebar` component to notify it that a leaf item has been clicked.
            if (this.isActionItem) {
                //its an action item that eg opens an overlay etc and should not influence the active state of the item
                this.ifxSidebarActionItem.emit(this.el); // emit new event if isActionItem is true
                return;
            }
            else {
                //its a navigation item which becomes active after clicking it
                this.handleActiveChange(true, this.internalActiveState);
                this.ifxSidebarNavigationItem.emit(this.el);
            }
            // If the sidebar item is selectable (not expandable), then call the handler function with the current element.
            if (this.handleItemClick) {
                this.handleItemClick(this.el);
            }
        }
        // // Emit an event with the current component
        // this.handleEventEmission();
    }
    handleExpandableMenu(sidebarItems) {
        const sidebarExpandableMenu = this.getExpandableMenu();
        sidebarItems.forEach((el) => {
            const li = document.createElement("li");
            li.appendChild(el);
            sidebarExpandableMenu.appendChild(li);
        });
    }
    parentElementIsSidebar() {
        const parentElement = this.el.parentElement;
        if (parentElement.tagName.toUpperCase() === "IFX-SIDEBAR") {
            return true;
        }
        else
            return false;
    }
    checkIfMenuItemIsNested() {
        const parentIsSidebar = this.parentElementIsSidebar();
        if (parentIsSidebar) {
            this.isNested = false;
        }
    }
    checkIfMenuItemIsSubMenu() {
        const parentElement = this.el.parentElement;
        const navItem = this.getNavItem(parentElement.shadowRoot);
        if (parentElement.tagName.toUpperCase() === "IFX-SIDEBAR-ITEM" &&
            !this.handleClassList(navItem, "contains", "header__section")) {
            this.isSubMenuItem = true;
        }
        else {
            this.isSubMenuItem = false;
        }
    }
    isActive(iteratedComponent) {
        const activeAttributeValue = iteratedComponent.getAttribute("active");
        const isActive = activeAttributeValue === "true";
        return isActive;
    }
    getParentSection(el) {
        let parentElement = el.parentElement;
        while (parentElement &&
            parentElement.tagName.toUpperCase() !== "IFX-SIDEBAR") {
            if (parentElement.tagName.toUpperCase() === "IFX-SIDEBAR-ITEM") {
                return parentElement;
            }
            parentElement = parentElement.parentElement;
        }
        return null;
    }
    handleBorderIndicatorDisplacement(menuItem) {
        // Recursive function to handle each item
        const handleItem = (item, menuItem) => {
            const isActive = this.isActive(item);
            if (isActive) {
                const isOpen = this.handleClassList(menuItem, "contains", "open");
                const activeMenuItemSection = this.getActiveItemSection();
                if (!isOpen) {
                    this.handleClassList(activeMenuItemSection, "add", "active-section");
                }
                else {
                    this.handleClassList(activeMenuItemSection, "remove", "active-section");
                }
            }
            // Process each child item
            const children = this.getSidebarMenuItems(item);
            children.forEach((child) => handleItem(child, menuItem));
        };
        // Start with the top-level items
        const topLevelItems = this.getSidebarMenuItems();
        topLevelItems.forEach((item) => handleItem(item, menuItem));
    }
    setHref() {
        if (this.href.toLowerCase().trim() === "") {
            this.internalHref = undefined;
        }
        else
            this.internalHref = this.href;
    }
    getActiveItemSection() {
        const parentIsSidebar = this.parentElementIsSidebar();
        if (parentIsSidebar) {
            const labelElement = this.getNavItem(this.el.shadowRoot);
            return labelElement;
        }
        else {
            const labelElement = this.getNavItem(this.el.shadowRoot);
            return labelElement;
        }
    }
    async setActiveClasses() {
        const activeMenuItem = this.getNavItem(this.el.shadowRoot);
        this.handleClassList(activeMenuItem, "add", "active");
    }
    async expandMenu(ac) {
        const menuItem = this.getSidebarMenuItem();
        const expandableMenu = this.getExpandableMenu();
        this.handleClassList(expandableMenu, "add", "open");
        this.handleClassList(menuItem, "add", "open");
        if (ac) {
            this.handleClassList(expandableMenu, "remove", "active-section");
            this.handleClassList(menuItem, "remove", "active-section");
        }
    }
    async isItemExpandable() {
        return this.isExpandable;
    }
    handleActiveState() {
        if (this.internalActiveState) {
            this.setActiveClasses();
        }
    }
    handleKeyDown(event) {
        if (event.key === "Enter") {
            this.toggleSubmenu();
        }
    }
    componentDidLoad() {
        this.handleActiveState();
        if (this.isExpandable) {
            const sidebarItems = this.getSidebarMenuItems();
            this.handleExpandableMenu(sidebarItems);
        }
        // Listen for collapsed state changes
        this.updateIndicatorVariant();
        // Set up MutationObserver to watch for CSS custom property changes
        this.observeCollapsedState();
        // Extract text content for title attribute
        this.extractTitleText();
    }
    extractTitleText() {
        // Get the text content from the slot
        const slotElement = this.el.shadowRoot.querySelector("slot");
        if (slotElement) {
            const assignedNodes = slotElement.assignedNodes();
            this.titleText = assignedNodes
                .filter((node) => node.nodeType === Node.TEXT_NODE ||
                node.nodeType === Node.ELEMENT_NODE)
                .map((node) => node.textContent?.trim() || "")
                .join(" ")
                .trim();
        }
    }
    updateIndicatorVariant() {
        // Check the data attribute on this element
        const isCollapsed = this.el.hasAttribute("data-sidebar-collapsed");
        //this.indicatorVariant = isCollapsed ? 'dot' : 'number';
        if (this.numberIndicator > 0) {
            this.indicatorVariant = isCollapsed ? "dot" : "number";
        }
    }
    observeCollapsedState() {
        // Create a MutationObserver to watch for data-sidebar-collapsed attribute changes
        const observer = new MutationObserver(() => {
            this.updateIndicatorVariant();
        });
        observer.observe(this.el, {
            attributes: true,
            attributeFilter: ["data-sidebar-collapsed"],
        });
    }
    componentWillLoad() {
        this.internalActiveState = this.active;
        this.checkIfMenuItemIsNested();
        this.checkIfMenuItemIsSubMenu();
        this.setHref();
        // Set attribute to track if item has icon
        this.el.setAttribute("data-has-icon", this.icon ? "true" : "false");
        const sidebarItems = this.getSidebarMenuItems();
        if (sidebarItems.length !== 0) {
            this.isExpandable = true;
        }
        else {
            this.isExpandable = false;
        }
    }
    componentWillUpdate() {
        // If the active prop has been set to true and the internalActiveState has not been set to true yet
        if (this.active && !this.internalActiveState) {
            // Set the internal active state to true
            this.internalActiveState = this.active;
            // Emit the event to notify the parent Sidebar
            this.ifxSidebarNavigationItem.emit(this.el);
        }
    }
    render() {
        const isCollapsed = this.el.hasAttribute("data-sidebar-collapsed");
        const shouldHide = this.el.hasAttribute("data-hide-in-collapsed");
        return (index.h("div", { key: '4c2e8b287cf2471ace4e5402e7b60d97877a5d15', style: { display: shouldHide ? "none" : "block" } }, index.h("a", { key: '65b8dfd9ab322c6c541b7b969bb77e00bc837bbf', tabIndex: 1, onKeyDown: (event) => this.handleKeyDown(event), href: this.internalHref, onClick: () => this.toggleSubmenu(), target: this.target, class: `sidebar__nav-item ${!this.isNested && this.isExpandable ? "header__section" : ""} ${this.isSubMenuItem ? "submenu__item" : ""}`, title: this.titleText }, this.icon && (index.h("div", { key: '6b55cade26700a15646b3d7e9368beae70a89437', class: `sidebar__nav-item-icon-wrapper ${!this.showIcon && !isCollapsed ? "noIcon" : ""}` }, index.h("ifx-icon", { key: 'b5f9ea4e499ce2611c820b802d7f257e4ee37523', icon: this.icon }))), index.h("div", { key: 'a715cbcb2749233e574ee03ae935d0c28b8f1dd2', class: "sidebar__nav-item-label" }, index.h("slot", { key: '4910765171437c1bbe89a178a802f5aea045035c' })), (this.isExpandable || !isNaN(this.numberIndicator)) && (index.h("div", { key: '489f8ae6a18a05d2cf406a32f6ea86ee4c873ab6', class: "sidebar__nav-item-indicator", style: {
                display: !isCollapsed || this.icon ? "flex" : "none",
            } }, this.isExpandable && (index.h("span", { key: 'f7ad427f5c7978be7998cdb0d01e0f3d6a63be29', class: "item__arrow-wrapper" }, index.h("ifx-icon", { key: 'd1f389de583eed83a4b48c92c41b0fd5922e220f', icon: "chevron-down-16" }))), this.numberIndicator > 0 &&
            !this.isExpandable &&
            !this.isNested && (index.h("span", { key: '39417e2a21868b1a52e4b88f97b4935fa6d0d127', class: "item__number-indicator" }, index.h("ifx-indicator", { key: '0c98f155da6b33797390a959b0db5a07fdab705c', variant: this.indicatorVariant, number: this.numberIndicator })))))), this.isExpandable && index.h("ul", { key: '238379a9746046721f38edb1893f6aca64899905', class: "expandable__submenu" })));
    }
    static get watchers() { return {
        "active": [{
                "handleActiveChange": 0
            }],
        "numberIndicator": [{
                "handleNumberIndicatorChange": 0
            }]
    }; }
};
SidebarItem.style = sidebarItemCss();

exports.ifx_sidebar_item = SidebarItem;
//# sourceMappingURL=ifx-sidebar-item.entry.cjs.js.map

//# sourceMappingURL=ifx-sidebar-item.cjs.entry.js.map