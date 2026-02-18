import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class TextField {
    inputElement;
    el;
    placeholder = "Placeholder";
    value = "";
    error = false;
    label = "";
    icon = "";
    caption = "";
    size = "m";
    required = false;
    success = false;
    disabled = false;
    readOnly = false;
    maxlength;
    showDeleteIcon = false;
    autocomplete = "on";
    type = "text";
    internalId = "text-field";
    internalType;
    ifxInput;
    // @Prop({ reflect: true })
    // resetOnSubmit: boolean = false;
    internals;
    valueWatcher(newValue) {
        if (newValue !== this.inputElement.value) {
            this.inputElement.value = newValue;
        }
    }
    async reset() {
        this.value = "";
        this.inputElement.value = "";
    }
    handleDeleteContent() {
        if (!this.disabled && !this.readOnly) {
            this.reset();
            this.ifxInput.emit(this.value);
        }
    }
    handleInput() {
        const query = this.inputElement.value;
        this.value = query;
        //this.internals.setFormValue(query) // update form value
        this.ifxInput.emit(this.value);
    }
    handleTypeProp() {
        this.internalType =
            this.type === "text" || this.type === "password" ? this.type : "text";
    }
    // formResetCallback() {
    //   this.internals.setValidity({});
    //   this.internals.setFormValue("");
    // }
    componentWillLoad() {
        this.handleTypeProp();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-text-field", await framework);
        }
    }
    render() {
        return (h("div", { key: 'd66e99e6d9b4006f25a7b7400202b2266f84bbc8', "aria-label": "a text field for user input", "aria-value": this.value, "aria-disabled": this.disabled, class: `textInput__container ${this.readOnly ? "readonly" : ""} ${this.disabled && !this.error ? "disabled" : ""}` }, h("div", { key: 'd4215a20ddaadc5c365df4d8e475e51cc937e382', class: "textInput__top-wrapper" }, this.label && (h("label", { key: '597e5638a0813c49bb1a125a3f2bdb71200b64c5', htmlFor: this.internalId }, h("span", { key: '958424f1aa8517393d63e8352d0612a841bdf969' }, this.label), this.required && (h("span", { key: 'd3f267fda6e7d10a40fb70e4f622fd332a905354', class: `required ${this.error && !this.readOnly ? "error" : ""}` }, "*"))))), h("div", { key: 'c1a92726a9d8cc9e933746f3fdf9a9f3de856e60', class: "textInput__bottom-wrapper" }, h("div", { key: 'a30cfda0677a9c701d581c83c80e07217c55399d', class: "input-container" }, this.icon && h("ifx-icon", { key: '27611e13c7eb1b7f22a7c2fedec5ac8d48a7f97b', class: "input-icon", icon: this.icon }), h("input", { key: '238113dbc9c34458b0f3214a13314634e4a11b8e', ref: (el) => (this.inputElement = el), disabled: this.disabled && !this.error, autocomplete: this.autocomplete, type: this.internalType, id: this.internalId, value: this.value, onInput: () => this.handleInput(), placeholder: this.placeholder, readonly: this.readOnly, maxlength: this.maxlength, class: `${this.icon ? "icon" : ""}
                ${this.error ? "error" : ""} 
                ${this.readOnly ? "readonly" : ""} 
              ${this.size === "s" ? "input-s" : ""}
              ${this.success ? "success" : ""}` }), this.showDeleteIcon && this.value && (h("ifx-icon", { key: '7c2cf0aae4c7d1fc8e036a34ed19fce889b4c0b7', class: "delete-icon", icon: "cRemove16", onClick: () => this.handleDeleteContent() }))), this.caption && (h("div", { key: '8724a4a6d8ba9090963b9cb2eb7631b376d59e8e', class: `textInput__bottom-wrapper-caption ${this.error && !this.readOnly ? "error" : ""} ${this.disabled && !this.readOnly && !this.error ? "disabled" : ""}` }, this.caption)))));
    }
    static get is() { return "ifx-text-field"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["text-field.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["text-field.css"]
        };
    }
    static get properties() {
        return {
            "placeholder": {
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
                "attribute": "placeholder",
                "defaultValue": "\"Placeholder\""
            },
            "value": {
                "type": "string",
                "mutable": true,
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
                "attribute": "value",
                "defaultValue": "\"\""
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
            "label": {
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
                "attribute": "label",
                "defaultValue": "\"\""
            },
            "icon": {
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
                "attribute": "icon",
                "defaultValue": "\"\""
            },
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
                "attribute": "caption",
                "defaultValue": "\"\""
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
            "required": {
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
                "attribute": "required",
                "defaultValue": "false"
            },
            "success": {
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
                "attribute": "success",
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "readOnly": {
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
                "attribute": "read-only",
                "defaultValue": "false"
            },
            "maxlength": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "maxlength"
            },
            "showDeleteIcon": {
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
                "attribute": "show-delete-icon",
                "defaultValue": "false"
            },
            "autocomplete": {
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
                "attribute": "autocomplete",
                "defaultValue": "\"on\""
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"text\" | \"password\"",
                    "resolved": "\"password\" | \"text\"",
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
                "defaultValue": "\"text\""
            },
            "internalId": {
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
                "attribute": "internal-id",
                "defaultValue": "\"text-field\""
            }
        };
    }
    static get states() {
        return {
            "internalType": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxInput",
                "name": "ifxInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "reset": {
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
                "propName": "value",
                "methodName": "valueWatcher"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=text-field.js.map
