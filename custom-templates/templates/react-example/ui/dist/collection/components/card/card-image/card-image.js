import { h } from "@stencil/core";
export class CardImage {
    src;
    alt;
    position;
    imgPosition;
    handlePosition(position) {
        this.imgPosition.emit(position);
    }
    componentWillLoad() {
        this.handlePosition(this.position);
    }
    componentDidUpdate() {
        this.handlePosition(this.position);
    }
    render() {
        return h("img", { key: '4d873a7dd8edba0b7e1dfb3696420beb6d1273d2', src: this.src, alt: this.alt, class: "card-image" });
    }
    static get is() { return "ifx-card-image"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["card-image.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["card-image.css"]
        };
    }
    static get properties() {
        return {
            "src": {
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
                "attribute": "src"
            },
            "alt": {
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
                "attribute": "alt"
            },
            "position": {
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
                "attribute": "position"
            }
        };
    }
    static get events() {
        return [{
                "method": "imgPosition",
                "name": "imgPosition",
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
}
//# sourceMappingURL=card-image.js.map
