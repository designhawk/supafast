import { Host, h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class TextArea {
    inputId = `ifx-textarea-${++textareaId}`;
    internals;
    ifxInput;
    el;
    caption;
    cols;
    disabled = false;
    error = false;
    label;
    maxlength;
    name;
    placeholder;
    required = false;
    readOnly = false;
    resize = "both";
    rows;
    value;
    wrap = "soft";
    fullWidth = "false";
    async reset() {
        this.resetTextarea();
    }
    handleComponentWidth() {
        const textareaWrapper = this.el.shadowRoot.querySelector(".wrapper__textarea");
        const isFullWidth = this.fullWidth.toLowerCase() === "true";
        if (isFullWidth) {
            textareaWrapper.classList.add("fullWidth");
        }
        else if (textareaWrapper.classList.contains("fullWidth")) {
            textareaWrapper.classList.remove("fullWidth");
        }
    }
    componentDidRender() {
        this.handleComponentWidth();
    }
    formResetCallback() {
        this.resetTextarea();
        //this.internals.setFormValue("");
    }
    handleOnInput(e) {
        this.value = e.target.value;
        //this.internals.setFormValue(this.value);
        this.ifxInput.emit(this.value);
    }
    resetTextarea() {
        this.value = "";
        //this.internals.setValidity({});
        //this.internals.setFormValue('');
    }
    // componentWillLoad() {
    // 	this.internals.setFormValue(this.value);
    // }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-textarea", await framework);
        }
    }
    render() {
        return (h(Host, { key: '263a7e49f07c0424d9dbb915218ffc2391fdb922', class: `wrapper--${this.error ? "error" : ""} wrapper--${this.disabled && !this.error ? "disabled" : ""}` }, h("label", { key: 'aeecebe5a14512c8340ae3422524692538bc2882', class: "wrapper__label", htmlFor: this.inputId }, this.label?.trim(), this.required && (h("span", { key: '159a84ca943d5506b45c34d415a01abc2bf8ad7b', class: `required ${this.error ? "error" : ""}` }, "*"))), h("div", { key: '65ad541848a381a3b802160cd3017a384a04d913', class: "wrapper__textarea" }, h("textarea", { key: '6a54256bbd90894cb38f6ed2522cdcf27a9615bc', "aria-label": "a textarea", "aria-value": this.value, "aria-disabled": this.disabled && !this.error, id: this.inputId, style: { resize: this.resize }, name: this.name ? this.name : this.inputId, cols: this.cols, rows: this.rows, maxlength: this.maxlength, wrap: this.wrap, disabled: this.disabled && !this.error, readonly: this.readOnly, placeholder: this.placeholder, value: this.value, onInput: (e) => this.handleOnInput(e) })), this.caption?.trim() && (h("div", { key: '637289ccc1ab074d1431f04aba4f25eeb97a69c6', class: "wrapper__caption" }, this.caption.trim()))));
    }
    static get is() { return "ifx-textarea"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["textarea.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["textarea.css"]
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
            "cols": {
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
                "attribute": "cols"
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
                "attribute": "label"
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
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "maxlength"
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
                "reflect": false,
                "attribute": "name"
            },
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
                "attribute": "placeholder"
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
            "resize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"both\" | \"horizontal\" | \"vertical\" | \"none\"",
                    "resolved": "\"both\" | \"horizontal\" | \"none\" | \"vertical\"",
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
                "attribute": "resize",
                "defaultValue": "\"both\""
            },
            "rows": {
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
                "attribute": "rows"
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
                "attribute": "value"
            },
            "wrap": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"hard\" | \"soft\" | \"off\"",
                    "resolved": "\"hard\" | \"off\" | \"soft\"",
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
                "attribute": "wrap",
                "defaultValue": "\"soft\""
            },
            "fullWidth": {
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
                "attribute": "full-width",
                "defaultValue": "\"false\""
            }
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
    static get attachInternalsMemberName() { return "internals"; }
}
let textareaId = 0;
//# sourceMappingURL=textarea.js.map
