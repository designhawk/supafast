import { h, } from "@stencil/core";
export class NavbarProfile {
    el;
    showLabel = true;
    href = "";
    imageUrl = "";
    target = "_self";
    alt = "";
    userName = "";
    internalHref = "";
    isMenuItem = false;
    hasChildNavItems = false;
    internalImageUrl = { type: "", value: "" };
    defaultProfileImage = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="#0A8276"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 14C21.7909 14 20 15.7909 20 18C20 20.2091 21.7909 22 24 22C26.2091 22 28 20.2091 28 18C28 15.7909 26.2091 14 24 14ZM18 18C18 14.6863 20.6863 12 24 12C27.3137 12 30 14.6863 30 18C30 21.3137 27.3137 24 24 24C20.6863 24 18 21.3137 18 18ZM16.5869 28.3984C18.2683 27.0179 20.7466 26 24 26C27.2541 26 29.7324 27.0209 31.4134 28.4024C33.0562 29.7526 34 31.5119 34 33V35C34 35.5523 33.5523 36 33 36H15C14.4477 36 14 35.5523 14 35V33C14 31.5074 14.9433 29.7479 16.5869 28.3984ZM17.8561 29.9441C16.5187 31.0421 16 32.2826 16 33V34H32V33C32 32.2881 31.4818 31.0474 30.1436 29.9476C28.8436 28.8791 26.8219 28 24 28C21.1774 28 19.1557 28.8771 17.8561 29.9441Z" fill="white"/>
</svg>`;
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
    componentWillLoad() {
        this.setHref();
        this.setImage();
        const sidebarItems = this.getNavbarItems();
        if (sidebarItems.length !== 0) {
            this.hasChildNavItems = true;
        }
        else {
            this.hasChildNavItems = false;
        }
    }
    componentDidLoad() {
        this.setProfileGap();
        if (this.hasChildNavItems) {
            const navItems = this.getNavbarItems();
            this.appendNavItemToMenu(navItems);
        }
    }
    async hideComponent() {
        this.el.style.display = "none";
    }
    async showComponent() {
        this.el.style.display = "";
    }
    handleClassList(el, type, className) {
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
    relocateUsingSlot(navItems) {
        navItems.forEach((item) => {
            item.setAttribute("slot", "first__layer");
        });
    }
    appendNavItemToMenu(navItems) {
        this.relocateUsingSlot(navItems);
    }
    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    setImage() {
        if (this.imageUrl.toLowerCase().trim() === "") {
            this.internalImageUrl = { type: undefined, value: "" };
        }
        else if (this.isValidHttpUrl(this.imageUrl)) {
            this.internalImageUrl = { type: "url", value: this.imageUrl };
        }
        else {
            this.internalImageUrl = { type: "initials", value: this.imageUrl };
        }
    }
    setHref() {
        if (this.href.toLowerCase().trim() === "") {
            this.internalHref = undefined;
        }
        else
            this.internalHref = this.href;
    }
    setProfileGap() {
        const innerContentWrapper = this.el.shadowRoot.querySelector(".inner__content-wrapper");
        const labelWrapper = this.el.shadowRoot.querySelector(".label__wrapper");
        const labelSlot = labelWrapper.querySelector("slot");
        const nodes = labelSlot.assignedNodes();
        if (!nodes.length) {
            this.handleClassList(innerContentWrapper, "add", "no-gap");
        }
        else {
            this.handleClassList(innerContentWrapper, "remove", "no-gap");
        }
    }
    getItemMenu() {
        const menu = this.el.shadowRoot.querySelector(".navbar-menu");
        return menu;
    }
    closeItemMenu() {
        const itemMenu = this.getItemMenu();
        const menuItem = this.getNavBarItem();
        if (itemMenu) {
            this.handleClassList(itemMenu, "remove", "open");
            this.handleClassList(menuItem, "remove", "open");
        }
    }
    toggleItemMenu() {
        if (!this.internalHref) {
            if (this.isMenuItem && this.hasChildNavItems) {
                const itemMenu = this.getItemMenu();
                this.handleClassList(itemMenu, "add", "right");
            }
            if (this.hasChildNavItems) {
                const itemMenu = this.getItemMenu();
                const menuItem = this.getNavBarItem();
                this.handleClassList(itemMenu, "toggle", "open");
                this.handleClassList(menuItem, "toggle", "open");
            }
        }
    }
    itemHasNestedItems() {
        const childNavItem = this.el.shadowRoot.querySelector("ifx-navbar-item");
        if (childNavItem) {
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        return (h("div", { key: '2472c2d2c3979dd4d2079af8bc62c38ae22e11d1', class: "container" }, h("a", { key: '26042f883822cfde92aa06178cadeb2be58d9a4f', href: this.internalHref, target: this.target, onClick: () => this.toggleItemMenu(), class: `navbar__item ${!this.showLabel ? "removeLabel" : ""} ${this.hasChildNavItems ? "isParent" : ""}` }, h("div", { key: '5513fd57a450ee52263c0cee6039f5256e059e86', class: "inner__content-wrapper" }, h("div", { key: '4084e9be36842bb3ea4f2dbfec40554f82902f27', class: `navbar__container-right-content-navigation-item-icon-wrapper` }, this.userName.trim() !== "" && (h("div", { key: 'e76c618c775d85ee8bc4c4f58cb5368d37d655ba', class: "username__tooltip" }, this.userName)), this.internalImageUrl.type !== "initials" && (h("img", { key: 'f824cde2016158120f3d3a9b0accd078d3475df4', src: this.internalImageUrl.type === "url"
                ? this.internalImageUrl.value
                : `data:image/svg+xml,${encodeURIComponent(this.defaultProfileImage)}`, alt: this.alt })), this.internalImageUrl.type === "initials" && (h("div", { key: 'b2b1df5d9d5575f477d1889b3af0107075884a07', class: "initials__wrapper" }, h("span", { key: 'f15e81ee638b3e2439d01fe01fd79c4bbc80d07a', class: "initials" }, this.internalImageUrl.value)))), h("span", { key: '491bc60ab10f2f4b19357886ce49cf1d61382d96', class: "label__wrapper" }, h("slot", { key: '18b7408eba900a45b05282d4d8bd3200037e3c87', onSlotchange: () => this.setProfileGap() })))), this.hasChildNavItems && (h("ul", { key: '5ca63c8241ecb9ec03ff3999bb0e00d0e9472d11', class: "navbar-menu rightSideItemMenu" }, " ", h("slot", { key: '821d1e655debae2fe2d9fc30cdb310358b713938', name: "first__layer" }), " "))));
    }
    static get is() { return "ifx-navbar-profile"; }
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
    static get assetsDirs() { return ["assets"]; }
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
            "imageUrl": {
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
                "attribute": "image-url",
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
            "alt": {
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
                "attribute": "alt",
                "defaultValue": "\"\""
            },
            "userName": {
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
                "attribute": "user-name",
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "internalHref": {},
            "isMenuItem": {},
            "hasChildNavItems": {},
            "internalImageUrl": {}
        };
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
//# sourceMappingURL=navbar-profile.js.map
