import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class RadioButton {
    el;
    disabled = false;
    value;
    error = false;
    size = "s";
    name;
    checked;
    internalChecked = false;
    hasSlot = false;
    async isChecked() {
        return this.internalChecked;
    }
    inputElement;
    //private internals: ElementInternals;
    fallbackInput;
    ifxChange;
    ifxError;
    componentWillLoad() {
        // Fallback for form association
        this.fallbackInput = document.createElement("input");
        this.fallbackInput.type = "radio";
        this.fallbackInput.hidden = true;
        this.fallbackInput.className = "_ifx-radiobutton-fallback";
        this.fallbackInput.style.cssText = `
      display: none !important;
      position: absolute !important;
      opacity: 0 !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
    `;
        this.fallbackInput.setAttribute("aria-hidden", "true");
        this.fallbackInput.tabIndex = -1;
        this.el.appendChild(this.fallbackInput);
        // Initialize ElementInternals if supported
        if ("attachInternals" in HTMLElement.prototype) {
            try {
                //this.internals = this.el.attachInternals();
            }
            catch (e) {
                console.warn("ElementInternals not supported");
            }
        }
        // Initial state
        this.internalChecked = this.checked || false;
        this.hasSlot =
            !!this.el.querySelector("[slot]") || this.el.innerHTML.trim() !== "";
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-radio-button", await framework);
        }
    }
    handleCheckedChange(newValue) {
        this.internalChecked = newValue;
    }
    updateFormValue() {
        // Update both ElementInternals and fallback input
        // if (this.internals?.setFormValue) {
        //   this.internals.setFormValue(this.internalChecked ? this.value : null);
        // }
        this.fallbackInput.checked = this.internalChecked;
        this.fallbackInput.name = this.name;
        this.fallbackInput.value = this.value;
        this.fallbackInput.disabled = this.disabled;
    }
    errorChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.ifxError.emit(newValue);
        }
    }
    handleRadioButtonClick(event) {
        if (this.disabled) {
            event.stopPropagation();
            return;
        }
        this.inputElement.click();
        this.internalChecked = this.inputElement.checked;
        this.checked = this.internalChecked;
        this.ifxChange.emit(this.internalChecked);
        const changeEvent = new CustomEvent("change", {
            bubbles: true,
            composed: true,
            detail: { checked: this.internalChecked },
        });
        this.el.dispatchEvent(changeEvent);
    }
    handleKeyDown(ev) {
        if ([" ", "Enter"].includes(ev.key)) {
            ev.preventDefault();
            this.handleRadioButtonClick(new PointerEvent("click"));
        }
    }
    handleExternalChange(event) {
        const target = event.target;
        if (target === this.el ||
            target.tagName.toLowerCase() !== "ifx-radio-button")
            return;
        if (target.getAttribute("name") === this.name) {
            this.internalChecked = false;
        }
    }
    render() {
        return (h("div", { key: 'a9d3efb5e503305eeff21af8b016b4f50738e15a', role: "radio", "aria-checked": String(this.internalChecked), "aria-disabled": String(this.disabled), class: `radioButton__container ${this.size} ${this.disabled ? "disabled" : ""}`, onClick: (e) => this.handleRadioButtonClick(e), tabindex: this.disabled ? -1 : 0 }, h("div", { key: 'b6a8fd604197ca4cfbfbf5ff6981d6ac0c922543', class: `radioButton__wrapper 
            ${this.internalChecked ? "checked" : ""}  
            ${this.error ? "error" : ""}` }, this.internalChecked && (h("div", { key: '75b5ac87ead79e2a5174cf522bc99e9a5d53227b', class: "radioButton__wrapper-mark" }))), this.hasSlot && (h("div", { key: 'a721984940b528e0ec4d722f36cb5f6211bcb5c5', class: `label ${this.size === "m" ? "label-m" : ""}` }, h("slot", { key: '7e9dbd7d4a434db20538aa49fbda8b3b6d7d6281' }))), h("input", { key: 'c899b856860b53689ff4d638cd4f0fd91a2fded3', type: "radio", hidden: true, ref: (el) => (this.inputElement = el), name: this.name, value: this.value, checked: this.internalChecked, disabled: this.disabled, onClick: (e) => e.stopPropagation() })));
    }
    static get is() { return "ifx-radio-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["radio-button.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["radio-button.css"]
        };
    }
    static get properties() {
        return {
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
            "value": {
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
                "attribute": "value"
            },
            "error": {
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
                "attribute": "error",
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\"",
                    "resolved": "\"m\" | \"s\"",
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
                "reflect": true,
                "attribute": "size",
                "defaultValue": "\"s\""
            },
            "name": {
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
                "reflect": true,
                "attribute": "name"
            },
            "checked": {
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
                "attribute": "checked"
            }
        };
    }
    static get states() {
        return {
            "internalChecked": {},
            "hasSlot": {}
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
            }, {
                "method": "ifxError",
                "name": "ifxError",
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
            "isChecked": {
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
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "checked",
                "methodName": "handleCheckedChange"
            }, {
                "propName": "internalChecked",
                "methodName": "updateFormValue"
            }, {
                "propName": "error",
                "methodName": "errorChanged"
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
                "name": "change",
                "method": "handleExternalChange",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=radio-button.js.map
