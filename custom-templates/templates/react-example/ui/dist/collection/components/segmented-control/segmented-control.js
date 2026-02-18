import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class SegmentedControl {
    el;
    ifxChange;
    caption = "";
    label = "";
    size = "regular";
    required = false;
    error = false;
    onSegmentSelect(event) {
        const { previousValue, selectedValue } = this.unselectPreviousSegment(event.detail);
        this.selectedValue = selectedValue;
        this.ifxChange.emit({ previousValue, selectedValue });
    }
    selectedValue = "";
    unselectPreviousSegment(newSelectedIndex) {
        let previousValue;
        let selectedValue;
        const segments = this.getSegments();
        segments.forEach((control) => {
            if (control.selected) {
                if (control.segmentIndex !== newSelectedIndex) {
                    control.selected = false;
                    previousValue = control.value;
                }
                else {
                    selectedValue = control.value;
                }
            }
        });
        return { previousValue, selectedValue };
    }
    getSegments() {
        return this.el.querySelectorAll("ifx-segment");
    }
    setActiveSegment() {
        const segments = this.getSegments();
        let activeSegmentedControlFound = false;
        segments.forEach((control, idx) => {
            control.segmentIndex = idx;
            if (activeSegmentedControlFound) {
                if (control.selected)
                    control.selected = false;
            }
            else {
                if (control.selected) {
                    activeSegmentedControlFound = true;
                    this.selectedValue = control.value;
                }
            }
        });
    }
    setSegmentSize() {
        const segments = this.getSegments();
        segments.forEach((control) => {
            control.shadowRoot
                .querySelector(".segment")
                .classList.add(`segment--${this.size}`);
        });
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-segmented-control", await framework);
        }
        this.setActiveSegment();
    }
    render() {
        return (h("div", { key: '5466c7bf1c6ef935003381c990e75413d6ef69b9', "aria-value": this.selectedValue, "aria-label": "segmented control", class: "group" }, h("div", { key: '3fa88fda68195d24bcba578d4f9ceecbdd194e11', class: "group__label" }, this.label.trim(), this.required && this.label.trim().toLowerCase() !== "" && (h("span", { key: '2203d425ecd1acd4b619daa577c927750d9c3947', class: `required ${this.error ? "error" : ""}` }, "*"))), h("div", { key: 'ab88f096ad2bb01a4c3037f970f321e0bf4e77cc', class: "group__controls" }, h("slot", { key: '735db5075de201d44b83fb045c5251068d0707ad' })), this.caption.trim() && (h("div", { key: '5941c235ce8922c2e58c27b6efde142f83c87629', class: `group__caption ${this.error ? "error" : ""}` }, h("ifx-icon", { key: 'd6fe454eb047a81503789599f251f541f8d5f3f9', icon: "c-info-16" }), " ", this.caption.trim()))));
    }
    componentDidRender() {
        this.setSegmentSize();
    }
    static get is() { return "ifx-segmented-control"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["segmented-control.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["segmented-control.css"]
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
                "attribute": "caption",
                "defaultValue": "\"\""
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
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"regular\" | \"small\"",
                    "resolved": "\"regular\" | \"small\"",
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
                "defaultValue": "\"regular\""
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
            }
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
                    "original": "{\n\t\tpreviousValue: string;\n\t\tselectedValue: string;\n\t}",
                    "resolved": "{ previousValue: string; selectedValue: string; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "segmentSelect",
                "method": "onSegmentSelect",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=segmented-control.js.map
