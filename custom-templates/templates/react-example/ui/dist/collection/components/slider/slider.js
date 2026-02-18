import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class IfxSlider {
    min = 0;
    max = 100;
    step = 1;
    value;
    minValueHandle;
    maxValueHandle;
    disabled = false;
    showPercentage = false;
    leftIcon;
    rightIcon;
    leftText;
    rightText;
    type = "single";
    ariaLabel;
    internalValue = 0;
    percentage = 0;
    internalMinValue = 0;
    internalMaxValue = 100;
    ifxChange;
    el;
    inputRef;
    minInputRef;
    maxInputRef;
    valueChanged(newValue) {
        this.internalValue = newValue;
        this.updateValuePercent();
    }
    minValueChanged(newValue) {
        this.internalMinValue = newValue;
        this.updateValuePercent();
    }
    maxValueChanged(newValue) {
        this.internalMaxValue = newValue;
        this.updateValuePercent();
    }
    getRangeSliderWrapper() {
        const rangeSliderWrapper = this.el.shadowRoot.querySelector(".range-slider__wrapper");
        return rangeSliderWrapper;
    }
    handleInputChangeOfRangeSlider(event) {
        const target = event.target;
        if (parseFloat(this.maxInputRef.value) - parseFloat(this.minInputRef.value) <=
            0) {
            if (target.id === "max-slider") {
                this.maxInputRef.value = this.minInputRef.value;
            }
            else {
                this.minInputRef.value = this.maxInputRef.value;
            }
        }
        if (target.id === "max-slider") {
            this.internalMaxValue = parseFloat(this.maxInputRef.value);
        }
        else {
            this.internalMinValue = parseFloat(this.minInputRef.value);
        }
        this.ifxChange.emit({
            minVal: this.internalMinValue,
            maxVal: this.internalMaxValue,
        });
        this.updateValuePercent();
        this.updateZIndexIfRangeSlider(target.id);
    }
    handleOnMouseLeaveOfRangeSlider(event) {
        const target = event.target;
        const sliderWrapper = this.getRangeSliderWrapper();
        if (target.id === "max-slider") {
            sliderWrapper.insertBefore(this.maxInputRef, this.minInputRef);
        }
        else {
            sliderWrapper.insertBefore(this.minInputRef, this.maxInputRef);
        }
    }
    calculatePercentageValue() {
        const num = (this.internalValue - this.min) * 1.0;
        const den = this.max - this.min;
        this.percentage = +parseFloat(String((num / den) * 100)).toFixed(2);
    }
    handleInputChange(event) {
        const target = event.target;
        this.internalValue = parseFloat(target.value);
        this.ifxChange.emit(this.internalValue);
        this.calculatePercentageValue();
        this.updateValuePercent();
    }
    roundToValidStep(value) {
        const relativeValue = value - this.min;
        const remainder = relativeValue % this.step;
        if (remainder >= this.step / 2) {
            return this.min + relativeValue + (this.step - remainder);
        }
        else {
            return this.min + relativeValue - remainder;
        }
    }
    updateValuePercent() {
        const den = this.max - this.min;
        if (this.type === "double") {
            if (this.minInputRef) {
                const num = (this.roundToValidStep(this.internalMinValue) - this.min) * 1.0;
                const minPercent = (num / den) * 100;
                this.minInputRef.parentElement.style.setProperty("--min-value-percent", `${minPercent}%`);
            }
            if (this.maxInputRef) {
                const num = (this.roundToValidStep(this.internalMaxValue) - this.min) * 1.0;
                const maxPercent = (num / den) * 100;
                this.maxInputRef.parentElement.style.setProperty("--max-value-percent", `${maxPercent}%`);
            }
        }
        else {
            if (this.inputRef) {
                const num = (this.roundToValidStep(this.internalValue) - this.min) * 1.0;
                const den = this.max - this.min;
                const percentage = (num / den) * 100;
                this.inputRef.style.setProperty("--value-percent", `${percentage}%`);
            }
        }
    }
    // Ensures that the last used slider thumb stays on top of the other thumb in order to handle correct overlapping
    // if min and max thumbs take the same value.
    updateZIndexIfRangeSlider(targetId = "") {
        if (targetId === "max-slider") {
            this.minInputRef.style.zIndex = "1";
            this.maxInputRef.style.zIndex = "2";
        }
        else {
            this.minInputRef.style.zIndex = "2";
            this.maxInputRef.style.zIndex = "1";
        }
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.internalValue = (this.max - this.min) / 2;
        }
        else {
            this.internalValue = Math.max(this.min, Math.min(this.max, this.value));
        }
        this.calculatePercentageValue();
        if (this.minValueHandle !== undefined)
            this.internalMinValue = this.minValueHandle;
        else
            this.internalMinValue = this.min;
        if (this.maxValueHandle !== undefined)
            this.internalMaxValue = this.maxValueHandle;
        else
            this.internalMaxValue = this.max;
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-slider", await framework);
        }
        this.updateValuePercent();
    }
    render() {
        return (h("div", { key: 'e53b8a1684dc612b0124afadbb6d64f1513926d4', class: "ifx-slider" }, this.leftText && h("span", { key: '9c3515ee7906905ed967e5414df8b50602746986', class: `left-text` }, this.leftText), this.leftIcon && (h("ifx-icon", { key: '93bd5e893d867cb6e1163f095636a346af6165a8', icon: this.leftIcon, class: `left-icon${this.disabled ? " disabled" : ""}` })), this.type !== "double" ? (h("input", { type: "range", min: this.min, max: this.max, step: this.step, value: this.internalValue, disabled: this.disabled, ref: (el) => (this.inputRef = el), onInput: (event) => this.handleInputChange(event), "aria-label": "Slider", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.internalValue, "aria-disabled": this.disabled ? "true" : "false" })) : (h("div", { class: "range-slider__wrapper", "aria-label": this.ariaLabel, role: "group" }, h("input", { id: "min-slider", type: "range", min: this.min, max: this.max, step: this.step, value: this.internalMinValue, disabled: this.disabled, ref: (el) => (this.minInputRef = el), onInput: (event) => this.handleInputChangeOfRangeSlider(event), onMouseUp: (event) => this.handleOnMouseLeaveOfRangeSlider(event), "aria-label": "Minimum value slider", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.internalMinValue, "aria-disabled": this.disabled ? "true" : "false" }), h("input", { id: "max-slider", type: "range", min: this.min, max: this.max, step: this.step, value: this.internalMaxValue, disabled: this.disabled, ref: (el) => (this.maxInputRef = el), onInput: (event) => this.handleInputChangeOfRangeSlider(event), onMouseUp: (event) => this.handleOnMouseLeaveOfRangeSlider(event), "aria-label": "Maximum value slider", "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.internalMaxValue, "aria-disabled": this.disabled ? "true" : "false" }))), this.rightIcon && (h("ifx-icon", { key: '220cf7332b94ffdd50ea9577897015d575e17e82', icon: this.rightIcon, class: `right-icon${this.disabled ? " disabled" : ""}` })), this.rightText && (h("span", { key: '227f016f29988900761db33371fa4123cf1980a1', class: `right-text${this.disabled ? " disabled" : ""}` }, this.rightText)), this.showPercentage && this.type !== "double" && (h("span", { key: 'c8dab62686ce76a240c4229ac20c7bfe8817e398', class: `percentage-display${this.disabled ? " disabled" : ""}` }, this.percentage, "%"))));
    }
    static get is() { return "ifx-slider"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["slider.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["slider.css"]
        };
    }
    static get properties() {
        return {
            "min": {
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
                "attribute": "min",
                "defaultValue": "0"
            },
            "max": {
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
                "attribute": "max",
                "defaultValue": "100"
            },
            "step": {
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
                "attribute": "step",
                "defaultValue": "1"
            },
            "value": {
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
                "attribute": "value"
            },
            "minValueHandle": {
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
                "attribute": "min-value-handle"
            },
            "maxValueHandle": {
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
                "attribute": "max-value-handle"
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
            "showPercentage": {
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
                "attribute": "show-percentage",
                "defaultValue": "false"
            },
            "leftIcon": {
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
                "attribute": "left-icon"
            },
            "rightIcon": {
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
                "attribute": "right-icon"
            },
            "leftText": {
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
                "attribute": "left-text"
            },
            "rightText": {
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
                "attribute": "right-text"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"single\" | \"double\"",
                    "resolved": "\"double\" | \"single\"",
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
                "defaultValue": "\"single\""
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
            "internalValue": {},
            "percentage": {},
            "internalMinValue": {},
            "internalMaxValue": {}
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
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChanged"
            }, {
                "propName": "minValueHandle",
                "methodName": "minValueChanged"
            }, {
                "propName": "maxValueHandle",
                "methodName": "maxValueChanged"
            }];
    }
}
//# sourceMappingURL=slider.js.map
