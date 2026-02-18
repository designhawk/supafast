import { h, } from "@stencil/core";
export class NavbarItem {
    el;
    showLabel = true;
    icon = "";
    href = "";
    target = "_self";
    hideOnMobile = true;
    internalHref = "";
    isMenuItem = false;
    hasChildNavItems = false;
    isSidebarMenuItem = false;
    itemPosition;
    ifxNavItem;
    numberIndicator;
    dotIndicator = false;
    handleOutsideClick(event) {
        const path = event.composedPath();
        const itemMenu = this.getItemMenu();
        if (itemMenu) {
            if (itemMenu.classList.contains("open")) {
                if (!path.includes(this.el)) {
                    this.closeItemMenu();
                }
            }
        }
    }
    async hideComponent() {
        this.el.style.display = "none";
    }
    async showComponent() {
        this.el.style.display = "";
    }
    async toggleChildren(action) {
        const itemMenu = this.getItemMenu();
        const arrowIcon = this.getChevronDownIconWrapper();
        if (itemMenu) {
            this.handleClassList(arrowIcon, action, "hide");
            this.handleClassList(itemMenu, action, "itemInMobileMenu");
        }
    }
    async moveChildComponentsIntoSubLayerMenu() {
        const subLayerMenu = this.getItemMenu();
        if (subLayerMenu) {
            const subLayerMenuIsOpened = this.handleClassList(subLayerMenu, "contains", "open");
            if (subLayerMenuIsOpened) {
                const navbarItem = this.getNavBarItem();
                const subLayerBackButton = this.getSubLayerBackButton();
                this.handleClassList(navbarItem, "add", "layer__item-parent");
                this.handleClassList(subLayerBackButton, "add", "show");
                this.ifxNavItem.emit({ component: this.el, action: "hideFirstLayer" });
            }
        }
        const navItems = this.el.querySelectorAll('[slot="first__layer"]');
        this.isSidebarMenuItem = true;
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].setAttribute("slot", "second__layer");
            navItems[i].moveChildComponentsIntoSubLayerMenu();
        }
    }
    getSubLayerBackButton() {
        const sublayerBackButton = this.el.shadowRoot.querySelector(".sub__layer-back-button");
        return sublayerBackButton;
    }
    async toggleFirstLayerItem(actionOne, actionTwo) {
        const navbarItem = this.getNavBarItem();
        const secondLayerMenu = this.getSubLayerMenu();
        const subLayerBackButton = this.getSubLayerBackButton();
        this.handleClassList(subLayerBackButton, [actionOne], "show");
        this.handleClassList(navbarItem, [actionTwo], "hide");
        this.handleClassList(secondLayerMenu, [actionTwo], "remove__margin");
    }
    openSubLayerMenu() {
        if (this.hasChildNavItems) {
            const subLayerBackButton = this.getSubLayerBackButton();
            const rightArrowIcon = this.getRightArrowIcon();
            const navbarItem = this.getNavBarItem();
            const subLayerMenu = this.getSubLayerMenu();
            const slotName = this.el.getAttribute("slot");
            this.handleClassList(subLayerBackButton, "add", "show");
            this.handleClassList(rightArrowIcon, "add", "hide");
            this.handleClassList(navbarItem, "add", "layer__item-parent");
            this.handleClassList(subLayerMenu, "add", "open");
            if (slotName.toLowerCase() === "second__layer") {
                this.ifxNavItem.emit({
                    component: this.el,
                    parent: this.el.parentElement,
                    action: "hideSecondLayer",
                });
                this.handleClassList(navbarItem, "remove", "menuItem");
            }
            else {
                this.ifxNavItem.emit({ component: this.el, action: "hideFirstLayer" });
            }
        }
    }
    async addMenuItemClass() {
        const navbarItem = this.getNavBarItem();
        this.handleClassList(navbarItem, "add", "menuItem");
        const rightArrowIcon = this.getRightArrowIcon();
        if (this.hasChildNavItems) {
            this.handleClassList(rightArrowIcon, "remove", "hide");
        }
    }
    async moveChildComponentsBackIntoNavbar() {
        const subLayerBackButton = this.getSubLayerBackButton();
        const navbarItem = this.getNavBarItem();
        const secondLayerMenu = this.getSubLayerMenu();
        this.handleClassList(subLayerBackButton, "remove", "show");
        this.handleClassList(navbarItem, "remove", "layer__item-parent");
        this.handleClassList(secondLayerMenu, "remove", "remove__margin");
        this.ifxNavItem.emit({ component: this.el, action: "show" });
        const navItems = this.el.querySelectorAll('[slot="second__layer"]');
        this.isSidebarMenuItem = false;
        this.showComponent();
        this.handleClassList(navbarItem, "remove", "hide");
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].setAttribute("slot", "first__layer");
            navItems[i].moveChildComponentsBackIntoNavbar();
            navItems[i].addMenuItemClass();
            navItems[i].returnToFirstLayer();
        }
    }
    getRightArrowIcon() {
        const menuItemRightIconWrapper = this.el.shadowRoot.querySelector(".menuItemRightIconWrapper");
        return menuItemRightIconWrapper;
    }
    getChevronDownIconWrapper() {
        const arrowIcon = this.el.shadowRoot.querySelector(".navItemIconWrapper");
        return arrowIcon;
    }
    async returnToFirstLayer() {
        const subLayerBackButton = this.getSubLayerBackButton();
        const navbarItem = this.getNavBarItem();
        const rightArrowIcon = this.getRightArrowIcon();
        const subLayerMenu = this.getSubLayerMenu();
        const slotName = this.el.getAttribute("slot");
        this.handleClassList(subLayerBackButton, "remove", "show");
        this.handleClassList(navbarItem, "remove", "layer__item-parent");
        this.handleClassList(subLayerMenu, "remove", "open");
        if (this.hasChildNavItems) {
            this.handleClassList(rightArrowIcon, "remove", "hide");
        }
        if (slotName.toLowerCase() === "second__layer") {
            this.ifxNavItem.emit({
                component: this.el,
                parent: this.el.parentElement,
                action: "returnToSecondLayer",
            });
            this.handleClassList(navbarItem, "add", "menuItem");
        }
        else {
            this.ifxNavItem.emit({ component: this.el, action: "return" });
        }
    }
    componentWillLoad() {
        this.setHref();
        this.checkIfItemIsNested();
        this.checkIfItemHasChildren();
        this.removeEmptyItem();
    }
    componentDidLoad() {
        this.handleItemGap();
        this.handleLabelWrapper();
        if (this.hasChildNavItems) {
            const navItems = this.getNavbarItems();
            this.relocateItemsToFirstlayer(navItems);
        }
    }
    componentDidUpdate() {
        const navbarItem = this.getNavBarItem();
        const isLayerItemParent = this.handleClassList(navbarItem, "contains", "layer__item-parent");
        if (this.isSidebarMenuItem && isLayerItemParent) {
            const rightArrowIcon = this.getRightArrowIcon();
            this.handleClassList(rightArrowIcon, "add", "hide");
        }
    }
    async setMenuItemPosition() {
        if (this.isMenuItem && this.hasChildNavItems) {
            const menuPosition = this.getItemMenuPosition();
            if (menuPosition === "left") {
                this.itemPosition = "left";
            }
            else if (menuPosition === "right") {
                this.itemPosition = "right";
            }
        }
    }
    handleClassList(el, type, className) {
        if (!el)
            return false;
        el.classList[type](className);
        if (type === "contains") {
            return el.classList.contains(className);
        }
    }
    getNavbarItems() {
        const navItems = this.el.querySelectorAll("ifx-navbar-item");
        return navItems;
    }
    getNavBarItem() {
        const navItem = this.el.shadowRoot.querySelector(".navbar__item");
        return navItem;
    }
    getSubLayerMenu() {
        const subLayerMenu = this.el.shadowRoot.querySelector(".sub__layer-menu");
        return subLayerMenu;
    }
    relocateItemsToFirstlayer(navItems) {
        navItems.forEach((item) => {
            item.setAttribute("slot", "first__layer");
        });
    }
    setHref() {
        if (this.href.toLowerCase().trim() === "") {
            this.internalHref = undefined;
        }
        else
            this.internalHref = this.href;
    }
    checkIfItemIsNested() {
        const parentElement = this.el.parentElement;
        if (parentElement.tagName.toUpperCase() === "IFX-NAVBAR-ITEM" ||
            parentElement.tagName.toUpperCase() === "IFX-NAVBAR-PROFILE") {
            this.isMenuItem = true;
            return;
        }
        else {
            this.isMenuItem = false;
        }
    }
    checkIfItemHasChildren() {
        const sidebarItems = this.getNavbarItems();
        if (sidebarItems.length !== 0) {
            this.hasChildNavItems = true;
        }
        else {
            this.hasChildNavItems = false;
        }
    }
    async setItemSideSpecifications() {
        const menuItem = this.el;
        const itemMenu = this.getItemMenu();
        const slotValue = menuItem.getAttribute("slot");
        if (slotValue.toLowerCase().trim() === "right-item") {
            this.handleClassList(itemMenu, "add", "rightSideItemMenu");
        }
        return true;
    }
    getItemMenu() {
        const menu = this.el.shadowRoot.querySelector(".navbar-menu");
        return menu;
    }
    getParentItemMenu() {
        return this.el.parentElement?.shadowRoot.querySelector(".navbar-menu");
    }
    closeItemMenu() {
        const itemMenu = this.getItemMenu();
        const menuItem = this.getNavBarItem();
        if (itemMenu) {
            this.handleClassList(itemMenu, "remove", "open");
            this.handleClassList(menuItem, "remove", "open");
        }
    }
    getItemMenuPosition() {
        let parentElement = this.el;
        while (parentElement) {
            if (parentElement.tagName === "IFX-NAVBAR-PROFILE" ||
                parentElement.slot === "right-item") {
                return "left";
            }
            parentElement =
                parentElement.parentElement || parentElement.getRootNode().host;
        }
        return "right";
    }
    toggleItemMenu() {
        const slotName = this.el.getAttribute("slot").toLowerCase();
        if (slotName === "mobile-menu-top" || slotName === "second__layer") {
            this.openSubLayerMenu();
        }
        else if (!this.internalHref) {
            if (this.hasChildNavItems) {
                const itemMenu = this.getItemMenu();
                const menuItem = this.getNavBarItem();
                this.handleClassList(itemMenu, "toggle", "open");
                this.handleClassList(menuItem, "toggle", "open");
                if (this.isMenuItem &&
                    !this.isSidebarMenuItem &&
                    itemMenu.classList.contains("open")) {
                    this.handleNestedLayerMenu({ type: "mouseenter" });
                }
            }
            else {
                const parentItemMenu = this.getParentItemMenu();
                if (parentItemMenu) {
                    this.handleClassList(parentItemMenu, "toggle", "open");
                }
            }
        }
    }
    handleNestedLayerMenu(e) {
        if (this.isMenuItem && this.hasChildNavItems && !this.isSidebarMenuItem) {
            const itemMenu = this.getItemMenu();
            const menuPosition = this.getItemMenuPosition();
            const type = e.type.toUpperCase();
            if (type === "MOUSEENTER") {
                this.handleClassList(itemMenu, "add", "open");
                if (menuPosition === "left") {
                    this.handleClassList(itemMenu, "add", "left");
                }
                else if (menuPosition === "right") {
                    this.handleClassList(itemMenu, "add", "right");
                }
            }
            if (type === "MOUSELEAVE") {
                this.handleClassList(itemMenu, "remove", "open");
                if (menuPosition === "left") {
                    this.handleClassList(itemMenu, "remove", "left");
                }
                else if (menuPosition === "right") {
                    this.handleClassList(itemMenu, "remove", "right");
                }
            }
            if (type === "FOCUSOUT") {
                const isStillInComponent = this.isFocusWithinComponent(e.relatedTarget);
                if (!isStillInComponent) {
                    this.handleClassList(itemMenu, "remove", "open");
                    if (menuPosition === "left") {
                        this.handleClassList(itemMenu, "remove", "left");
                    }
                    else if (menuPosition === "right") {
                        this.handleClassList(itemMenu, "remove", "right");
                    }
                }
            }
        }
    }
    isFocusWithinComponent(relatedTarget) {
        if (!relatedTarget)
            return false;
        const target = relatedTarget;
        const isInLightDOM = this.el.contains(target);
        const isInShadowDOM = this.el.shadowRoot?.contains(target);
        const rootNode = target.getRootNode();
        if (rootNode instanceof ShadowRoot) {
            const shadowRoot = rootNode;
            if (this.el.contains(shadowRoot.host)) {
                return true;
            }
        }
        return isInLightDOM || isInShadowDOM;
    }
    handleLabelWrapper() {
        const labelWrapper = this.el.shadowRoot.querySelector(".label__wrapper");
        const navItem = this.getNavBarItem();
        const slot = labelWrapper.querySelector("slot");
        if (!slot.assignedNodes().length) {
            navItem.classList.add("removeLabel");
        }
        else if (this.showLabel && navItem.classList.contains("removeLabel")) {
            navItem.classList.remove("removeLabel");
        }
    }
    handleItemGap() {
        const innerContentWrapper = this.el.shadowRoot.querySelector(".navbar__item");
        const numberIndicatorWrapper = innerContentWrapper.querySelector(".navbar__container-right-content-navigation-item-icon-wrapper");
        if (this.numberIndicator || this.dotIndicator) {
            this.handleClassList(numberIndicatorWrapper, "add", "no-gap");
        }
        else {
            this.handleClassList(numberIndicatorWrapper, "remove", "no-gap");
        }
    }
    removeEmptyItem() {
        const hostElement = this.el.shadowRoot.host;
        if (!this.showLabel && !this.icon) {
            this.handleClassList(hostElement, "add", "hidden");
        }
    }
    handleKeyDown(event) {
        if (event.key === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            this.toggleItemMenu();
        }
    }
    render() {
        return (h("div", { key: '209936e149c3ce077bd61dc0c429eeff59ddc94a', tabIndex: 1, class: "container", onMouseLeave: (e) => this.handleNestedLayerMenu(e), onKeyDown: (e) => this.handleKeyDown(e), onMouseEnter: (e) => this.handleNestedLayerMenu(e) }, h("div", { key: 'ac74d160fb0c927840b898408b3bf981ea367999', class: "sub__layer-back-button" }, h("div", { key: '9d0dda4db9396199b34aca21ef96b35755a96cfb', class: "back__button-wrapper", onClick: () => this.returnToFirstLayer() }, h("ifx-icon", { key: '357904e0eb3e967028948b84a8129e629e34babc', icon: "arrow-left-16" }), h("span", { key: 'bbbb7d94e36061000495b64b7ff392cd2a0d9946' }, "Back"))), h("a", { key: '274875cf839faecb2601798d09f1c43c6493faea', tabindex: -1, href: this.internalHref, target: this.target, onClick: () => this.toggleItemMenu(), class: `navbar__item ${this.isSidebarMenuItem ? "sidebarMenuItem" : ""} ${!this.showLabel ? "removeLabel" : ""} ${this.isMenuItem ? "menuItem" : ""} ${this.hasChildNavItems ? "isParent" : ""}` }, h("div", { key: 'a910bdc5a3d125047300aa3d555b881215b64beb', class: "inner__content-wrapper" }, h("div", { key: 'f4f55b0e17f63b5c5bc316fe4db4341cb51d60cc', class: `navbar__container-right-content-navigation-item-icon-wrapper ${!this.icon ? "removeWrapper" : ""}` }, this.icon && h("ifx-icon", { key: 'e82d0859ec61ead03bdd8966bd02e8afa51f8ec3', icon: this.icon }), this.icon && !this.showLabel && !isNaN(this.numberIndicator) && (h("div", { key: '9a930d739b99c6fc5ecf0b6f62ce040c20e6a26a', class: "number__indicator-wrapper" }, h("ifx-indicator", { key: 'b35a864ff304ac7a8c421c1bd28f697fc4eabc96', variant: "number", number: this.numberIndicator }))), this.icon &&
            !this.showLabel &&
            !this.numberIndicator &&
            this.dotIndicator && h("div", { key: 'eec0aeeff384926599f8a40460ddd2f2b407f352', class: "dot__indicator-wrapper" })), this.itemPosition === "left" &&
            this.hasChildNavItems &&
            this.isMenuItem && (h("div", { key: 'c33ca63875b9ec8befd144feba915fd3f6b40603', class: "menuItemLeftIconWrapper" }, h("ifx-icon", { key: 'd69b706e18c3c6893ece23684f1a129e1f998193', icon: "chevron-left-16" }))), h("span", { key: '5779b8086cbd9c5c0cef392bdac31789dde13a1c', class: "label__wrapper" }, h("slot", { key: '83c7de72b80d53bde58592e66db2f372250eaa81' }))), this.showLabel &&
            this.numberIndicator &&
            !isNaN(this.numberIndicator) ? (h("div", { class: "number__indicator-wrapper" }, h("ifx-indicator", { variant: "number", number: this.numberIndicator }))) : (""), this.showLabel && !this.numberIndicator && this.dotIndicator ? (h("ifx-indicator", { variant: "dot" })) : (""), h("div", { key: '500332a377d02d5283787e9605bc1cd5b85ce635', class: `navItemIconWrapper ${this.hasChildNavItems && !this.isMenuItem && !this.isSidebarMenuItem ? "" : "hide"}` }, h("ifx-icon", { key: '667474c22d1142f29f6166a7d8d1905dfb89d345', icon: "chevron-down-16" })), h("div", { key: 'be0073b6edc9e315da67323dd15bb3c4f69ca2c5', class: `menuItemRightIconWrapper ${(this.itemPosition === "right" && this.hasChildNavItems && this.isMenuItem) || (this.isSidebarMenuItem && this.hasChildNavItems) ? "" : "hide"}` }, h("ifx-icon", { key: '794ef399a135a86d1f9fe5c6d78b83aa10135206', icon: "chevron-right-16" }))), this.hasChildNavItems && !this.isSidebarMenuItem && (h("ul", { key: 'd28936cadd623fa9e5bfdacf413167fe9a2cfccb', class: "navbar-menu" }, " ", h("slot", { key: 'e2059c77d6ae10ffa66c01210bc42ada44f98106', name: "first__layer" }), " ")), this.isSidebarMenuItem && (h("ul", { key: '1185f3aa883a57207b9f94b7cd40e5597afa1a60', class: "sub__layer-menu" }, " ", h("slot", { key: 'b57e848fe103886d8d96f6967c5ea74156f27d00', name: "second__layer" }), " "))));
    }
    static get is() { return "ifx-navbar-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["navbar-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["navbar-item.css"]
        };
    }
    static get properties() {
        return {
            "showLabel": {
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
                "attribute": "show-label",
                "defaultValue": "true"
            },
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
            "hideOnMobile": {
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
                "attribute": "hide-on-mobile",
                "defaultValue": "true"
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
            "dotIndicator": {
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
                "attribute": "dot-indicator",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "internalHref": {},
            "isMenuItem": {},
            "hasChildNavItems": {},
            "isSidebarMenuItem": {},
            "itemPosition": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxNavItem",
                "name": "ifxNavItem",
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
            "hideComponent": {
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
            "showComponent": {
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
            "toggleChildren": {
                "complexType": {
                    "signature": "(action: any) => Promise<void>",
                    "parameters": [{
                            "name": "action",
                            "type": "any",
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
            "moveChildComponentsIntoSubLayerMenu": {
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
            "toggleFirstLayerItem": {
                "complexType": {
                    "signature": "(actionOne: any, actionTwo: any) => Promise<void>",
                    "parameters": [{
                            "name": "actionOne",
                            "type": "any",
                            "docs": ""
                        }, {
                            "name": "actionTwo",
                            "type": "any",
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
            "addMenuItemClass": {
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
            "moveChildComponentsBackIntoNavbar": {
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
            "returnToFirstLayer": {
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
            "setMenuItemPosition": {
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
            "setItemSideSpecifications": {
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
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "handleOutsideClick",
                "target": "document",
                "capture": false,
                "passive": true
            }];
    }
}
//# sourceMappingURL=navbar-item.js.map
