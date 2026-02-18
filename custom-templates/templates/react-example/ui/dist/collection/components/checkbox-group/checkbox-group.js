import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class CheckboxGroup {
    errorStates = new Map();
    el;
    alignment = "vertical";
    size;
    showGroupLabel;
    groupLabelText = "Group Label Text";
    showCaption;
    captionText;
    showCaptionIcon;
    required = false;
    hasErrors = false;
    handleCheckboxError(event) {
        const checkbox = event.target;
        if (checkbox.tagName.toLowerCase() === "ifx-checkbox") {
            this.errorStates.set(checkbox, event.detail);
            this.updateHasErrors();
        }
    }
    // Method to set the error state of all checkboxes in the group
    async setGroupError(error) {
        const checkboxes = Array.from(this.el.querySelectorAll("ifx-checkbox"));
        checkboxes.forEach((checkbox) => {
            checkbox.error = error;
        });
    }
    componentWillLoad() {
        this.initializeState();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-checkbox-group", await framework);
        }
    }
    handleSlotChange = () => {
        this.initializeState();
    };
    initializeState() {
        this.errorStates.clear();
        const checkboxes = Array.from(this.el.querySelectorAll("ifx-checkbox"));
        checkboxes.forEach((checkbox) => {
            if (!this.errorStates.has(checkbox)) {
                this.errorStates.set(checkbox, checkbox.error || false);
            }
        });
        this.updateHasErrors();
    }
    updateHasErrors() {
        this.hasErrors = Array.from(this.errorStates.values()).some((error) => error);
    }
    render() {
        return (h("div", { key: '51bfdc2bee2636245ce0aba5e7ae257aed441673', class: "checkbox-group-container" }, this.showGroupLabel && (h("div", { key: 'd8287707f4e16d7ea086d7782ce7e12d14240748', class: "group-label" }, this.groupLabelText, this.required && (h("span", { key: '9addf6e22c654e66cca934ae8e4404d9c3f1ee0f', class: `required ${this.hasErrors ? "error" : ""}` }, "*")))), h("div", { key: 'd143613a5ffa4bb4e88f83fa9c3e4e9f8303f738', class: `checkbox-group ${this.alignment} ${this.size}` }, h("slot", { key: '34f3a93c0be772f4ba675eb16e4210a281b12a61', onSlotchange: this.handleSlotChange })), this.showCaption ? (h("div", { class: `caption ${this.hasErrors ? "error" : "default"}` }, this.showCaptionIcon ? (h("div", { class: "caption-icon" }, h("ifx-icon", { icon: "c-info-16" }))) : (""), h("div", { class: "caption-text" }, this.captionText))) : ("")));
    }
    static get is() { return "ifx-checkbox-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["checkbox-group.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["checkbox-group.css"]
        };
    }
    static get properties() {
        return {
            "alignment": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"horizontal\" | \"vertical\"",
                    "resolved": "\"horizontal\" | \"vertical\"",
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
                "attribute": "alignment",
                "defaultValue": "\"vertical\""
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
                "attribute": "size"
            },
            "showGroupLabel": {
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
                "attribute": "show-group-label"
            },
            "groupLabelText": {
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
                "attribute": "group-label-text",
                "defaultValue": "\"Group Label Text\""
            },
            "showCaption": {
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
                "attribute": "show-caption"
            },
            "captionText": {
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
                "attribute": "caption-text"
            },
            "showCaptionIcon": {
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
                "attribute": "show-caption-icon"
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
            }
        };
    }
    static get states() {
        return {
            "hasErrors": {}
        };
    }
    static get methods() {
        return {
            "setGroupError": {
                "complexType": {
                    "signature": "(error: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "error",
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
    static get listeners() {
        return [{
                "name": "ifxError",
                "method": "handleCheckboxError",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=checkbox-group.js.map
