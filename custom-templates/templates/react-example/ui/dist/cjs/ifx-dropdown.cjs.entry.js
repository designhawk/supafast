'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');
var popper = require('./popper-Dmp8OTYh.js');

const dropdownCss = () => `:host{display:inline-block}`;

const Dropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxOpen = index.createEvent(this, "ifxOpen", 7);
        this.ifxClose = index.createEvent(this, "ifxClose", 7);
        this.ifxDropdown = index.createEvent(this, "ifxDropdown", 7);
    }
    placement = "bottom-start";
    defaultOpen = false;
    internalIsOpen = false;
    noAppendToBody = false;
    ifxOpen;
    ifxClose;
    ifxDropdown;
    disabled;
    noCloseOnOutsideClick = false;
    noCloseOnMenuClick = false;
    get el() { return index.getElement(this); }
    trigger;
    menu;
    // Popper instance for positioning
    popperInstance;
    handleOutsideClick(event) {
        const target = event.target;
        if (!this.noCloseOnOutsideClick &&
            !this.el.contains(target) &&
            !this.menu.contains(target)) {
            this.closeDropdown();
        }
    }
    handleFocusOutside(event) {
        const target = event.target;
        if (this.internalIsOpen &&
            !this.el.contains(target) &&
            !this.menu.contains(target)) {
            this.closeDropdown();
        }
    }
    handleTriggerClick = () => {
        if (!this.internalIsOpen)
            this.openDropdown();
        else
            this.closeDropdown();
    };
    handleTriggerKeyDown = (e) => {
        const key = e.key;
        if (key === "Tab" && this.internalIsOpen && !e.shiftKey) {
            e.preventDefault();
            this.focusFirstItem();
        }
    };
    handleMenuClick = () => {
        if (!this.noCloseOnMenuClick)
            this.closeDropdown();
    };
    getItemFocusables() {
        if (!this.menu)
            return [];
        const hosts = Array.from(this.menu.querySelectorAll("ifx-dropdown-item"));
        return hosts
            .filter((h) => !(h.getAttribute("hide") === "true" || h.classList.contains("hide")))
            .map((h) => h.shadowRoot?.querySelector("a"))
            .filter((el) => !!el);
    }
    handleMenuKeyDown = (e) => {
        const items = this.getItemFocusables();
        if (!items.length)
            return;
        const i = items.indexOf(document.activeElement);
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                items[(i + 1) % items.length].focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                items[(i - 1 + items.length) % items.length].focus();
                break;
            case "Home":
                e.preventDefault();
                items[0].focus();
                break;
            case "End":
                e.preventDefault();
                items[items.length - 1].focus();
                break;
            case "Enter":
            case " ":
            case "Spacebar":
                e.preventDefault();
                document.activeElement?.click();
                break;
            case "Escape":
                e.preventDefault();
                this.closeDropdown();
                this.trigger?.focus();
                break;
            case "Tab":
                if (e.shiftKey && i === 0) {
                    e.preventDefault();
                    this.closeDropdown();
                    this.trigger?.focus();
                }
                break;
        }
    };
    componentWillLoad() {
        //maybe not needed
        this.updateSlotContent();
        this.watchHandlerIsOpen(this.defaultOpen, this.internalIsOpen);
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-dropdown", await framework);
        }
    }
    watchHandlerIsOpen(newValue, oldValue) {
        if (newValue !== oldValue && newValue !== this.internalIsOpen) {
            if (newValue) {
                this.openDropdown();
            }
            else {
                this.closeDropdown();
            }
        }
    }
    watchHandlerDisabled(newValue) {
        if (this.trigger) {
            this.trigger.disabled = newValue;
        }
    }
    watchHandlerSlot() {
        this.updateSlotContent();
    }
    focusFirstItem() {
        const [first] = this.getItemFocusables();
        first?.focus();
    }
    updateSlotContent() {
        const newTrigger = this.el.querySelector("ifx-dropdown-trigger-button, ifx-dropdown-trigger");
        if (newTrigger !== this.trigger) {
            if (this.trigger) {
                this.trigger.removeEventListener("click", this.handleTriggerClick);
                this.trigger.removeEventListener("keydown", this.handleTriggerKeyDown);
            }
            this.trigger = newTrigger;
            if (this.trigger) {
                this.trigger.disabled = this.disabled;
                this.trigger.addEventListener("click", this.handleTriggerClick);
                this.trigger.addEventListener("keydown", this.handleTriggerKeyDown);
            }
        }
        const newMenu = this.el.querySelector("ifx-dropdown-menu");
        if (!this.noAppendToBody) {
            if (this.menu && this.menu !== newMenu) {
                this.menu.removeEventListener("click", this.handleMenuClick);
                this.menu.removeEventListener("keydown", this.handleMenuKeyDown);
                this.menu.remove();
            }
            this.menu = newMenu;
            if (this.menu && !document.body.contains(this.menu)) {
                document.body.append(this.menu);
            }
        }
        else {
            this.menu = newMenu;
        }
        if (this.menu) {
            this.menu.removeEventListener("click", this.handleMenuClick);
            this.menu.removeEventListener("keydown", this.handleMenuKeyDown);
            this.menu.addEventListener("click", this.handleMenuClick);
            this.menu.addEventListener("keydown", this.handleMenuKeyDown);
        }
    }
    menuClickHandler() {
        if (!this.noCloseOnMenuClick) {
            this.closeDropdown();
        }
    }
    disconnectedCallback() {
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
        if (this.menu) {
            this.menu.remove();
        }
    }
    async isOpen() {
        return this.internalIsOpen;
    }
    async closeDropdown() {
        if (this.internalIsOpen) {
            this.internalIsOpen = false;
            this.trigger.isOpen = false;
            this.menu.isOpen = false;
            this.ifxClose.emit();
        }
        if (this.popperInstance) {
            this.popperInstance.destroy();
            this.popperInstance = null;
        }
    }
    async openDropdown() {
        if (!this.internalIsOpen && !this.disabled) {
            this.internalIsOpen = true;
            this.trigger.isOpen = true;
            this.menu.isOpen = true;
            this.popperInstance = popper.createPopper(this.el, this.menu, {
                placement: this.placement,
            });
            this.ifxOpen.emit();
        }
    }
    render() {
        return (index.h("div", { key: '4e98de0e83c6d6ff4416c495270f198bcabcf958', "aria-label": "dropdown menu", class: "dropdown" }, index.h("slot", { key: 'a89296bd4a261e051586dade43c3815803969aec' })));
    }
    static get watchers() { return {
        "defaultOpen": [{
                "watchHandlerIsOpen": 0
            }],
        "disabled": [{
                "watchHandlerDisabled": 0
            }]
    }; }
};
Dropdown.style = dropdownCss();

exports.ifx_dropdown = Dropdown;
//# sourceMappingURL=ifx-dropdown.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown.cjs.entry.js.map