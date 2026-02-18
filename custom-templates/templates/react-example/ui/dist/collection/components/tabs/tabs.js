import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class IfxTabs {
    el;
    orientation = "horizontal";
    activeTabIndex = 0;
    fullWidth = false;
    internalOrientation;
    internalActiveTabIndex = 0;
    tabObjects = [];
    canScrollLeft = false;
    canScrollRight = false;
    internalFocusedTabIndex = 0;
    tabRefs = [];
    tabHeaderRefs = [];
    tabsListElement;
    tabFocusHandlers = new Map();
    ifxChange;
    updateBorderOnWindowResize() {
        this.updateBorderAndFocus();
        this.updateScrollButtons();
    }
    setActiveAndFocusedTab(index) {
        if (index >= this.tabObjects.length) {
            index = this.tabObjects.length - 1;
        }
        if (index < 0) {
            index = 0;
        }
        if (!this.tabObjects[index]?.disabled) {
            this.internalActiveTabIndex = index;
            this.internalFocusedTabIndex = index;
            // Scroll the active tab into view
            setTimeout(() => this.scrollTabIntoView(index), 0);
        }
    }
    handleTabHeaderChange(e) {
        const tabIndex = e.target.getAttribute("slot").replace("tab-", "");
        this.tabObjects[tabIndex].header = e.detail;
        this.tabObjects = [...this.tabObjects];
    }
    activeTabIndexChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.setActiveAndFocusedTab(newValue);
        }
    }
    componentWillLoad() {
        this.internalOrientation =
            this.orientation.toLowerCase() === "vertical" ? "vertical" : "horizontal";
        this.onSlotChange();
        this.setActiveAndFocusedTab(this.activeTabIndex);
        this.updateTabStyles();
    }
    updateTabStyles() {
        this.tabHeaderRefs.forEach((tab, index) => {
            tab.classList.toggle("active", index === this.internalActiveTabIndex);
            tab.setAttribute("aria-selected", index === this.internalActiveTabIndex ? "true" : "false");
        });
    }
    // needed for smooth border transition
    reRenderBorder() {
        const borderElement = this.el.shadowRoot.querySelector(".active-border");
        if (borderElement && this.tabHeaderRefs[this.internalActiveTabIndex]) {
            if (this.orientation === "horizontal") {
                borderElement.style.left = `${this.tabHeaderRefs[this.internalActiveTabIndex].offsetLeft}px`;
                borderElement.style.width = `${this.tabHeaderRefs[this.internalActiveTabIndex].offsetWidth}px`;
                borderElement.style.top = "";
                borderElement.style.height = "";
            }
            else {
                borderElement.style.top = `${this.tabHeaderRefs[this.internalActiveTabIndex].offsetTop}px`;
                borderElement.style.height = `${this.tabHeaderRefs[this.internalActiveTabIndex].offsetHeight}px`;
                borderElement.style.left = "";
                borderElement.style.width = "";
            }
        }
    }
    // when a slot is removed / added
    onSlotChange() {
        const tabs = this.el.querySelectorAll("ifx-tab");
        this.tabObjects = Array.from(tabs).map((tab) => {
            return {
                header: tab?.header,
                disabled: tab?.disabled === true,
                icon: tab?.icon,
                iconPosition: tab?.iconPosition,
            };
        });
        this.tabRefs = Array.from(tabs);
        this.tabRefs.forEach((tab, index) => {
            tab.setAttribute("slot", `tab-${index}`);
        });
        // Re-setup focus listeners when tabs change
        setTimeout(() => {
            this.setupTabFocusListeners();
            this.updateScrollButtons();
        }, 0);
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-tabs", await framework);
        }
        this.updateBorderAndFocus();
        this.updateScrollButtons();
        // Add keyboard event listeners for each tab header
        this.setupTabFocusListeners();
    }
    setupTabFocusListeners() {
        // Clear any existing handlers
        this.tabFocusHandlers.clear();
        this.tabHeaderRefs.forEach((tab, index) => {
            const handler = () => {
                this.internalFocusedTabIndex = index;
            };
            // Store the handler so we can remove it later
            this.tabFocusHandlers.set(tab, handler);
            tab.addEventListener("focus", handler);
        });
    }
    disconnectedCallback() {
        // Remove keyboard event listeners when component is unmounted
        this.tabFocusHandlers.forEach((handler, tab) => {
            tab.removeEventListener("focus", handler);
        });
        this.tabFocusHandlers.clear();
    }
    componentDidUpdate() {
        this.updateBorderAndFocus();
        this.updateScrollButtons();
    }
    updateBorderAndFocus() {
        this.reRenderBorder();
        this.updateTabFocusability();
    }
    updateTabFocusability() {
        this.tabHeaderRefs.forEach((tab, index) => {
            tab.tabIndex = index === this.internalActiveTabIndex ? 0 : -1;
        });
    }
    focusNextTab() {
        let nextIndex = this.internalFocusedTabIndex + 1;
        while (nextIndex < this.tabHeaderRefs.length &&
            this.tabObjects[nextIndex].disabled) {
            nextIndex++;
        }
        if (nextIndex >= 0 && nextIndex < this.tabHeaderRefs.length) {
            this.internalFocusedTabIndex = nextIndex;
            this.tabHeaderRefs[nextIndex].focus();
        }
    }
    focusPreviousTab() {
        let prevIndex = this.internalFocusedTabIndex - 1;
        while (prevIndex >= 0 && this.tabObjects[prevIndex].disabled) {
            prevIndex--;
        }
        if (prevIndex >= 0 && prevIndex < this.tabHeaderRefs.length) {
            this.internalFocusedTabIndex = prevIndex;
            this.tabHeaderRefs[prevIndex].focus();
        }
    }
    getTabItemClass(index) {
        const isActive = index === this.internalActiveTabIndex && !this.tabObjects[index].disabled;
        const isDisabled = this.tabObjects[index].disabled;
        const iconPosition = this.tabObjects[index].iconPosition;
        return `tab-item ${this.fullWidth ? "full-width" : ""} ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""} ${"icon__" + iconPosition}`;
    }
    handleClick(tab, index) {
        if (!tab.disabled) {
            const previousTabIndex = this.internalActiveTabIndex;
            this.internalActiveTabIndex = index;
            this.ifxChange.emit({ previousTab: previousTabIndex, currentTab: index });
            // Center the clicked tab
            setTimeout(() => this.scrollTabIntoView(index), 0);
        }
    }
    handleKeyDown(ev) {
        if (ev.key === "Tab") {
            if (ev.shiftKey) {
                // Shift + Tab
                if (this.internalFocusedTabIndex === 0) {
                    // Allow default behavior to move focus out of component
                    return;
                }
                else {
                    ev.preventDefault();
                    this.focusPreviousTab();
                }
            }
            else {
                // Tab
                if (this.internalFocusedTabIndex === this.tabHeaderRefs.length - 1) {
                    // Allow default behavior to move focus out of component
                    return;
                }
                else {
                    ev.preventDefault();
                    this.focusNextTab();
                }
            }
        }
        else if (ev.key === "Enter") {
            const path = ev.composedPath();
            const isTabHeader = path.some((el) => this.tabHeaderRefs.includes(el));
            if (!isTabHeader) {
                return;
            }
            if (this.internalFocusedTabIndex !== -1 &&
                !this.tabObjects[this.internalFocusedTabIndex].disabled) {
                const previousTabIndex = this.internalActiveTabIndex;
                this.internalActiveTabIndex = this.internalFocusedTabIndex;
                this.ifxChange.emit({
                    previousTab: previousTabIndex,
                    currentTab: this.internalFocusedTabIndex,
                });
                // Center the activated tab
                setTimeout(() => this.scrollTabIntoView(this.internalFocusedTabIndex), 0);
            }
        }
    }
    updateScrollButtons() {
        // Reset scroll buttons if conditions not met
        if (this.shouldDisableScrolling()) {
            this.canScrollLeft = false;
            this.canScrollRight = false;
            return;
        }
        const { scrollLeft, scrollWidth, clientWidth } = this.tabsListElement;
        this.canScrollLeft = scrollLeft > 0;
        this.canScrollRight = scrollLeft < scrollWidth - clientWidth;
    }
    shouldDisableScrolling() {
        return (!this.tabsListElement ||
            this.internalOrientation === "vertical" ||
            this.fullWidth);
    }
    scrollLeft() {
        if (!this.canScrollLeft || !this.tabsListElement)
            return;
        const scrollAmount = Math.min(200, this.tabsListElement.scrollLeft);
        this.tabsListElement.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
    scrollRight() {
        if (!this.canScrollRight || !this.tabsListElement)
            return;
        const maxScroll = this.tabsListElement.scrollWidth - this.tabsListElement.clientWidth;
        const currentScroll = this.tabsListElement.scrollLeft;
        const scrollAmount = Math.min(200, maxScroll - currentScroll);
        this.tabsListElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
    onTabsListScroll() {
        this.updateScrollButtons();
    }
    scrollTabIntoView(index) {
        if (this.shouldDisableScrolling() || !this.tabHeaderRefs[index]) {
            return;
        }
        const tabElement = this.tabHeaderRefs[index];
        const container = this.tabsListElement;
        const tabRect = this.getTabCenterInfo(tabElement);
        const containerRect = this.getContainerCenterInfo(container);
        // Only scroll if the tab is not already reasonably centered
        if (Math.abs(tabRect.center - containerRect.center) > 50) {
            const desiredScrollLeft = this.calculateCenteredScrollPosition(tabRect, containerRect);
            container.scrollTo({ left: desiredScrollLeft, behavior: "smooth" });
        }
    }
    getTabCenterInfo(tabElement) {
        const left = tabElement.offsetLeft;
        const width = tabElement.offsetWidth;
        return {
            left,
            width,
            center: left + width / 2,
        };
    }
    getContainerCenterInfo(container) {
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;
        return {
            scrollLeft,
            width,
            center: scrollLeft + width / 2,
        };
    }
    calculateCenteredScrollPosition(tabRect, containerRect) {
        const desiredScrollLeft = tabRect.center - containerRect.width / 2;
        const maxScrollLeft = this.tabsListElement.scrollWidth - containerRect.width;
        return Math.max(0, Math.min(desiredScrollLeft, maxScrollLeft));
    }
    render() {
        return (h("div", { key: 'c83e230d8b775b619cc3bb5ff5c64946d023ede4', "aria-label": "navigation tabs", class: `tabs ${this.internalOrientation} ${this.fullWidth ? "full-width-enabled" : ""}` }, this.internalOrientation === "horizontal" ? (h("div", { class: "tabs-container" }, h("ifx-icon-button", { shape: "round", variant: "tertiary", icon: "chevronLeft16", size: "s", disabled: false, "aria-label": "Scroll tabs left", onClick: () => this.scrollLeft(), class: `scroll-button scroll-left ${!this.canScrollLeft ? "hidden" : ""}` }), h("ul", { role: "tablist", class: "tabs-list scrollable", ref: (el) => (this.tabsListElement = el), onScroll: () => this.onTabsListScroll() }, this.tabObjects?.map((tab, index) => (h("li", { class: this.getTabItemClass(index), ref: (el) => (this.tabHeaderRefs[index] = el), onMouseDown: (event) => event.preventDefault(), onClick: () => this.handleClick(tab, index), "aria-selected": index === this.internalActiveTabIndex ? "true" : "false", "aria-disabled": tab.disabled ? "true" : "false", role: "tab" }, tab?.icon ? h("ifx-icon", { icon: tab.icon }) : "", tab?.header))), h("div", { class: "active-border" })), h("ifx-icon-button", { shape: "round", variant: "tertiary", icon: "chevronRight16", size: "s", disabled: false, "aria-label": "Scroll tabs right", onClick: () => this.scrollRight(), class: `scroll-button scroll-right ${!this.canScrollRight ? "hidden" : ""}` }))) : (h("ul", { role: "tablist", class: "tabs-list" }, this.tabObjects?.map((tab, index) => (h("li", { class: this.getTabItemClass(index), ref: (el) => (this.tabHeaderRefs[index] = el), onMouseDown: (event) => event.preventDefault(), onClick: () => this.handleClick(tab, index), "aria-selected": index === this.internalActiveTabIndex ? "true" : "false", "aria-disabled": tab.disabled ? "true" : "false", role: "tab" }, tab?.icon ? h("ifx-icon", { icon: tab.icon }) : "", tab?.header))), h("div", { class: "active-border" }))), h("div", { key: 'fee72b044a7dcb5e7a3bfb1b7fdbfb1c0500b780', class: "tab-content" }, Array.from(this.tabObjects).map((_, index) => (h("div", { style: {
                display: index === this.internalActiveTabIndex ? "block" : "none",
            } }, h("slot", { name: `tab-${index}` })))))));
    }
    static get is() { return "ifx-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["tabs.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["tabs.css"]
        };
    }
    static get properties() {
        return {
            "orientation": {
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
                "attribute": "orientation",
                "defaultValue": "\"horizontal\""
            },
            "activeTabIndex": {
                "type": "number",
                "mutable": true,
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
                "attribute": "active-tab-index",
                "defaultValue": "0"
            },
            "fullWidth": {
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
                "attribute": "full-width",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "internalOrientation": {},
            "internalActiveTabIndex": {},
            "tabObjects": {},
            "canScrollLeft": {},
            "canScrollRight": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxChange",
                "name": "ifxChange",
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
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "activeTabIndex",
                "methodName": "activeTabIndexChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "resize",
                "method": "updateBorderOnWindowResize",
                "target": "window",
                "capture": false,
                "passive": true
            }, {
                "name": "tabHeaderChange",
                "method": "handleTabHeaderChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "slotchange",
                "method": "onSlotChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=tabs.js.map
