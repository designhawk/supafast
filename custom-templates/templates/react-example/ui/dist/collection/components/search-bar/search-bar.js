import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class SearchBar {
    isOpen = true;
    disabled = false;
    internalState;
    value;
    maxlength;
    ifxInput;
    ifxOpen;
    autocomplete = "on";
    el;
    async onNavbarMobile() {
        this.ifxOpen.emit(false);
        this.internalState = false;
    }
    handlePropChange() {
        this.internalState = this.isOpen;
    }
    handleCloseButton = () => {
        this.internalState = !this.internalState;
        this.ifxOpen.emit(this.internalState);
    };
    setInitialState() {
        this.internalState = this.isOpen;
    }
    componentWillLoad() {
        this.setInitialState();
        this.ifxOpen.emit(this.internalState);
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-search-bar", await framework);
        }
    }
    handleInput(event) {
        this.value = event.detail;
    }
    handleFocus = () => {
        this.internalState = true;
    };
    render() {
        return (h("div", { key: '26b0a7ad01f87e1e1c425fec07c71dbf1c9faacf', role: "search", "aria-label": "a search field for user input", "aria-value": this.value, "aria-disabled": this.disabled, class: `search-bar ${this.internalState ? "open" : "closed"}` }, this.internalState ? (h("div", { class: "search-bar-wrapper" }, h("ifx-search-field", { autocomplete: this.autocomplete, disabled: this.disabled, value: this.value, maxlength: this.maxlength, onIfxInput: this.handleInput.bind(this) }, h("ifx-icon", { icon: "search-16", slot: "search-icon" })), h("a", { "aria-label": "Close button", href: "javascript:void(0)", onClick: this.handleCloseButton }, "Close"))) : (h("div", { class: "search-bar_icon-wrapper", onClick: this.handleCloseButton }, h("ifx-icon", { icon: "search-16" })))));
    }
    static get is() { return "ifx-search-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["search-bar.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["search-bar.css"]
        };
    }
    static get properties() {
        return {
            "isOpen": {
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
                "attribute": "is-open",
                "defaultValue": "true"
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
    static get states() {
        return {
            "internalState": {}
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
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "ifxOpen",
                "name": "ifxOpen",
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
            "onNavbarMobile": {
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
                "propName": "isOpen",
                "methodName": "handlePropChange"
            }];
    }
}
//# sourceMappingURL=search-bar.js.map
