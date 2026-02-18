import { Host, h, } from "@stencil/core";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class IconButton {
    variant;
    size;
    disabled;
    icon;
    href;
    target = "_self";
    shape = "round";
    ariaLabel;
    internalIcon;
    el;
    focusableElement;
    handleClick(event) {
        if (this.disabled) {
            event.stopImmediatePropagation();
        }
    }
    updateIcon(newIcon) {
        this.internalIcon = newIcon;
    }
    async setFocus() {
        this.focusableElement.focus();
    }
    componentWillLoad() {
        if (this.shape === "") {
            this.shape = "round";
        }
        this.internalIcon = this.icon;
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-icon-button", await framework);
        }
    }
    render() {
        return (h(Host, { key: '8ae84287307705057656bd0724951ad3fb37e4ef', "aria-disabled": this.disabled, "aria-label": this.ariaLabel }, this.href ? (h("a", { ref: (el) => (this.focusableElement = el), class: this.getClassNames(), href: !this.disabled ? this.href : undefined, target: this.target, rel: this.target === "_blank" ? "noopener noreferrer" : undefined }, h("ifx-icon", { icon: this.internalIcon }))) : (h("button", { class: this.getClassNames(), type: "button", disabled: this.disabled }, h("ifx-icon", { icon: this.internalIcon })))));
    }
    getVariantClass() {
        return `${this.variant}` === "secondary"
            ? `secondary`
            : `${this.variant}` === "tertiary"
                ? `tertiary`
                : `primary`;
    }
    getSizeClass() {
        if (`${this.size}` === "xs") {
            return "xs";
        }
        else if (`${this.size}` === "s") {
            return "s";
        }
        else if (`${this.size}` === "l") {
            return "l";
        }
        else
            return "";
    }
    getClassNames() {
        return classNames("btn icon-button", `btn-${this.shape}`, this.size && `btn-${this.getSizeClass()}`, `btn-${this.getVariantClass()}`, this.disabled ? "disabled" : "");
    }
    static get is() { return "ifx-icon-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["icon-button.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["icon-button.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"primary\" | \"secondary\" | \"tertiary\"",
                    "resolved": "\"primary\" | \"secondary\" | \"tertiary\"",
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
                "attribute": "variant"
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
                "attribute": "disabled"
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
                "attribute": "icon"
            },
            "href": {
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
                "attribute": "href"
            },
            "target": {
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
                "attribute": "target",
                "defaultValue": "\"_self\""
            },
            "shape": {
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
                "attribute": "shape",
                "defaultValue": "\"round\""
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
            "internalIcon": {}
        };
    }
    static get methods() {
        return {
            "setFocus": {
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
                "propName": "icon",
                "methodName": "updateIcon"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleClick",
                "target": undefined,
                "capture": true,
                "passive": false
            }];
    }
}
//# sourceMappingURL=icon-button.js.map
