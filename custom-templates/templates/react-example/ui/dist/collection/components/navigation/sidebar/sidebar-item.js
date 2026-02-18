import { h, } from "@stencil/core";
export class SidebarItem {
    el;
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
        return (h("div", { key: '4c2e8b287cf2471ace4e5402e7b60d97877a5d15', style: { display: shouldHide ? "none" : "block" } }, h("a", { key: '65b8dfd9ab322c6c541b7b969bb77e00bc837bbf', tabIndex: 1, onKeyDown: (event) => this.handleKeyDown(event), href: this.internalHref, onClick: () => this.toggleSubmenu(), target: this.target, class: `sidebar__nav-item ${!this.isNested && this.isExpandable ? "header__section" : ""} ${this.isSubMenuItem ? "submenu__item" : ""}`, title: this.titleText }, this.icon && (h("div", { key: '6b55cade26700a15646b3d7e9368beae70a89437', class: `sidebar__nav-item-icon-wrapper ${!this.showIcon && !isCollapsed ? "noIcon" : ""}` }, h("ifx-icon", { key: 'b5f9ea4e499ce2611c820b802d7f257e4ee37523', icon: this.icon }))), h("div", { key: 'a715cbcb2749233e574ee03ae935d0c28b8f1dd2', class: "sidebar__nav-item-label" }, h("slot", { key: '4910765171437c1bbe89a178a802f5aea045035c' })), (this.isExpandable || !isNaN(this.numberIndicator)) && (h("div", { key: '489f8ae6a18a05d2cf406a32f6ea86ee4c873ab6', class: "sidebar__nav-item-indicator", style: {
                display: !isCollapsed || this.icon ? "flex" : "none",
            } }, this.isExpandable && (h("span", { key: 'f7ad427f5c7978be7998cdb0d01e0f3d6a63be29', class: "item__arrow-wrapper" }, h("ifx-icon", { key: 'd1f389de583eed83a4b48c92c41b0fd5922e220f', icon: "chevron-down-16" }))), this.numberIndicator > 0 &&
            !this.isExpandable &&
            !this.isNested && (h("span", { key: '39417e2a21868b1a52e4b88f97b4935fa6d0d127', class: "item__number-indicator" }, h("ifx-indicator", { key: '0c98f155da6b33797390a959b0db5a07fdab705c', variant: this.indicatorVariant, number: this.numberIndicator })))))), this.isExpandable && h("ul", { key: '238379a9746046721f38edb1893f6aca64899905', class: "expandable__submenu" })));
    }
    static get is() { return "ifx-sidebar-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["sidebar-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["sidebar-item.css"]
        };
    }
    static get properties() {
        return {
            "icon": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "icon",
                "defaultValue": "\"\""
            },
            "href": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "href",
                "defaultValue": "\"\""
            },
            "target": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "target",
                "defaultValue": "\"_self\""
            },
            "numberIndicator": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "number-indicator"
            },
            "active": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "active",
                "defaultValue": "false"
            },
            "isActionItem": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "is-action-item",
                "defaultValue": "false"
            },
            "handleItemClick": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "(item: HTMLElement) => void",
                    "resolved": "(item: HTMLElement) => void",
                    "references": {
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            }
        };
    }
    static get states() {
        return {
            "showIcon": {},
            "showIconWrapper": {},
            "internalHref": {},
            "isExpandable": {},
            "isNested": {},
            "isSubMenuItem": {},
            "indicatorVariant": {},
            "internalActiveState": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxSidebarMenu",
                "name": "ifxSidebarMenu",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "ifxSidebarNavigationItem",
                "name": "ifxSidebarNavigationItem",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "ifxSidebarActionItem",
                "name": "ifxSidebarActionItem",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "setActiveClasses": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "expandMenu": {
                "complexType": {
                    "signature": "(ac: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "ac",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "isItemExpandable": {
                "complexType": {
                    "signature": "() => Promise<boolean>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "active",
                "methodName": "handleActiveChange"
            }, {
                "propName": "numberIndicator",
                "methodName": "handleNumberIndicatorChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "consoleError",
                "method": "handleConsoleError",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=sidebar-item.js.map
