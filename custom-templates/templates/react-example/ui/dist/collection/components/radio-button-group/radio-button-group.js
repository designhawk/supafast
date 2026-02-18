import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class RadioButtonGroup {
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
    handleRadioButtonError(event) {
        const radioButton = event.target;
        if (radioButton.tagName.toLowerCase() === "ifx-radio-button") {
            this.errorStates.set(radioButton, event.detail);
            this.updateHasErrors();
        }
    }
    // Method to set the error state of all radio-butttons in the group
    async setGroupError(error) {
        const radioButtons = Array.from(this.el.querySelectorAll("ifx-radio-button"));
        radioButtons.forEach((radioButton) => {
            radioButton.error = error;
        });
    }
    componentWillLoad() {
        this.initializeState();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-radio-button-group", await framework);
        }
    }
    handleSlotChange = () => {
        this.initializeState();
    };
    initializeState() {
        this.errorStates.clear();
        const radioButtons = Array.from(this.el.querySelectorAll("ifx-radio-button"));
        radioButtons.forEach((radioButton) => {
            if (!this.errorStates.has(radioButton)) {
                this.errorStates.set(radioButton, radioButton.error || false);
            }
        });
        this.updateHasErrors();
    }
    updateHasErrors() {
        console.log("here");
        this.hasErrors = Array.from(this.errorStates.values()).some((error) => error);
    }
    render() {
        return (h("div", { key: '7cbbca7c5cb1553c4e8a60074ef3d910351d1809', class: "radio-button-group-container" }, this.showGroupLabel && (h("div", { key: '8639379ff19abfb650bca7111d3bf0d9860d54fb', class: "group-label" }, this.groupLabelText, this.required && (h("span", { key: '26f529030297a0ab8becef74c66a86f9633b31cb', class: `required ${this.hasErrors ? "error" : ""}` }, "*")))), h("div", { key: 'ea9ec7e428a9e962af4f495218aa6a6738f45da5', class: `radio-button-group ${this.alignment} ${this.size}` }, h("slot", { key: '0e16b32c71a5b69f2797d52451c24403d66aac36', onSlotchange: this.handleSlotChange })), this.showCaption ? (h("div", { class: `caption ${this.hasErrors ? "error" : "default"}` }, this.showCaptionIcon ? (h("div", { class: "caption-icon" }, h("ifx-icon", { icon: "c-info-16" }))) : (""), h("div", { class: "caption-text" }, this.captionText))) : ("")));
    }
    static get is() { return "ifx-radio-button-group"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["radio-button-group.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["radio-button-group.css"]
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
                "method": "handleRadioButtonError",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=radio-button-group.js.map
