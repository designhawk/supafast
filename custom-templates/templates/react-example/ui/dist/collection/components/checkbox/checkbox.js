import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Checkbox {
    inputElement;
    el;
    disabled = false;
    checked = false;
    error = false;
    size = "m";
    indeterminate = false;
    value;
    internalChecked;
    internalIndeterminate;
    internals;
    ifxChange;
    ifxError;
    handleCheckbox() {
        if (!this.disabled) {
            if (!this.inputElement.indeterminate) {
                this.internalChecked = !this.internalChecked;
            }
            if (this.internalChecked && !this.internalIndeterminate) {
                if (this.value !== undefined) {
                    //this.internals.setFormValue(this.value);
                }
                else {
                    //this.internals.setFormValue("on")
                }
            }
            else {
                //this.internals.setFormValue(null)
            }
            this.ifxChange.emit(this.internalChecked);
        }
    }
    async isChecked() {
        return this.internalChecked;
    }
    async toggleCheckedState(newVal) {
        this.internalChecked = newVal;
    }
    valueChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalChecked = newValue;
            this.inputElement.checked = this.internalChecked; // update the checkbox's checked property
        }
    }
    errorChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.ifxError.emit(newValue);
        }
    }
    indeterminateChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalIndeterminate = newValue;
            this.inputElement.indeterminate = this.internalIndeterminate; // update the checkbox's indeterminate property
        }
    }
    handleKeydown(event) {
        // Keycode 32 corresponds to the Space key, 13 corresponds to the Enter key
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.handleCheckbox();
            event.preventDefault(); // prevent the default action when space or enter is pressed
        }
    }
    componentWillLoad() {
        this.internalChecked = this.checked;
        this.internalIndeterminate = this.indeterminate;
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-checkbox", await framework);
        }
    }
    componentDidRender() {
        this.inputElement.indeterminate = this.internalIndeterminate;
    }
    /**
     * Callback for form association.
     * Called whenever the form is reset.
     */
    // formResetCallback() {
    //   this.internals.setFormValue(null);
    // }
    getCheckedClassName() {
        if (this.error) {
            if (this.internalChecked) {
                return "checked error";
            }
            else {
                return "error";
            }
        }
        else if (this.internalChecked) {
            return "checked";
        }
        else
            return "";
    }
    render() {
        const slot = this.el.innerHTML;
        let hasSlot = false;
        if (slot) {
            hasSlot = true;
        }
        return (h("div", { key: '66deab9a045801347d7d3922d6b79e776968e346', class: "checkbox__container" }, h("input", { key: '0e4cb4faef0961cb49a41f118dc322003af138b8', type: "checkbox", hidden: true, ref: (el) => (this.inputElement = el), checked: this.internalChecked, onChange: this.handleCheckbox.bind(this), id: "checkbox", value: `${this.value}`, disabled: this.disabled ? true : undefined }), h("div", { key: 'cfd4ab79dfe2b35a080ae3ef1353517d83d3e59e', tabindex: "0", onClick: this.handleCheckbox.bind(this), onKeyDown: this.handleKeydown.bind(this), role: "checkbox", "aria-checked": this.indeterminate ? "mixed" : this.internalChecked.toString(), "aria-disabled": this.disabled, "aria-labelledby": "label", class: `checkbox__wrapper 
          ${this.getCheckedClassName()}
        ${this.size === "m" ? "checkbox-m" : ""}
        ${this.indeterminate ? "indeterminate" : ""}
        ${this.disabled ? "disabled" : ""}` }, this.internalChecked && !this.internalIndeterminate && (h("ifx-icon", { key: '24a05ff0636f28106002d300c036f66ba671090f', icon: "check-16", "aria-hidden": "true" }))), hasSlot && (h("div", { key: '02c12362ee3d2d875d9dbbc6d2e2089c11b6ead6', id: "label", class: `label ${this.size === "m" ? "label-m" : ""} ${this.disabled ? "disabled" : ""} `, onClick: this.handleCheckbox.bind(this) }, h("slot", { key: '9dcb9bfffb3d46bc14224e60f2602af350ef93fd' })))));
    }
    static get is() { return "ifx-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["checkbox.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["checkbox.css"]
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
            "checked": {
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
                "attribute": "checked",
                "defaultValue": "false"
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
            "indeterminate": {
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
                "attribute": "indeterminate",
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
            }
        };
    }
    static get states() {
        return {
            "internalChecked": {},
            "internalIndeterminate": {}
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
            },
            "toggleCheckedState": {
                "complexType": {
                    "signature": "(newVal: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "newVal",
                            "type": "boolean",
                            "docs": ""
                        }],
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
                "propName": "checked",
                "methodName": "valueChanged"
            }, {
                "propName": "error",
                "methodName": "errorChanged"
            }, {
                "propName": "indeterminate",
                "methodName": "indeterminateChanged"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=checkbox.js.map
