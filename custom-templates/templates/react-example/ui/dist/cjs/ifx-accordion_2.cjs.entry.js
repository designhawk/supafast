'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const accordionCss = () => `:host{display:block}.accordion-wrapper{display:flex;flex-direction:column;gap:8px;font-family:var(--ifx-font-family)}`;

const Accordion = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    autoCollapse = false;
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-accordion", await framework);
        }
    }
    async onItemOpen(event) {
        if (this.autoCollapse) {
            const items = Array.from(this.el.querySelectorAll("ifx-accordion-item"));
            for (const item of items) {
                const itemElement = item;
                if (itemElement !== event.target && (await itemElement.open)) {
                    itemElement.open = false;
                }
            }
        }
    }
    render() {
        return (index.h("div", { key: 'd58ecb8cc8115a73494ff566396817215358ce1b', class: "accordion-wrapper" }, index.h("slot", { key: 'b6d78a277100955d35240fae3e9f87fd9c539fa5' })));
    }
    static get delegatesFocus() { return true; }
};
Accordion.style = accordionCss();

const accordionItemCss = () => `.accordion-item{border-radius:3px;transition:all 0.3s;font-family:var(--ifx-font-family)}.accordion-title:focus{outline:none}.accordion-title:focus::after{content:"";display:block;position:absolute;top:-4px;bottom:-4px;left:-4px;right:-4px;border-radius:5px;border:2px solid #0A8276;box-sizing:border-box}.accordion-title:hover{border:1px solid #EEEDED;color:#08665C}.accordion-title{display:flex;align-items:center;position:relative;padding:12px 16px;gap:12px;color:#0A8276;background-color:#FFFFFF;border:1px solid #EEEDED;cursor:pointer;margin:4px}.accordion-caption{font-weight:600;font-size:1.125rem}.accordion-content{gap:8px;overflow:hidden;height:0;transition:height 0.3s ease;line-height:24px;font-size:1rem;font-weight:400}.inner-content{background-color:#FFFFFF;padding:16px;word-wrap:break-word;overflow-wrap:anywhere;align-self:stretch;margin:0 4px 4px;border:1px solid transparent;border-top:1px solid transparent}.accordion-icon{font-weight:bold;display:flex;transition:transform 0.3s}.accordion-icon:hover{color:#08665C}.accordion-item.open .accordion-content{max-height:auto}.accordion-item.open .accordion-icon{transform:rotate(-180deg)}.accordion-item.open .inner-content{border-color:#EEEDED;border-top-color:transparent;transition:border-color 0s}.accordion-item:not(.open) .inner-content{transition:border-color 0s 0.3s}.inner-content.no-content{border:none;padding:0;margin:0}`;

const AccordionItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxOpen = index.createEvent(this, "ifxOpen", 7);
        this.ifxClose = index.createEvent(this, "ifxClose", 7);
    }
    get el() { return index.getElement(this); }
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
        return (index.h("div", { key: 'd0659e9848ec1c283922245ede1c43f4d437f2e9', class: `accordion-item ${this.internalOpen ? "open" : ""}` }, index.h("div", { key: '5602bba8be10049019a41a78a140a8f3cb5ff84e', role: "button", "aria-expanded": this.internalOpen, "aria-controls": "accordion-content", class: "accordion-title", onClick: () => this.toggleOpen(), tabindex: "0", ref: (el) => (this.titleEl = el) }, index.h("span", { key: 'ba38b4ad9659b0dda1d4e9c4f951b164782f461c', "aria-hidden": "true", role: "heading", "aria-level": String(this.AriaLevel), class: "accordion-icon" }, index.h("ifx-icon", { key: '30b3cd4afde52cde304bfd9b1d0650a1167dcffd', icon: "chevron-down-16" })), index.h("span", { key: 'c488542b9e8622de256d2c02a26f58da51836164', id: "accordion-caption", class: "accordion-caption" }, this.caption)), index.h("div", { key: '86481e71ceda4b3f452d77f5930fadac5a7fe58a', id: "accordion-content", class: "accordion-content", ref: (el) => (this.contentEl = el), role: "region", "aria-labelledby": "accordion-caption" }, index.h("div", { key: '0beb27fdd4d691b165267ce0d0b29a817cdfd71a', class: "inner-content" }, index.h("slot", { key: 'f988897e355f52624d51aa301b4407ef05f7a928' })))));
    }
    static get watchers() { return {
        "open": [{
                "openChanged": 0
            }]
    }; }
};
AccordionItem.style = accordionItemCss();

exports.ifx_accordion = Accordion;
exports.ifx_accordion_item = AccordionItem;
//# sourceMappingURL=ifx-accordion.ifx-accordion-item.entry.cjs.js.map

//# sourceMappingURL=ifx-accordion_2.cjs.entry.js.map