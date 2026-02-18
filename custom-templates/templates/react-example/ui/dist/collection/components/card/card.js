import { Host, h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Card {
    el;
    noBtns;
    direction = "vertical";
    alignment;
    noImg;
    href = "";
    internalHref = "";
    target = "_self";
    ariaLabel;
    setImgPosition(event) {
        this.alignment = event.detail;
    }
    handleComponentAdjustment() {
        const image = this.el.querySelector("ifx-card-image");
        const links = this.el.querySelector("ifx-card-links");
        this.noImg = !image;
        this.noBtns = !links;
        if (this.href.trim() === "") {
            this.internalHref = undefined;
        }
        else {
            this.internalHref = this.href;
        }
    }
    componentWillLoad() {
        this.handleComponentAdjustment();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-card", await framework);
        }
    }
    componentWillUpdate() {
        this.handleComponentAdjustment();
    }
    render() {
        return (h(Host, { key: 'ac68cddd666db698857e3eb10d86cbe77e364618' }, h("div", { key: '591f0ea9b76f9fca3f30eef1c83b9423d85e7b08', "aria-label": this.ariaLabel, class: `card 
            ${this.noBtns ? "noBtns" : ""}
            ${this.direction} 
            ${this.alignment}`, role: "group" }, this.direction === "horizontal" && (h("div", { key: '79e1bfb0ab14d27cad85ea769bba000134eb4f67', class: "horizontal" }, h("a", { key: 'b361a82ee361638555f33dfc0d385e6bd373692e', class: `card-img ${this.noImg ? "noImage" : ""} ${this.internalHref ? "card-href" : ""}`, href: this.internalHref }, h("slot", { key: '43b6e03c316fdf4638715c43d0b468e54009c7f1', name: "img" })), h("div", { key: '7fd8fe601252de72c4827ece503de252b2cb7e8e', class: "lower__body-wrapper" }, h("a", { key: '54e08c6b2a853e9bb1c8e2b12f4ab8343737962c', class: `upper-body ${this.internalHref ? "card-href" : ""}`, href: this.internalHref, id: "upper-body-content" }, h("slot", { key: '69675c7dae8742e4824acb77437ad24c6973e55d' })), h("div", { key: '6d64de2be47f2e350c19501c10bb58bceb90178c' }, h("slot", { key: '9fa0acb4053477e64315037adad8f2fc2182410f', name: "buttons" }))))), this.direction === "vertical" && (h("div", { key: 'b09ad059ebb0562072d97724b1468e0a4039fbbb', class: "vertical" }, h("a", { key: 'f946270697e1def8ff3338d2571134f4537a1ba5', class: `upper__body-wrapper ${this.internalHref ? "card-href" : ""}`, href: this.internalHref, target: this.target }, h("div", { key: '483d9b4cc3474859010aaab1e72598dfac058324', class: `card-img ${this.noImg ? "noImage" : ""}` }, h("slot", { key: 'ca41b186041671328e7917c28598bd025895b15a', name: "img" })), h("div", { key: '69f281f061770ebbe9d806e399e0f4637a99236a', class: "upper-body", id: "upper-body-content" }, h("slot", { key: 'a8300f60cf8873fa3cbbca27d3104fdd920376b6' }))), h("div", { key: 'b995106b4caf531b7c1230f7721d88102229733d', class: "lower__body-wrapper", role: "group", "aria-labelledby": "upper-body-content" }, h("slot", { key: 'b792f52c8a05fe31dbf73526888816f8b341efa1', name: "buttons" })))))));
    }
    static get is() { return "ifx-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["card.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card.css"]
        };
    }
    static get properties() {
        return {
            "direction": {
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
                "attribute": "direction",
                "defaultValue": "\"vertical\""
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
                "attribute": "href",
                "defaultValue": "\"\""
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
            "noBtns": {},
            "alignment": {},
            "noImg": {},
            "internalHref": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "imgPosition",
                "method": "setImgPosition",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=card.js.map
