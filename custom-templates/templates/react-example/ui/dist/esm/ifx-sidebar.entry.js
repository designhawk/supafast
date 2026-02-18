import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const sidebarCss = () => `:host{height:100%;display:inline-flex}.sidebar__container{box-sizing:border-box;display:inline-flex;flex-direction:column;align-items:flex-start;padding:0px;background-color:#FFFFFF;border-right:1px solid #EEEDED;width:264px;height:100%;font-family:var(--ifx-font-family)}.sidebar__container--collapsed{width:48px}.sidebar__container--collapsed .sidebar__hide-menu,.sidebar__container--collapsed .sidebar__nav-bar,.sidebar__container--collapsed .sidebar__nav-container{padding:12px 8px !important}.sidebar__container--collapsed .sidebar__nav-bar-logo-text,.sidebar__container--collapsed .sidebar__hide-menu-text{display:none !important}.sidebar__container--collapsed .sidebar__footer-container{display:none !important}.sidebar__container--collapsed .sidebar__nav-bar .sidebar__nav-bar-logo svg{width:32px !important;height:auto !important}.sidebar__container--collapsed .sidebar__nav-bar .sidebar__nav-bar-logo .sidebar__nav-bar-logo-text{display:none !important}.sidebar__container--collapsed .sidebar__hide-menu{padding:12px 16px;justify-content:center}.sidebar__container .sidebar__top-container{display:flex;flex-direction:column;align-items:center;padding:0px;flex:1 1 auto;order:0;z-index:0;width:100%;overflow-y:auto}.sidebar__container .sidebar__top-container .sidebar__nav-bar{box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;padding:12px 32px;background-color:#FFFFFF;flex:none;order:0;flex-grow:0;width:100%}.sidebar__container .sidebar__top-container .sidebar__nav-bar .sidebar__nav-bar-logo{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0px;gap:16px;flex:none;order:0;flex-grow:0}.sidebar__container .sidebar__top-container .sidebar__nav-bar .sidebar__nav-bar-logo .sidebar__nav-bar-logo-img{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0px;flex:none;order:0;flex-grow:0}.sidebar__container .sidebar__top-container .sidebar__nav-bar .sidebar__nav-bar-logo .sidebar__nav-bar-logo-img svg{width:91px;height:40px}.sidebar__container .sidebar__top-container .sidebar__nav-bar .sidebar__nav-bar-logo .sidebar__nav-bar-logo-text{font-style:normal;font-weight:600;font-size:1rem;line-height:1.5rem;display:flex;align-items:center;color:#1D1D1D;flex:none;order:1;flex-grow:0;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}.sidebar__container .sidebar__top-container .sidebar__nav-container{scrollbar-gutter:stable;box-sizing:border-box;display:flex;flex-direction:column;align-items:flex-start;padding:12px 32px;flex:1 1 auto;order:1;width:100%}.sidebar__container .sidebar__top-container .sidebar__nav-container ::slotted(*){width:100%}.sidebar__container .sidebar__footer-container{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:0px 32px;flex:none;order:1;align-self:stretch;flex-grow:1;z-index:1}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper{display:flex;flex-direction:column;align-items:flex-start;padding:24px 0px;gap:16px;border-top:1px solid #EEEDED;flex:none;order:0;flex-grow:0;width:100%}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-top-links{display:flex;align-items:flex-start;padding:0px;gap:12px;flex:none;order:0;align-self:stretch;flex-grow:0;flex-wrap:wrap}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-top-links a{font:400 0.875rem/1.25rem "Source Sans 3";display:flex;text-decoration:none;align-items:center;color:#1D1D1D;flex:none;flex-grow:0}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-top-links a:hover{color:#08665C}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-top-links a:focus{outline:none;color:#08665C}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-bottom-links{display:flex;flex-direction:column;align-items:center}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-bottom-links span{font:400 0.875rem/1.25rem "Source Sans 3";text-decoration:none;color:#575352;flex:none;order:1;flex-grow:0;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}.sidebar__container .sidebar__footer-container .sidebar__footer-wrapper .sidebar__footer-wrapper-bottom-links span:hover{cursor:initial}.sidebar__container .sidebar__hide-menu{display:flex;align-items:center;padding:12px 32px;box-sizing:border-box;width:100%;cursor:pointer;border-top:1px solid #EEEDED;border-bottom:1px solid #EEEDED;background-color:#FFFFFF;gap:16px}.sidebar__container .sidebar__hide-menu:hover{background-color:#F7F7F7}.sidebar__container .sidebar__hide-menu:focus{outline:2px solid #0A8276;outline-offset:-2px}.sidebar__container .sidebar__hide-menu-icon{display:flex;justify-content:center;align-items:center;width:24px;height:24px;flex-shrink:0}.sidebar__container .sidebar__hide-menu-icon ifx-icon{width:16px;height:16px;color:#1D1D1D}.sidebar__container .sidebar__hide-menu-text{font-style:normal;font-weight:400;font-size:1rem;line-height:1.5rem;color:#1D1D1D}`;

const ACTIVE = "active";
const ACTIVE_SECTION = "active-section";
const SIDEBAR_ITEM = ".sidebar__nav-item";
const Sidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxSidebarCollapseChange = createEvent(this, "ifxSidebarCollapseChange", 7);
    }
    get el() { return getElement(this); }
    applicationName = "";
    initialCollapse = true;
    showFooter = true;
    showHeader = true;
    termsOfUse = "#";
    imprint = "#";
    privacyPolicy = "#";
    target = "_blank";
    currentYear = new Date().getFullYear();
    copyrightText = "© 1999 - " + this.currentYear + " Infineon Technologies AG";
    internalTermsofUse = "";
    internalImprint = "";
    internalPrivacyPolicy = "";
    internalShowFooter = true;
    activeItem = null;
    collapsible = false;
    collapsed = false; // New property for initial collapsed state
    hideMenuLabel = "Hide Menu"; // New property for hide menu label
    isCollapsed = false;
    ifxSidebarCollapseChange;
    expandActiveItems() {
        const expandRecursively = async (parent) => {
            if ((await parent.isItemExpandable()) !== true) {
                if (parent.active)
                    return 1;
                return 0;
            }
            let currRes = 0;
            const children = this.getSidebarMenuItems(parent);
            for (let i = 0; i < children.length; i++) {
                currRes = Math.max(currRes, await expandRecursively(children[i]));
            }
            if (currRes > 0) {
                if (currRes == 1) {
                    parent.expandMenu(false);
                }
                else {
                    parent.expandMenu(true);
                }
            }
            return currRes ? currRes + 1 : 0;
        };
        const topLevelItems = this.getSidebarMenuItems(this.el);
        for (let i = 0; i < topLevelItems.length; i++) {
            expandRecursively(topLevelItems[i]);
        }
    }
    adjustTopBorder() {
        const children = this.el.children;
        if (!children.length)
            return;
        if (children[0].tagName === "IFX-SIDEBAR-TITLE") {
            children[0].shadowRoot
                .querySelector(".sidebar__title")
                .classList.add("no-top-border");
        }
        if (children[0].tagName === "IFX-SIDEBAR-ITEM" &&
            children[0].shadowRoot
                .querySelector("div > a")
                .classList.contains("header__section")) {
            children[0].shadowRoot
                .querySelector("div > a")
                .classList.add("no-top-border");
        }
        const allIfxTitles = this.el.querySelectorAll("ifx-sidebar-title");
        allIfxTitles.forEach((element) => {
            const nextSibling = element.nextElementSibling;
            if (nextSibling &&
                nextSibling.tagName === "IFX-SIDEBAR-ITEM" &&
                nextSibling.shadowRoot
                    .querySelector("div > a")
                    .classList.contains("header__section")) {
                nextSibling.shadowRoot
                    .querySelector("div > a")
                    .classList.add("no-top-border");
            }
        });
    }
    async addPaddingToTheLastItem(sidebarItem) {
        const sidebarChildItems = this.getSidebarMenuItems(sidebarItem);
        for (let i = 0; i < sidebarChildItems.length; i++) {
            const childItem = sidebarChildItems[i];
            const childNavItem = this.getNavItem(childItem.shadowRoot);
            const isChildItemExpandable = await childItem.isItemExpandable();
            if (isChildItemExpandable) {
                this.addPaddingToTheLastItem(childItem);
            }
            if (i === sidebarChildItems.length - 1) {
                this.handleClassList(childNavItem, "add", "extra-padding__bottom");
            }
        }
    }
    async adjustItemsPadding() {
        const sidebarItems = this.el.children;
        if (sidebarItems.length === 0)
            return;
        // Processing first item
        if (sidebarItems[0].tagName.toUpperCase() === "IFX-SIDEBAR-ITEM") {
            const isFirstSidebarItemExpandable = sidebarItems[0].isItemExpandable();
            if (isFirstSidebarItemExpandable) {
                this.addPaddingToTheLastItem(sidebarItems[0]);
            }
        }
        // Processing remaining items
        for (let i = 1; i < sidebarItems.length; i++) {
            const sidebarItem = sidebarItems[i];
            const previousSidebarItem = sidebarItems[i - 1];
            const previousSidebarNavItem = this.getNavItem(previousSidebarItem.shadowRoot);
            if (sidebarItem.tagName.toUpperCase() === "IFX-SIDEBAR-TITLE") {
                if (previousSidebarItem.tagName.toUpperCase() === "IFX-SIDEBAR-ITEM" &&
                    previousSidebarNavItem &&
                    !this.handleClassList(previousSidebarNavItem, "contains", "header__section")) {
                    this.handleClassList(previousSidebarNavItem, "add", "extra-padding__bottom");
                }
            }
            else if (sidebarItem.tagName.toUpperCase() === "IFX-SIDEBAR-ITEM") {
                const sidebarNavItem = this.getNavItem(sidebarItem.shadowRoot);
                if (previousSidebarItem.tagName.toUpperCase() === "IFX-SIDEBAR-ITEM" &&
                    previousSidebarNavItem &&
                    !this.handleClassList(previousSidebarNavItem, "contains", "header__section") &&
                    this.handleClassList(sidebarNavItem, "contains", "header__section")) {
                    this.handleClassList(previousSidebarNavItem, "add", "extra-padding__bottom");
                }
                const isSidebarItemExpandable = await sidebarItem.isItemExpandable();
                if (isSidebarItemExpandable) {
                    this.addPaddingToTheLastItem(sidebarItem);
                }
            }
        }
    }
    async componentDidLoad() {
        const framework = detectFramework();
        trackComponent("ifx-sidebar", await framework);
        this.adjustTopBorder();
        this.setInitialActiveItem();
        if (!this.initialCollapse) {
            this.expandActiveItems();
        }
        this.adjustItemsPadding();
        this.applyActiveSectionToParent(this.el);
        if (this.isCollapsed) {
            this.updateCollapsedState();
        }
    }
    getSidebarMenuItems(el = this.el) {
        const sidebarItems = el.querySelectorAll("ifx-sidebar-item");
        if (sidebarItems.length === 0) {
            return el.shadowRoot?.querySelectorAll("ifx-sidebar-item");
        }
        return sidebarItems;
    }
    setInitialActiveItem() {
        const handleItem = (parent) => {
            const children = this.getSidebarMenuItems(parent);
            let firstActiveFoundInGroup = false;
            children?.forEach((item) => {
                // If the item is active and it's the first active one in its group
                if (this.isActive(item) && !firstActiveFoundInGroup) {
                    firstActiveFoundInGroup = true;
                    this.handleBorderIndicatorDisplacement(item);
                }
                // If the item is active but it's not the first one in its group
                else if (this.isActive(item) && firstActiveFoundInGroup) {
                    item.setAttribute("active", "false"); // Set the 'active' attribute to 'false'
                }
                // If the clicked item is a menu and doesn't have any active children
                if (this.hasChildren(item.shadowRoot) &&
                    !this.hasActiveChild(item.shadowRoot)) {
                    const clickedItemSection = this.getActiveItemSection(item);
                    this.handleClassList(clickedItemSection, "remove", "active-section");
                }
                // If clickedItem is an opened menu and it contains another menu with 'active-section'
                if (this.hasChildren(item.shadowRoot) &&
                    this.isOpen(item.shadowRoot) &&
                    this.containsActiveSection(item)) {
                    const clickedItemSection = this.getActiveItemSection(item);
                    this.handleClassList(clickedItemSection, "remove", "active-section");
                }
                // Recursive call for child items
                if (this.hasChildren(item.shadowRoot)) {
                    handleItem(item.shadowRoot);
                }
            });
        };
        // Start with the top-level items
        const topLevelItems = this.getSidebarMenuItems(this.el);
        topLevelItems.forEach(handleItem);
    }
    handleClassList(el, type, className) {
        el.classList[type](className);
        if (type === "contains") {
            return el.classList.contains(className);
        }
    }
    getActiveItemSection(item) {
        return this.getNavItem(item.shadowRoot);
    }
    getNavItem(el) {
        return el?.querySelector(".sidebar__nav-item");
    }
    hasChildren(el) {
        return el?.querySelector(".item__arrow-wrapper") !== null ? true : false;
    }
    handleBorderIndicatorDisplacement(clickedItem) {
        // Recursive function to handle each item
        const handleItem = (item) => {
            // Check if current item is active or the one that was clicked
            const isActive = this.isActive(item) || item === clickedItem;
            if (isActive) {
                const activeMenuItemSection = this.getActiveItemSection(item);
                const isMenu = this.hasChildren(activeMenuItemSection);
                if (isMenu) {
                    this.handleClassList(activeMenuItemSection, "add", "active-section");
                }
            }
            // Recursive call for child items
            const children = this.getSidebarMenuItems(item);
            children.forEach(handleItem);
        };
        // Start with the top-level items
        const topLevelItems = this.getSidebarMenuItems(this.el);
        topLevelItems.forEach(handleItem);
    }
    removeActiveClassesRecursively() {
        const removeClasses = (root) => {
            const children = this.querySidebarItems(root);
            children.forEach((child) => {
                const sidebarItem = child.shadowRoot.querySelector(SIDEBAR_ITEM);
                sidebarItem.classList.remove(ACTIVE_SECTION);
                sidebarItem.classList.remove(ACTIVE);
                if (child.getAttribute("active")) {
                    child.setAttribute("active", "false");
                }
                removeClasses(child.shadowRoot);
            });
        };
        removeClasses(this.el);
        if (this.activeItem) {
            this.activeItem.setAttribute("active", "false");
        }
        this.activeItem = null;
    }
    hasActiveChild(menuItem) {
        const children = this.getSidebarMenuItems(menuItem);
        if (children) {
            for (const child of children) {
                // If the child item is active
                if (this.isActive(child)) {
                    return true;
                }
                // If the child item has children, recurse into them
                else if (this.hasChildren(child.shadowRoot)) {
                    if (this.hasActiveChild(child.shadowRoot)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    handleSidebarItemInteraction(event) {
        // This method can be used to handle the ifxSidebarMenu event
        // Get the element that triggered the event
        const clickedItem = event.detail;
        // If the clicked item is not a menu OR is a menu that has an active child
        if (!this.hasChildren(clickedItem.shadowRoot) ||
            this.hasActiveChild(clickedItem.shadowRoot)) {
            this.handleBorderIndicatorDisplacement(clickedItem);
        }
        // If the clicked item is a menu and doesn't have any active children
        if (this.hasChildren(clickedItem.shadowRoot) &&
            !this.hasActiveChild(clickedItem.shadowRoot)) {
            const clickedItemSection = this.getActiveItemSection(clickedItem);
            this.handleClassList(clickedItemSection, "remove", "active-section");
        }
        // If clickedItem is an opened menu and it contains another menu with 'active-section'
        if (this.hasChildren(clickedItem.shadowRoot) &&
            this.isOpen(clickedItem.shadowRoot) &&
            this.containsActiveSection(clickedItem)) {
            const clickedItemSection = this.getActiveItemSection(clickedItem);
            this.handleClassList(clickedItemSection, "remove", "active-section");
        }
    }
    isOpen(menuItem) {
        return this.getNavItem(menuItem).classList.contains("open") ? true : false;
    }
    containsActiveSection(menuItem) {
        const children = this.getSidebarMenuItems(menuItem);
        for (const child of children) {
            if (this.getNavItem(child.shadowRoot).classList.contains("active-section") ||
                (this.hasChildren(child.shadowRoot) &&
                    this.containsActiveSection(child.shadowRoot))) {
                this.handleClassList(child, "add", "active-section");
                return true;
            }
        }
        return false;
    }
    applyActiveSectionToParent(el) {
        // Get all submenus of the given element
        const subMenus = this.getSidebarMenuItems(el);
        subMenus?.forEach((menu) => {
            // If this submenu has an active child, add active-section class to it
            if (this.hasActiveChild(menu.shadowRoot)) {
                const menuItemSection = this.getActiveItemSection(menu);
                this.handleClassList(menuItemSection, "add", "active-section");
            }
            // Apply to submenu's children
            this.applyActiveSectionToParent(menu.shadowRoot);
        });
    }
    querySidebarItems(el) {
        return el.querySelectorAll("ifx-sidebar-item");
    }
    isActive(iteratedComponent) {
        const activeAttributeValue = iteratedComponent.getAttribute("active");
        const isActive = activeAttributeValue === "true";
        return isActive;
    }
    handleSidebarItemActivated(event) {
        this.removeActiveClassesRecursively();
        this.activeItem = event.detail;
        this.activeItem.setAttribute("active", "true");
        // Get the parent element of the activated item
        const parent = this.getNavItem(event.detail.parentElement.parentElement.parentElement);
        if (parent) {
            this.handleClassList(parent, "add", "active-section");
        }
    }
    componentWillLoad() {
        this.internalTermsofUse = this.termsOfUse.trim();
        this.internalPrivacyPolicy = this.privacyPolicy.trim();
        this.internalImprint = this.imprint.trim();
        this.internalShowFooter = this.showFooter;
        if (this.internalShowFooter &&
            !this.internalImprint &&
            !this.internalPrivacyPolicy &&
            !this.internalTermsofUse &&
            !this.copyrightText) {
            this.internalShowFooter = false;
        }
        // Set initial collapsed state from prop - independent of collapsible
        this.isCollapsed = Boolean(this.collapsed);
    }
    handleCollapsibleChange(_newValue) {
        // Force re-render when collapsible changes
        this.forceUpdate();
    }
    forceUpdate() {
        // Trigger a re-render
        this.el.forceUpdate?.() ||
            this.el.setAttribute("data-force-update", Date.now().toString());
    }
    async toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.updateCollapsedState();
        // Emit event after state change
        this.ifxSidebarCollapseChange.emit({ collapsed: this.isCollapsed });
    }
    async collapse() {
        this.isCollapsed = true;
        this.updateCollapsedState();
        // Emit event after state change
        this.ifxSidebarCollapseChange.emit({ collapsed: this.isCollapsed });
    }
    async expand() {
        this.isCollapsed = false;
        this.updateCollapsedState();
        // Emit event after state change
        this.ifxSidebarCollapseChange.emit({ collapsed: this.isCollapsed });
    }
    handleCollapsedPropChange(newValue) {
        this.isCollapsed = newValue;
        this.updateCollapsedState();
        // Emit event when prop changes
        this.ifxSidebarCollapseChange.emit({ collapsed: this.isCollapsed });
    }
    updateCollapsedState() {
        // Set CSS custom properties to handle Shadow DOM components
        if (this.isCollapsed) {
            this.el.style.setProperty("--ifx-sidebar-item-text-display", "none");
            this.el.style.setProperty("--ifx-sidebar-item-without-icon-display", "none");
            this.el.style.setProperty("--ifx-sidebar-title-display", "none");
            this.el.style.setProperty("--ifx-sidebar-title-show-in-collapsed-display", "block");
            this.el.style.setProperty("--ifx-sidebar-title-label-display", "none");
            this.el.style.setProperty("--ifx-sidebar-title-padding", "0");
            this.el.style.setProperty("--ifx-sidebar-item-flex-direction", "column");
            // Set attributes on all sidebar items
            this.setSidebarItemAttributes(true);
        }
        else {
            this.el.style.removeProperty("--ifx-sidebar-item-text-display");
            this.el.style.removeProperty("--ifx-sidebar-item-without-icon-display");
            this.el.style.removeProperty("--ifx-sidebar-title-display");
            this.el.style.removeProperty("--ifx-sidebar-title-show-in-collapsed-display");
            this.el.style.removeProperty("--ifx-sidebar-title-label-display");
            this.el.style.removeProperty("--ifx-sidebar-title-padding");
            this.el.style.removeProperty("--ifx-sidebar-item-flex-direction");
            // Remove attributes from all sidebar items
            this.setSidebarItemAttributes(false);
        }
    }
    setSidebarItemAttributes(collapsed) {
        const allSidebarItems = this.el.querySelectorAll("ifx-sidebar-item");
        allSidebarItems.forEach((item) => {
            if (collapsed) {
                item.setAttribute("data-sidebar-collapsed", "true");
                if (!item.icon) {
                    item.setAttribute("data-hide-in-collapsed", "true");
                }
            }
            else {
                item.removeAttribute("data-sidebar-collapsed");
                item.removeAttribute("data-hide-in-collapsed");
            }
        });
    }
    handleHideMenuClick = () => {
        this.toggleCollapse();
    };
    handleHideMenuKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            this.toggleCollapse();
        }
    };
    render() {
        return (h("div", { key: 'c239ad0070907704a6d7e7ac9a0f8a1753886c7b', "aria-label": "a navigation sidebar", "aria-value": this.applicationName, class: `sidebar__container ${this.isCollapsed ? "sidebar__container--collapsed" : ""}` }, h("div", { key: '5708b4c6c414005e855b2a87f7e88616bc1c90ba', class: "sidebar__top-container" }, this.showHeader && (h("div", { key: '50c1267357b95bb294c114919258657912da688b', class: "sidebar__nav-bar" }, h("div", { key: '3c1da79f88122d57bb55aabef83337d6d682ed5f', class: "sidebar__nav-bar-logo" }, h("div", { key: '83ab4faf4c9df839cf9e451eb09b4d7d7730ef73', class: "sidebar__nav-bar-logo-img" }, h("svg", { key: 'ee181510114d6b6461f36dfaa10209c4fa7f62a8', width: "91", height: "40", viewBox: "0 0 91 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("g", { key: '3cc601132adac183ee6cb7ee54555350bd3ac759', "clip-path": "url(#clip0_2396_2480)" }, h("path", { key: '7d729a637463bb8ce44273ae8217b4246660d1f0', d: "M67.691 26.7766C71.0884 26.7766 72.1461 23.1841 72.1461 19.8802C72.1461 15.4536 70.2871 13.1441 67.691 13.1441C64.4219 13.1441 63.2681 16.7367 63.3001 19.9443C63.3322 23.1199 64.2296 26.7766 67.691 26.7766ZM66.0244 19.8481C66.0244 18.533 66.0244 15.4536 67.691 15.4536C69.4859 15.4536 69.4218 18.5009 69.4218 19.9123C69.4218 21.2595 69.4218 24.5313 67.7551 24.5313C65.9603 24.4992 66.0244 21.2274 66.0244 19.8481ZM57.8195 26.7766C59.1976 26.7766 60.3835 26.2313 61.5053 25.0445L60.5117 23.1841C59.7425 24.018 58.9733 24.4671 58.0438 24.4671C57.2746 24.4671 56.6336 24.018 56.249 23.2482C55.9285 22.5746 55.8644 21.8048 55.8644 20.9708V20.7142H61.6335V20.1368C61.6335 17.282 61.2809 15.7102 60.3835 14.5234C59.7104 13.6253 58.7169 13.1441 57.499 13.1441C56.2169 13.1441 55.1593 13.7215 54.39 14.8442C53.5567 16.0631 53.2042 17.699 53.2042 19.9443C53.1721 24.2426 54.8708 26.7766 57.8195 26.7766ZM57.531 15.2612C58.172 15.2612 58.5566 15.614 58.813 16.1914C59.0053 16.7046 59.1015 17.5707 59.1015 18.5971H55.8644C55.8964 16.3197 56.3772 15.2612 57.531 15.2612ZM74.2614 26.4559H76.7614V16.8329C77.3703 16.0952 78.0754 15.6782 78.5882 15.6782C78.9087 15.6782 79.2292 15.7423 79.4215 15.9989C79.6138 16.2876 79.71 16.7046 79.71 17.699V26.4559H82.21V16.5442C82.21 15.6782 82.1138 14.8121 81.601 14.1706C81.1523 13.5932 80.4472 13.2404 79.5497 13.2404C78.3959 13.2404 77.2101 13.914 76.569 14.6838C76.537 14.0102 76.3126 13.3687 76.2485 13.1441L73.9089 13.7536C74.0371 14.4593 74.2294 15.3253 74.2294 16.8971V26.4559H74.2614ZM45.2236 14.6838C45.1915 14.0102 44.9672 13.3687 44.9031 13.1441L42.5634 13.7536C42.6916 14.4593 42.8839 15.3253 42.8839 16.8971V26.4238H45.3838V16.8008C45.9928 16.0631 46.6979 15.6461 47.2107 15.6461C47.5312 15.6461 47.8517 15.7102 48.044 15.9669C48.2363 16.2555 48.3325 16.6725 48.3325 17.6669V26.4238H50.8324V16.5442C50.8324 15.6782 50.7363 14.8121 50.2235 14.1706C49.7748 13.5932 49.0696 13.2404 48.1722 13.2404C47.0505 13.2404 45.8646 13.914 45.2236 14.6838ZM14.6473 9.07042C16.1216 9.07042 17.3075 7.88359 17.3075 6.40807C17.3075 4.93256 16.1216 3.74573 14.6473 3.74573C13.173 3.74573 11.9871 4.93256 11.9871 6.40807C11.9871 7.88359 13.173 9.07042 14.6473 9.07042ZM26.9227 26.4559V16.5442C26.9227 15.6782 26.8265 14.8121 26.3137 14.1706C25.865 13.5932 25.1599 13.2404 24.2625 13.2404C23.1087 13.2404 21.9228 13.914 21.2818 14.6838C21.2497 14.0102 21.0254 13.3687 20.9613 13.1441L18.6536 13.7857C18.7818 14.4913 18.9741 15.3574 18.9741 16.9291V26.4559H21.4741V16.8329C22.0831 16.0952 22.7882 15.6782 23.301 15.6782C23.6215 15.6782 23.942 15.7423 24.1343 15.9989C24.3266 16.2876 24.4227 16.7046 24.4227 17.699V26.4559H26.9227ZM38.4289 8.36474C37.4994 8.36474 36.7622 9.10249 36.7622 10.0327C36.7622 10.9629 37.4994 11.7007 38.3968 11.7007C39.3263 11.7007 40.0634 10.9629 40.0634 10.0327C40.0634 9.10249 39.3263 8.36474 38.4289 8.36474ZM13.4614 26.4559H15.9614V10.8346L13.4614 11.1554V26.4559ZM33.8777 9.90441C34.3264 9.90441 34.7751 10.0648 35.0635 10.2893L35.7687 8.33266C35.0956 7.85151 34.3584 7.62698 33.429 7.62698C32.788 7.62698 32.1149 7.78736 31.5059 8.26851C30.897 8.78173 30.256 9.80818 30.256 11.7328C30.256 12.5667 30.288 13.4328 30.288 13.4328H29.4226V15.6461H30.288V26.4238H32.8521V15.6782H34.743L35.2238 13.4649H32.8841V11.4762C32.8841 10.5139 33.2687 9.90441 33.8777 9.90441ZM37.1468 26.4559H39.6788V13.2404L37.1468 13.5611V26.4559Z", fill: "#005DA9" }), h("path", { key: '5396cdb1b1f4a84d858b0ba44aac33b78944f9e7', d: "M77.0816 33.5126C68.6203 36.0146 58.3321 37.1052 48.2682 37.1052C22.7239 37.1052 6.24986 29.5993 5.09604 19.6877C4.67938 15.9668 7.59599 12.3422 12.4677 9.26285C11.6023 8.62132 11.0575 7.59488 11.0254 6.44012C3.97427 10.161 0 15.0366 0 19.9764C0 30.9145 19.5188 40.1525 48.5246 39.7676C58.6205 39.6393 67.0498 38.1958 74.6778 35.6939C83.7482 32.7428 89.4532 28.5087 90.8313 26.6483C89.1968 28.1238 85.3186 31.0748 77.0816 33.5126ZM23.2687 4.38723C24.9674 3.80985 27.3712 3.0721 27.3712 3.0721C34.1339 1.21166 41.6017 0.121063 48.5566 0.185215C40.544 -0.295931 33.2365 0.185215 26.8584 1.33997C26.8584 1.33997 24.743 1.69281 22.4675 2.27018C22.4675 2.27018 21.3777 2.55887 20.7047 2.75133C20.0316 2.94379 19.1021 3.2004 19.1021 3.2004C18.4611 3.39286 17.8201 3.6174 17.1791 3.84193C17.8201 4.48346 18.2047 5.31745 18.2368 6.27974C19.3586 5.76652 21.5059 4.99668 23.2687 4.38723Z", fill: "#E30034" })), h("defs", { key: 'd90bff2e464d1d1bd5fb4728102270fe6c20380c' }, h("clipPath", { key: '697afc515bd29b1d1e3c443822309fe1a84625bd', id: "clip0_2396_2480" }, h("rect", { key: '3222c7aa23d640c5f9f697dce238d8e50c679efb', width: "91", height: "40", fill: "white" })))), " "), h("div", { key: 'fc5f60a2d2cda3d55bece23758b22c185096a08d', class: "sidebar__nav-bar-logo-text" }, this.applicationName)))), this.collapsible && (h("div", { key: 'c05879aef9825792dc3250a16d714714fa3c3f89', class: "sidebar__hide-menu", onClick: this.handleHideMenuClick, onKeyDown: this.handleHideMenuKeyDown, tabIndex: 0, role: "button", "aria-label": this.isCollapsed ? "Expand sidebar" : "Collapse sidebar" }, h("div", { key: '09ee35bdb76e91ef555fbfcb8a224679a74d95ef', class: "sidebar__hide-menu-icon" }, h("ifx-icon", { key: 'c563ee3a53680fe14c545e8abf662b4167fd2945', icon: "menu-16" })), h("div", { key: '694404c443f10051a9083dec01ec53f77dea7b1d', class: "sidebar__hide-menu-text" }, this.hideMenuLabel))), h("div", { key: 'bfddf14a6a94e0d80cadb584d33fba018e488ad8', class: "sidebar__nav-container" }, h("slot", { key: '0f5c49dac55e75a8c48d46759aec3c9b21570d83' }))), this.internalShowFooter && (h("div", { key: '42d012813e0bd2fd6224dd6a1822ab292a7e465b', class: "sidebar__footer-container" }, h("div", { key: 'cbbd88ab57bfd290cd6ff8d79fce77618d263039', class: "sidebar__footer-wrapper" }, (this.internalTermsofUse ||
            this.internalImprint ||
            this.internalPrivacyPolicy) && (h("div", { key: 'eff16c68554f61870a01e3ac4acad7c1b73b53b5', class: "sidebar__footer-wrapper-top-links" }, this.internalTermsofUse !== "" && (h("a", { key: 'fb2a350a964b6544ca0e40ac54d6577aa0853293', target: this.target, href: this.internalTermsofUse }, "Terms of use")), this.internalImprint !== "" && (h("a", { key: '8795b8796ea329dc3ec66295fa11f6c50eaeb0e5', target: this.target, href: this.internalImprint }, "Imprint")), this.internalPrivacyPolicy !== "" && (h("a", { key: '1ab4bf591d546f8c4158cb46476867118bf2cac9', target: this.target, href: this.internalPrivacyPolicy }, "Privacy policy")))), this.copyrightText && (h("div", { key: '04867a7f4c5b9be773859ebd3d7a0361f6c91df6', class: "sidebar__footer-wrapper-bottom-links" }, h("span", { key: 'afbf02d227792d166b144175ababcab02b26d886' }, this.copyrightText))))))));
    }
    static get watchers() { return {
        "collapsible": [{
                "handleCollapsibleChange": 0
            }],
        "collapsed": [{
                "handleCollapsedPropChange": 0
            }]
    }; }
};
Sidebar.style = sidebarCss();

export { Sidebar as ifx_sidebar };
//# sourceMappingURL=ifx-sidebar.entry.js.map

//# sourceMappingURL=ifx-sidebar.entry.js.map