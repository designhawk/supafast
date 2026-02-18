'use strict';

var index = require('./index-BfM4jcLt.js');
var index$1 = require('./index-Bp6Dd2i1.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const iconButtonCss = () => `:host{display:inline-flex}.btn{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:8px;gap:8px;color:#FFFFFF;flex-direction:row;font-weight:600;border-radius:1px;line-height:1.5rem;outline:none;font-family:var(--ifx-font-family);text-decoration:none;user-select:none;border:1px solid rgba(0, 0, 0, 0);font-size:1rem;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.btn:not(.disabled){cursor:pointer}.btn-primary{color:#FFFFFF;background-color:#0A8276}.btn-primary:disabled,.btn-primary.disabled{background-color:#BFBBBB;color:#FFFFFF;pointer-events:none}.btn-secondary{color:#0A8276;background-color:#FFFFFF;border-color:#0A8276}.btn-secondary:disabled,.btn-secondary.disabled{background-color:#FFFFFF;border:1px solid #BFBBBB;color:#BFBBBB;pointer-events:none}.btn-tertiary{background-color:transparent;color:#1D1D1D}.btn-tertiary:disabled,.btn-tertiary.disabled{color:#BFBBBB;pointer-events:none}.btn.icon-button{min-width:initial;min-height:initial;width:40px;height:40px;padding:0;justify-content:center}.btn.icon-button.btn-round{border-radius:100px}.btn.icon-button.btn-square{border-radius:1px}.btn.icon-button.btn-s{width:32px;height:32px;padding:8px}.btn.icon-button.btn-l{width:48px;height:48px;padding:8px}.btn.btn-primary:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-primary:not(:disabled,.disabled):hover{background-color:#08665C;border-color:#08665C}.btn.btn-primary:not(:disabled,.disabled):active,.btn.btn-primary:not(:disabled,.disabled).active{background-color:#06534B;border-color:#06534B}.btn.btn-secondary:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-secondary:not(:disabled,.disabled):hover{background-color:#08665C;border-color:#08665C;color:#FFFFFF}.btn.btn-secondary:not(:disabled,.disabled):active,.btn.btn-secondary:not(:disabled,.disabled).active{background-color:#06534B;border-color:#06534B}.btn.btn-tertiary:not(:disabled,.disabled):focus:not(:active,.active){outline:none;color:#1D1D1D;box-shadow:0 0 0 0px #FFFFFF, 0 0 0 2px #0A8276}.btn.btn-tertiary:not(:disabled,.disabled):hover{color:#0A8276}.btn.btn-tertiary:not(:disabled,.disabled):active,.btn.btn-tertiary:not(:disabled,.disabled).active{color:#08665C}`;

const IconButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    variant;
    size;
    disabled;
    icon;
    href;
    target = "_self";
    shape = "round";
    ariaLabel;
    internalIcon;
    get el() { return index.getElement(this); }
    focusableElement;
    handleClick(event) {
        if (this.disabled) {
            event.stopImmediatePropagation();
        }
    }
    updateIcon(newIcon) {
        this.internalIcon = newIcon;
    }
    async setFocus() {
        this.focusableElement.focus();
    }
    componentWillLoad() {
        if (this.shape === "") {
            this.shape = "round";
        }
        this.internalIcon = this.icon;
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-icon-button", await framework);
        }
    }
    render() {
        return (index.h(index.Host, { key: '8ae84287307705057656bd0724951ad3fb37e4ef', "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, this.href ? (index.h("a", { ref: (el) => (this.focusableElement = el), class: this.getClassNames(), href: !this.disabled ? this.href : undefined, target: this.target, rel: this.target === "_blank" ? "noopener noreferrer" : undefined }, index.h("ifx-icon", { icon: this.internalIcon }))) : (index.h("button", { class: this.getClassNames(), type: "button", disabled: this.disabled }, index.h("ifx-icon", { icon: this.internalIcon })))));
    }
    getVariantClass() {
        return `${this.variant}` === "secondary"
            ? `secondary`
            : `${this.variant}` === "tertiary"
                ? `tertiary`
                : `primary`;
    }
    getSizeClass() {
        if (`${this.size}` === "xs") {
            return "xs";
        }
        else if (`${this.size}` === "s") {
            return "s";
        }
        else if (`${this.size}` === "l") {
            return "l";
        }
        else
            return "";
    }
    getClassNames() {
        return index$1.classNames("btn icon-button", `btn-${this.shape}`, this.size && `btn-${this.getSizeClass()}`, `btn-${this.getVariantClass()}`, this.disabled ? "disabled" : "");
    }
    static get watchers() { return {
        "icon": [{
                "updateIcon": 0
            }]
    }; }
};
IconButton.style = iconButtonCss();

exports.ifx_icon_button = IconButton;
//# sourceMappingURL=ifx-icon-button.entry.cjs.js.map

//# sourceMappingURL=ifx-icon-button.cjs.entry.js.map