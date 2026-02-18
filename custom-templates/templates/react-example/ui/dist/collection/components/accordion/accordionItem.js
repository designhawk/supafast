//ifxAccordionItem
import { h, } from "@stencil/core";
export class AccordionItem {
    el;
    caption;
    open = false;
    AriaLevel = 3;
    internalOpen = false;
    ifxOpen;
    ifxClose;
    contentEl;
    titleEl;
    resizeObserver;
    componentWillLoad() {
        this.internalOpen = this.open;
    }
    componentDidLoad() {
        this.checkSlotContent();
        this.openAccordionItem();
        this.contentEl = this.el.shadowRoot.querySelector("#accordion-content");
        if (this.contentEl) {
            this.attachResizeObserver();
        }
    }
    componentDidUpdate() {
        this.checkSlotContent();
        this.openAccordionItem();
    }
    openChanged(newValue) {
        this.internalOpen = newValue;
    }
    toggleOpen() {
        this.internalOpen = !this.internalOpen;
        this.open = this.internalOpen;
        if (this.internalOpen) {
            this.ifxOpen.emit({ isOpen: this.internalOpen });
        }
        else {
            this.ifxClose.emit({ isClosed: !this.internalOpen });
        }
    }
    openAccordionItem() {
        if (this.internalOpen) {
            this.contentEl.style.height = `${this.contentEl.scrollHeight}px`;
            this.contentEl.style.overflow = "hidden";
        }
        else {
            this.contentEl.style.height = "0";
            this.contentEl.style.overflow = "hidden";
        }
    }
    getInnerContentWrapper() {
        const innerContentEl = this.el.shadowRoot.querySelector(".inner-content");
        return innerContentEl;
    }
    attachResizeObserver() {
        const innerContentEl = this.getInnerContentWrapper();
        if (innerContentEl) {
            this.resizeObserver = new ResizeObserver(() => {
                if (this.internalOpen) {
                    this.openAccordionItem();
                }
            });
            this.resizeObserver.observe(innerContentEl);
        }
    }
    handleKeydown(ev) {
        const path = ev.composedPath();
        if (!path.includes(this.titleEl)) {
            return;
        }
        switch (ev.key) {
            case "Enter": // fallthrough
            case " ": // space
                ev.preventDefault();
                this.toggleOpen();
                break;
        }
    }
    checkSlotContent() {
        const slot = this.el.shadowRoot.querySelector("slot");
        const hasContent = slot.assignedNodes().length > 0;
        const innerContent = this.getInnerContentWrapper();
        if (!hasContent) {
            innerContent.classList.add("no-content");
        }
        else if (innerContent.classList.contains("no-content")) {
            innerContent.classList.remove("no-content");
        }
    }
    render() {
        return (h("div", { key: 'd0659e9848ec1c283922245ede1c43f4d437f2e9', class: `accordion-item ${this.internalOpen ? "open" : ""}` }, h("div", { key: '5602bba8be10049019a41a78a140a8f3cb5ff84e', role: "button", "aria-expanded": this.internalOpen, "aria-controls": "accordion-content", class: "accordion-title", onClick: () => this.toggleOpen(), tabindex: "0", ref: (el) => (this.titleEl = el) }, h("span", { key: 'ba38b4ad9659b0dda1d4e9c4f951b164782f461c', "aria-hidden": "true", role: "heading", "aria-level": String(this.AriaLevel), class: "accordion-icon" }, h("ifx-icon", { key: '30b3cd4afde52cde304bfd9b1d0650a1167dcffd', icon: "chevron-down-16" })), h("span", { key: 'c488542b9e8622de256d2c02a26f58da51836164', id: "accordion-caption", class: "accordion-caption" }, this.caption)), h("div", { key: '86481e71ceda4b3f452d77f5930fadac5a7fe58a', id: "accordion-content", class: "accordion-content", ref: (el) => (this.contentEl = el), role: "region", "aria-labelledby": "accordion-caption" }, h("div", { key: '0beb27fdd4d691b165267ce0d0b29a817cdfd71a', class: "inner-content" }, h("slot", { key: 'f988897e355f52624d51aa301b4407ef05f7a928' })))));
    }
    static get is() { return "ifx-accordion-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["accordionItem.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["accordionItem.css"]
        };
    }
    static get properties() {
        return {
            "caption": {
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
                "attribute": "caption"
            },
            "open": {
                "type": "boolean",
                "mutable": true,
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
                "attribute": "open",
                "defaultValue": "false"
            },
            "AriaLevel": {
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
                "attribute": "aria-level",
                "defaultValue": "3"
            }
        };
    }
    static get states() {
        return {
            "internalOpen": {}
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
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "open",
                "methodName": "openChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeydown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=accordionItem.js.map
