import { Host, h, } from "@stencil/core";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Button {
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
    el;
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
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-button", await framework);
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
        return (h(Host, { key: 'ab789b94fe8dde5a109fe988c72d888780644c06' }, h("a", { key: '54426eba5713f80e28b33c6a7dd5feb1e4cc4574', role: this.href ? "link" : "button", tabIndex: this.disabled ? -1 : 0, ref: (el) => (this.focusableElement = el), class: this.getClassNames(), href: !this.disabled ? this.internalHref : undefined, target: this.target, onClick: this.handleClick, rel: this.target === "_blank" ? "noopener noreferrer" : undefined, onFocus: (event) => this.handleFocus(event), "aria-disabled": this.disabled ? "true" : null, "aria-describedby": this.theme === "danger" ? "Dangerous action" : undefined, "aria-label": this.ariaLabel || undefined }, h("slot", { key: '9249ae5a73c4bacb7f963c79066c966279e6d660' }))));
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
        return classNames("btn", this.size && `btn-${this.getSizeClass()}`, `btn-${this.getVariantClass()}`, this.disabled ? "disabled" : "");
    }
    static get is() { return "ifx-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["button.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["button.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"primary\" | \"secondary\" | \"tertiary\"",
                    "resolved": "\"primary\" | \"secondary\" | \"tertiary\"",
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
                "attribute": "variant",
                "defaultValue": "\"primary\""
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"default\" | \"danger\" | \"inverse\"",
                    "resolved": "\"danger\" | \"default\" | \"inverse\"",
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
                "attribute": "theme",
                "defaultValue": "\"default\""
            },
            "size": {
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
                "attribute": "size",
                "defaultValue": "\"m\""
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "href": {
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
                "attribute": "href"
            },
            "target": {
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
                "attribute": "target",
                "defaultValue": "\"_self\""
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"button\" | \"submit\" | \"reset\"",
                    "resolved": "\"button\" | \"reset\" | \"submit\"",
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
                "attribute": "type",
                "defaultValue": "\"button\""
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
            },
            "ariaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
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
                "attribute": "aria-label"
            }
        };
    }
    static get states() {
        return {
            "internalHref": {}
        };
    }
    static get methods() {
        return {
            "setFocus": {
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
                "propName": "href",
                "methodName": "setInternalHref"
            }];
    }
    static get listeners() {
        return [{
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "click",
                "method": "handleHostClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
//# sourceMappingURL=button.js.map
