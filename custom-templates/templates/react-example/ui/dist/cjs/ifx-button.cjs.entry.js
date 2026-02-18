'use strict';

var index = require('./index-BfM4jcLt.js');
var index$1 = require('./index-Bp6Dd2i1.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const buttonCss = () => `:host{vertical-align:bottom;display:inline-flex;width:var(--bw, fit-content)}.btn{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0px 16px;gap:8px;color:#FFFFFF;font-weight:600;border-radius:1px;line-height:1.5rem;font-family:var(--ifx-font-family);font-style:normal;text-decoration:none;user-select:none;font-size:1rem;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;width:var(--bw, fit-content)}.btn:not(.disabled){cursor:pointer}.btn.disabled{pointer-events:none}.btn-default{color:#FFFFFF;background-color:#0A8276}.btn-default:disabled,.btn-default.disabled{background-color:#BFBBBB;color:#FFFFFF;pointer-events:none}.btn-secondary-default{background-color:#FFFFFF;color:#0A8276;border:1px solid #0A8276}.btn-secondary-default:disabled,.btn-secondary-default.disabled{background-color:#FFFFFF;border:1px solid #BFBBBB;color:#BFBBBB;pointer-events:none}.btn-tertiary-default{background-color:transparent;color:#0A8276}.btn-tertiary-default:disabled,.btn-tertiary-default.disabled{color:#BFBBBB;pointer-events:none}.btn-danger{color:#FFFFFF;background-color:#CD002F;border-color:#CD002F}.btn-danger:disabled,.btn-danger.disabled{background-color:#BFBBBB;color:#FFFFFF;pointer-events:none}.btn-secondary-danger{background-color:#FFFFFF;color:#CD002F;border:1px solid #CD002F}.btn-secondary-danger:disabled,.btn-secondary-danger.disabled{background-color:#FFFFFF;border:1px solid #BFBBBB;color:#BFBBBB;pointer-events:none}.btn-tertiary-danger{background-color:transparent;color:#CD002F}.btn-tertiary-danger:disabled,.btn-tertiary-danger.disabled{background-color:#FFFFFF;color:#BFBBBB;pointer-events:none}.btn-inverse{color:#0A8276;background-color:#FFFFFF}.btn-inverse:disabled,.btn-inverse.disabled{opacity:1;background-color:#FFFFFF;color:#BFBBBB;pointer-events:none}.btn-secondary-inverse{color:#FFFFFF;border:1px solid #FFFFFF}.btn-secondary-inverse:disabled,.btn-secondary-inverse.disabled{border:1px solid #FFFFFF;color:#FFFFFF;pointer-events:none}.btn-tertiary-inverse{color:#FFFFFF}.btn-tertiary-inverse:disabled,.btn-tertiary-inverse.disabled{color:#FFFFFF;opacity:1;pointer-events:none}.btn ifx-icon:empty{display:none}.btn.btn-xs{font-size:0.875rem;height:32px;line-height:1rem}.btn.btn-s{font-size:0.875rem;height:36px;line-height:1.25rem}.btn.btn-l{font-size:1.25rem;height:48px;line-height:1.75rem}.btn.btn-default:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-default:not(:disabled,.disabled):hover{background-color:#08665C}.btn.btn-default:not(:disabled,.disabled):active,.btn.btn-default:not(:disabled,.disabled).active{background-color:#06534B}.btn.btn-secondary-default:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-secondary-default:not(:disabled,.disabled):hover{color:#FFFFFF;background-color:#08665C}.btn.btn-secondary-default:not(:disabled,.disabled):active,.btn.btn-secondary-default:not(:disabled,.disabled).active{background-color:#06534B}.btn.btn-secondary:not(:disabled,.disabled):hover{background-color:#9C216E}.btn.btn-secondary:not(:disabled,.disabled):active,.btn.btn-secondary:not(:disabled,.disabled).active{background-color:#9C216E}.btn.btn-danger:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-danger:not(:disabled,.disabled):hover{background-color:#A2001E}.btn.btn-danger:not(:disabled,.disabled):active,.btn.btn-danger:not(:disabled,.disabled).active{background-color:#900021}.btn.btn-secondary-danger:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.btn.btn-secondary-danger:not(:disabled,.disabled):hover{color:#FFFFFF;background-color:#A2001E}.btn.btn-secondary-danger:not(:disabled,.disabled):active,.btn.btn-secondary-danger:not(:disabled,.disabled).active{background-color:#900021}.btn.btn-inverse:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #0A8276, 0 0 0 4px #FFFFFF}.btn.btn-inverse:not(:disabled,.disabled):hover{background-color:#EEEDED}.btn.btn-inverse:not(:disabled,.disabled):active,.btn.btn-inverse:not(:disabled,.disabled).active{background-color:#BFBBBB}.btn.btn-secondary-inverse:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #0A8276, 0 0 0 4px #FFFFFF}.btn.btn-secondary-inverse:not(:disabled,.disabled):hover{color:#0A8276;background-color:#EEEDED}.btn.btn-secondary-inverse:not(:disabled,.disabled):active,.btn.btn-secondary-inverse:not(:disabled,.disabled).active{color:#0A8276;background-color:#BFBBBB}.btn.btn-tertiary-default:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #08665C}.btn.btn-tertiary-default:not(:disabled,.disabled):hover{color:#08665C}.btn.btn-tertiary-default:not(:disabled,.disabled):active,.btn.btn-tertiary-default:not(:disabled,.disabled).active{color:#06534B}.btn.btn-tertiary-danger:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #A2001E}.btn.btn-tertiary-danger:not(:disabled,.disabled):hover{color:#A2001E}.btn.btn-tertiary-danger:not(:disabled,.disabled):active,.btn.btn-tertiary-danger:not(:disabled,.disabled).active{color:#900021}.btn.btn-tertiary-inverse:not(:disabled,.disabled):focus:not(:active,.active){outline:none;box-shadow:0 0 0 2px #0A8276, 0 0 0 4px #FFFFFF}.btn.btn-tertiary-inverse:not(:disabled,.disabled):hover{color:#EEEDED}.btn.btn-tertiary-inverse:not(:disabled,.disabled):active,.btn.btn-tertiary-inverse:not(:disabled,.disabled).active{color:#BFBBBB}`;

const Button = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    variant = "primary";
    theme = "default";
    size = "m";
    disabled = false;
    internalHref;
    href;
    target = "_self";
    type = "button";
    fullWidth = false;
    ariaLabel;
    get el() { return index.getElement(this); }
    focusableElement;
    nativeButton;
    setInternalHref(newValue) {
        this.internalHref = newValue;
    }
    async setFocus() {
        this.focusableElement.focus();
    }
    insertNativeButton() {
        this.nativeButton = document.createElement("button");
        this.nativeButton.type = this.type;
        this.nativeButton.style.display = "none";
        this.el.closest("form").appendChild(this.nativeButton);
    }
    handleFormAndInternalHref() {
        if (this.el.closest("form")) {
            if (this.el.href) {
                this.el.internalHref = undefined;
            }
            this.insertNativeButton();
        }
        else {
            this.internalHref = this.href;
        }
    }
    handleButtonWidth() {
        if (this.fullWidth) {
            this.el.style.setProperty("--bw", "100%");
        }
        else {
            this.el.style.setProperty("--bw", "fit-content");
        }
    }
    componentWillLoad() {
        this.handleFormAndInternalHref();
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-button", await framework);
        }
    }
    componentWillRender() {
        this.handleButtonWidth();
    }
    handleClick = (ev) => {
        if (this.el.shadowRoot) {
            const parentForm = this.el.closest("form");
            if (parentForm) {
                ev.preventDefault();
                if (this.type === "reset") {
                    // If the button type is 'reset', manually reset all custom form fields
                    this.resetClickHandler(); //this will reset all ifx-text-fields within a form
                }
                else {
                    const fakeButton = document.createElement("button");
                    if (this.type) {
                        fakeButton.type = this.type;
                    }
                    fakeButton.style.display = "none";
                    parentForm.appendChild(fakeButton);
                    fakeButton.click();
                    fakeButton.remove();
                }
            }
        }
    };
    resetClickHandler() {
        const formElement = this.el.closest("form");
        const customElements = formElement.querySelectorAll("ifx-text-field, ifx-textarea");
        customElements.forEach((element) => {
            element.reset();
        });
    }
    handleKeyDown(ev) {
        if (ev.key === " " || (ev.key === "Enter" && !this.disabled)) {
            this.focusableElement.click();
        }
    }
    handleHostClick(event) {
        if (this.disabled === true) {
            event.stopImmediatePropagation();
        }
    }
    handleFocus(event) {
        if (this.disabled) {
            event.preventDefault();
            this.focusableElement.blur();
        }
    }
    render() {
        return (index.h(index.Host, { key: 'ab789b94fe8dde5a109fe988c72d888780644c06' }, index.h("a", { key: '54426eba5713f80e28b33c6a7dd5feb1e4cc4574', role: this.href ? "link" : "button", tabIndex: this.disabled ? -1 : 0, ref: (el) => (this.focusableElement = el), class: this.getClassNames(), href: !this.disabled ? this.internalHref : undefined, target: this.target, onClick: this.handleClick, rel: this.target === "_blank" ? "noopener noreferrer" : undefined, onFocus: (event) => this.handleFocus(event), "aria-disabled": this.disabled ? "true" : null, "aria-describedby": this.theme === "danger" ? "Dangerous action" : undefined, "aria-label": this.ariaLabel || undefined }, index.h("slot", { key: '9249ae5a73c4bacb7f963c79066c966279e6d660' }))));
    }
    getVariantClass() {
        return `${this.variant}` === "secondary"
            ? `secondary-${this.theme}`
            : `${this.variant}` === "tertiary"
                ? `tertiary-${this.theme}`
                : `${this.theme}`;
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
        return index$1.classNames("btn", this.size && `btn-${this.getSizeClass()}`, `btn-${this.getVariantClass()}`, this.disabled ? "disabled" : "");
    }
    static get watchers() { return {
        "href": [{
                "setInternalHref": 0
            }]
    }; }
};
Button.style = buttonCss();

exports.ifx_button = Button;
//# sourceMappingURL=ifx-button.entry.cjs.js.map

//# sourceMappingURL=ifx-button.cjs.entry.js.map