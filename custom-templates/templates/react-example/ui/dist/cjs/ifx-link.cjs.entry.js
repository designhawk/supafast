'use strict';

var index = require('./index-BfM4jcLt.js');
var index$1 = require('./index-Bp6Dd2i1.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const linkCss = () => `:host{display:inline-flex}.link{display:inline-flex;align-items:center;font-weight:400;font-size:1rem;text-decoration:none;color:#0A8276;gap:8px;line-height:1.6;font-family:var(--ifx-font-family)}.link:hover{cursor:pointer}.link:focus{outline-width:2px;outline-style:solid;outline-color:#0A8276;outline-offset:4px;border-radius:3px}.link.bold{font-weight:600}.link.bold:hover{text-decoration:underline}.link.bold:active{color:#08665C;font-style:normal;font-weight:600;text-decoration:underline}.link.underlined{text-decoration:underline;text-decoration-color:#0A8276;color:#1D1D1D;text-underline-offset:8px}.link.underlined:hover{color:#0A8276}.link.underlined:active{color:#0A8276}.link.underlined:disabled,.link.underlined.disabled{text-decoration-color:#BFBBBB}.link.title{text-decoration:none;font-weight:600;color:#1D1D1D}.link.title:hover{color:#0A8276}.link.title:active{color:#08665C}.link.menu{font-weight:400;font-style:normal;line-height:26px;color:#1D1D1D}.link.menu:hover{color:#0A8276}.link.menu:active{color:#08665C}.link.small{font-size:0.875rem}.link.medium{font-size:1rem}.link.large{font-size:1.125rem}.link.extraLarge{font-size:1.25rem}.link.underline{text-decoration:underline}.link:disabled,.link.disabled{color:#BFBBBB;cursor:default;pointer-events:none}`;

const Link = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    href = undefined;
    target = "_self";
    variant = "bold";
    size;
    disabled = false;
    download;
    ariaLabel;
    internalHref = "";
    internalTarget = "";
    internalVariant = "";
    setInternalStates() {
        if (this.href) {
            this.internalHref = this.href.trim();
        }
        else {
            this.internalHref = undefined;
        }
        this.internalTarget = this.target.trim();
        this.internalVariant = this.variant.trim().toLowerCase();
    }
    componentWillRender() {
        this.setInternalStates();
    }
    handleKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else if (event.key === "Enter") {
            event.preventDefault();
        }
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-link", await framework);
        }
    }
    render() {
        return (index.h("a", { key: '48ef60fec9eb7c8318d3af3f57b78e51dcccacbd', tabindex: "0", role: "link", "aria-label": this.ariaLabel, "aria-disabled": this.disabled || !this.internalHref, href: this.disabled ? undefined : this.internalHref, download: this.download, target: this.internalTarget, class: this.linkClassNames() }, index.h("slot", { key: '4d3adf6af56bac0898bf6c3d428263744dcd8c08' })));
    }
    getSizeClass() {
        const small = this.size === "s" ? "small" : null;
        const medium = this.size === "m" ? "medium" : null;
        const large = this.size === "l" ? "large" : null;
        const extraLarge = this.size === "xl" ? "extraLarge" : null;
        if (small) {
            return small;
        }
        else if (medium) {
            return medium;
        }
        else if (large) {
            return large;
        }
        else if (extraLarge && this.internalVariant === "underlined") {
            return "large";
        }
        else if (extraLarge && this.internalVariant !== "underlined") {
            return extraLarge;
        }
        else
            return "";
    }
    getVariantClass() {
        const bold = this.internalVariant === "bold" ? "bold" : null;
        const title = this.internalVariant === "title" ? "title" : null;
        const underlined = this.internalVariant === "underlined" ? "underlined" : null;
        const menu = this.internalVariant === "menu" ? "menu" : null;
        if (bold) {
            return bold;
        }
        else if (title) {
            return title;
        }
        else if (underlined) {
            return underlined;
        }
        else if (menu) {
            return menu;
        }
        else
            return bold;
    }
    linkClassNames() {
        return index$1.classNames("link", "primary", this.getVariantClass(), this.getSizeClass(), this.disabled ? "disabled" : "");
    }
};
Link.style = linkCss();

exports.ifx_link = Link;
//# sourceMappingURL=ifx-link.entry.cjs.js.map

//# sourceMappingURL=ifx-link.cjs.entry.js.map