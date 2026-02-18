import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class DatePicker {
    inputId = `ifx-date-picker-${++datePickerId}`;
    el;
    size = "s";
    error = false;
    success = false;
    disabled = false;
    ariaLabel;
    value;
    type = "date";
    max;
    min;
    required = false;
    label;
    caption;
    autocomplete = "on";
    internals;
    ifxDate;
    getInput() {
        const input = this.el.shadowRoot.querySelector(".date__picker-input");
        return input;
    }
    getDate(e) {
        const inputValue = e.target.value;
        const selectedDate = new Date(inputValue);
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        if (!inputValue) {
            //this.internals.setFormValue(null);
            if (this.type === "datetime-local") {
                const hours = selectedDate.getHours();
                const minutes = selectedDate.getMinutes();
                this.ifxDate.emit({ day, month, year, hours, minutes });
            }
            else {
                this.ifxDate.emit({ day, month, year });
            }
            return;
        }
        const input = this.getInput();
        input.classList.add("has-value");
        //this.internals.setFormValue(selectedDate.toISOString().substring(0,10))
        if (this.type === "datetime-local") {
            const hours = selectedDate.getHours();
            const minutes = selectedDate.getMinutes();
            this.ifxDate.emit({ day, month, year, hours, minutes });
        }
        else {
            this.ifxDate.emit({ day, month, year });
        }
    }
    handleIconKeyDown(e) {
        if (this.disabled)
            return;
        const browserIsFirefox = this.isFirefox();
        const input = this.getInput();
        if (e.key === "Enter" && browserIsFirefox) {
            e.preventDefault();
            if (input.showPicker) {
                input.showPicker();
            }
        }
    }
    isFirefox() {
        const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        return isFirefox;
    }
    setFireFoxClasses() {
        const browserIsFirefox = this.isFirefox();
        const input = this.getInput();
        const iconWrapper = this.el.shadowRoot.querySelector(".icon__wrapper");
        if (browserIsFirefox) {
            input.classList.add("firefox__classes");
            iconWrapper.classList.add("firefox__classes");
        }
        else if (input.classList.contains("firefox__classes")) {
            input.classList.remove("firefox__classes");
            iconWrapper.classList.remove("firefox__classes");
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-date-picker", await framework);
        }
        this.setFireFoxClasses();
    }
    componentWillUpdate() {
        if (this.value) {
            this.getDate({ target: { value: this.value } });
        }
    }
    // formResetCallback() {
    //   this.internals.setFormValue(null);
    // }
    render() {
        return (h("div", { key: 'c012b90fdbb54a2fceb919c65a4c1703a140cfe6', class: `date__picker-container ${this.error ? "error" : ""} ${this.disabled ? "disabled" : ""}` }, h("label", { key: 'edc1c275125e427b4dac448507d6dfcf12a8c123', class: "label__wrapper", htmlFor: this.inputId }, this.label?.trim(), h("span", { key: 'd84ba225c6c3c5281dd896758d7c22a308a921b6', class: `asterisk ${this.required ? "required" : ""} ${this.error ? "error" : ""}` }, "*")), h("div", { key: '2b20b0c19aee685303a823b23b81b179c43200f3', class: `input__wrapper ${this.size === "l" ? "large" : "small"} ${this.disabled ? "disabled" : ""}` }, h("input", { key: '34dfea85e5f7e8e5dff738344781b84ef487568f', type: this.type, autocomplete: this.autocomplete, class: `date__picker-input ${this.error ? "error" : ""} ${this.success ? "success" : ""}`, disabled: this.disabled ? true : undefined, "aria-invalid": this.error ? true : undefined, "aria-label": this.ariaLabel, max: this.max, min: this.min, value: this.value, required: this.required, onChange: (e) => this.getDate(e) }), h("div", { key: '4907fb288f5a285afd87b49f4e262f3856bc30b8', class: "icon__wrapper", tabIndex: this.isFirefox() ? 0 : undefined, onKeyDown: (e) => this.handleIconKeyDown(e) }, h("ifx-icon", { key: '6f1673724fd9f2fbafa06ffbbe9077e20af57ea6', icon: "calendar16", "aria-hidden": "true" }))), this.caption?.trim() && (h("div", { key: 'c31292b72751311d5d05b274c020d6af71c67b2c', class: "caption__wrapper" }, this.caption.trim()))));
    }
    static get is() { return "ifx-date-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["date-picker.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["date-picker.css"]
        };
    }
    static get properties() {
        return {
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
                "defaultValue": "\"s\""
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
            "type": {
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
                "attribute": "type",
                "defaultValue": "\"date\""
            },
            "max": {
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
                "attribute": "max"
            },
            "min": {
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
                "attribute": "min"
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
            }
        };
    }
    static get events() {
        return [{
                "method": "ifxDate",
                "name": "ifxDate",
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
    static get attachInternalsMemberName() { return "internals"; }
}
let datePickerId = 0;
//# sourceMappingURL=date-picker.js.map
