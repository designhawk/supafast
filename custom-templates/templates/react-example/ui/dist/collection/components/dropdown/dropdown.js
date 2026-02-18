import { createPopper } from "@popperjs/core";
import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Dropdown {
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
    el;
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
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-dropdown", await framework);
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
            this.popperInstance = createPopper(this.el, this.menu, {
                placement: this.placement,
            });
            this.ifxOpen.emit();
        }
    }
    render() {
        return (h("div", { key: '4e98de0e83c6d6ff4416c495270f198bcabcf958', "aria-label": "dropdown menu", class: "dropdown" }, h("slot", { key: 'a89296bd4a261e051586dade43c3815803969aec' })));
    }
    static get is() { return "ifx-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["dropdown.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["dropdown.css"]
        };
    }
    static get properties() {
        return {
            "placement": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Placement",
                    "resolved": "\"auto\" | \"auto-end\" | \"auto-start\" | \"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"left-end\" | \"left-start\" | \"right\" | \"right-end\" | \"right-start\" | \"top\" | \"top-end\" | \"top-start\"",
                    "references": {
                        "Placement": {
                            "location": "local",
                            "path": "C:/Users/Aditya/Documents/GitHub/quests-main/custom-templates/ui/components/src/components/dropdown/dropdown.tsx",
                            "id": "src/components/dropdown/dropdown.tsx::Placement"
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
                "setter": false,
                "reflect": false,
                "attribute": "placement",
                "defaultValue": "\"bottom-start\""
            },
            "defaultOpen": {
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
                "attribute": "default-open",
                "defaultValue": "false"
            },
            "noAppendToBody": {
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
                "attribute": "no-append-to-body",
                "defaultValue": "false"
            },
            "disabled": {
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
                "attribute": "disabled"
            },
            "noCloseOnOutsideClick": {
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
                "attribute": "no-close-on-outside-click",
                "defaultValue": "false"
            },
            "noCloseOnMenuClick": {
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
                "attribute": "no-close-on-menu-click",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "internalIsOpen": {},
            "trigger": {},
            "menu": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxOpen",
                "name": "ifxOpen",
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
                "method": "ifxClose",
                "name": "ifxClose",
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
                "method": "ifxDropdown",
                "name": "ifxDropdown",
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
            "isOpen": {
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
            },
            "closeDropdown": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "IOpenable": {
                            "location": "import",
                            "path": "./IOpenable",
                            "id": "src/components/dropdown/IOpenable.ts::IOpenable",
                            "referenceLocation": "IOpenable"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "openDropdown": {
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
    static get watchers() {
        return [{
                "propName": "defaultOpen",
                "methodName": "watchHandlerIsOpen"
            }, {
                "propName": "disabled",
                "methodName": "watchHandlerDisabled"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "handleOutsideClick",
                "target": "document",
                "capture": false,
                "passive": true
            }, {
                "name": "focusin",
                "method": "handleFocusOutside",
                "target": "document",
                "capture": false,
                "passive": false
            }, {
                "name": "slotchange",
                "method": "watchHandlerSlot",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=dropdown.js.map
