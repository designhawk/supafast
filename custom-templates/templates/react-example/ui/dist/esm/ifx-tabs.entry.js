import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const tabsCss = () => `:host{display:flex}.tabs{display:flex;font-family:var(--ifx-font-family);width:100%}.tabs.horizontal{flex-direction:column}.tabs-container{display:flex;align-items:center;position:relative;width:100%;gap:8px}.scroll-button{flex-shrink:0;z-index:10;transition:all 0.3s ease-in-out}.scroll-button.hidden{pointer-events:none}.scroll-button.scroll-left.hidden{width:0;min-width:0;max-width:0;margin:0;padding:0;border:0;opacity:0;overflow:hidden}.scroll-button.scroll-right.hidden{visibility:hidden;pointer-events:none}.tabs.vertical{flex-direction:row}.tabs-list{display:flex;list-style:none;padding:0;margin:0;position:relative;font-weight:600}.tabs-list.scrollable{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;white-space:nowrap;scrollbar-width:none;-ms-overflow-style:none}.tabs-list.scrollable::-webkit-scrollbar{display:none}.tabs-list:focus-within .active-border{display:none}.active-border{content:"";position:absolute;transition:left 0.3s ease-in-out, top 0.3s ease-in-out, height 0.3s ease-in-out}.tabs.horizontal .active-border{bottom:0;left:0;height:2px;background-color:#0A8276}.tabs.vertical .tabs-list{flex-direction:column;border-bottom:none}.tabs.vertical .tab-content{padding-top:0px;padding-left:32px}.tabs:not(.vertical) .tab-item.full-width{flex:1}.tabs:not(.vertical).full-width-enabled .scroll-button{display:none}.tabs:not(.vertical).full-width-enabled .tabs-list{flex:1}.tabs:not(.vertical).full-width-enabled .tabs-list.scrollable{overflow-x:visible}.tab-item{display:flex;align-items:center;justify-content:center;gap:8px;padding:8px 16px;cursor:pointer;position:relative;white-space:nowrap;flex-shrink:0;max-width:50%;overflow:hidden;text-overflow:ellipsis}@media (max-width: 768px){.tab-item{font-size:0.875rem;padding:8px 8px}}.tab-item.icon__right{flex-direction:row-reverse;justify-content:flex-end}.tab-item:hover{color:#0A8276}.tab-item:active,.tab-item.active{color:#0A8276}.tab-item:focus,.tab-item.focus{outline:2px solid #0A8276;outline-offset:-2px;border-radius:2px}.tab-item:focus+.active-border,.tab-item.focus+.active-border{display:none}.tab-item.disabled{color:#BFBBBB;pointer-events:none}.tabs.vertical .tab-item{border-right:2px solid transparent;min-width:7em}.tabs.vertical .active-border{left:0;top:0;width:2px;background-color:#0A8276}.tab-content{padding-top:24px;padding-left:0px;flex-grow:1}.tabs.small .tab-item{font-size:0.875rem}`;

const IfxTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxChange = createEvent(this, "ifxChange", 7);
    }
    get el() { return getElement(this); }
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
    static get watchers() { return {
        "activeTabIndex": [{
                "activeTabIndexChanged": 0
            }]
    }; }
};
IfxTabs.style = tabsCss();

export { IfxTabs as ifx_tabs };
//# sourceMappingURL=ifx-tabs.entry.js.map

//# sourceMappingURL=ifx-tabs.entry.js.map