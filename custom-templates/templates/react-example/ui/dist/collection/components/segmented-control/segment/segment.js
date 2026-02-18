import { h } from "@stencil/core";
export class Segment {
    segmentSelect;
    icon;
    segmentIndex;
    selected = false;
    value;
    handleSegmentClick() {
        if (this.selected)
            return;
        this.selected = true;
        this.segmentSelect.emit(this.segmentIndex);
    }
    handleSegmentKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
            if (this.selected)
                return;
            this.selected = true;
            this.segmentSelect.emit(this.segmentIndex);
        }
    }
    render() {
        return (h("div", { key: '507508f20c8f117612d0026ef64ec0eed2a60d39', class: `segment ${this.selected ? "segment--selected" : ""}`, tabIndex: 0, onClick: () => {
                this.handleSegmentClick();
            }, onKeyDown: (e) => {
                this.handleSegmentKeyDown(e);
            } }, h("ifx-icon", { key: '4327359a404e54a7c3050b28f464cca7e4ab516f', icon: this.icon }), " ", h("slot", { key: '06b002eb7f16b55c839ef1003cce515c3ef065e3' })));
    }
    static get is() { return "ifx-segment"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["segment.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["segment.css"]
        };
    }
    static get properties() {
        return {
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
            "segmentIndex": {
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
                "attribute": "segment-index"
            },
            "selected": {
                "type": "boolean",
                "mutable": true,
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
                "attribute": "selected",
                "defaultValue": "false"
            },
            "value": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value"
            }
        };
    }
    static get events() {
        return [{
                "method": "segmentSelect",
                "name": "segmentSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=segment.js.map
