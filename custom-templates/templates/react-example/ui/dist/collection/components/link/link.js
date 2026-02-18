import { h } from "@stencil/core";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Link {
    el;
    href = undefined;
    target = "_self";
    variant = "bold";
    size;
    disabled = false;
    download;
    ariaLabel;
    internalHref = "";
    internalTarget = "";
    internalVariant = "";
    setInternalStates() {
        if (this.href) {
            this.internalHref = this.href.trim();
        }
        else {
            this.internalHref = undefined;
        }
        this.internalTarget = this.target.trim();
        this.internalVariant = this.variant.trim().toLowerCase();
    }
    componentWillRender() {
        this.setInternalStates();
    }
    handleKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else if (event.key === "Enter") {
            event.preventDefault();
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-link", await framework);
        }
    }
    render() {
        return (h("a", { key: '48ef60fec9eb7c8318d3af3f57b78e51dcccacbd', tabindex: "0", role: "link", "aria-label": this.ariaLabel, "aria-disabled": this.disabled || !this.internalHref, href: this.disabled ? undefined : this.internalHref, download: this.download, target: this.internalTarget, class: this.linkClassNames() }, h("slot", { key: '4d3adf6af56bac0898bf6c3d428263744dcd8c08' })));
    }
    getSizeClass() {
        const small = this.size === "s" ? "small" : null;
        const medium = this.size === "m" ? "medium" : null;
        const large = this.size === "l" ? "large" : null;
        const extraLarge = this.size === "xl" ? "extraLarge" : null;
        if (small) {
            return small;
        }
        else if (medium) {
            return medium;
        }
        else if (large) {
            return large;
        }
        else if (extraLarge && this.internalVariant === "underlined") {
            return "large";
        }
        else if (extraLarge && this.internalVariant !== "underlined") {
            return extraLarge;
        }
        else
            return "";
    }
    getVariantClass() {
        const bold = this.internalVariant === "bold" ? "bold" : null;
        const title = this.internalVariant === "title" ? "title" : null;
        const underlined = this.internalVariant === "underlined" ? "underlined" : null;
        const menu = this.internalVariant === "menu" ? "menu" : null;
        if (bold) {
            return bold;
        }
        else if (title) {
            return title;
        }
        else if (underlined) {
            return underlined;
        }
        else if (menu) {
            return menu;
        }
        else
            return bold;
    }
    linkClassNames() {
        return classNames("link", "primary", this.getVariantClass(), this.getSizeClass(), this.disabled ? "disabled" : "");
    }
    static get is() { return "ifx-link"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["link.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["link.css"]
        };
    }
    static get properties() {
        return {
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
                "attribute": "href",
                "defaultValue": "undefined"
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
            "variant": {
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
                "attribute": "variant",
                "defaultValue": "\"bold\""
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "download": {
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
                "attribute": "download"
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
            "internalHref": {},
            "internalTarget": {},
            "internalVariant": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=link.js.map
