import { h, } from "@stencil/core";
import { getInitiallySelectedItems } from "../utils";
export class FilterAccordion {
    initialized = false;
    el;
    expanded = false;
    maxVisibleItems;
    count = 0;
    totalItems = 0;
    filterGroupName = "";
    ifxFilterAccordionChange;
    componentWillLoad() {
        this.el.addEventListener("ifxListUpdate", this.handleCheckedChange);
    }
    componentDidLoad() {
        if (!this.initialized) {
            const selectedItems = getInitiallySelectedItems(this.el);
            this.count = selectedItems.length;
            this.initialized = true; // Prevent further execution in future calls
        }
    }
    handleCheckedChange = (event) => {
        const selectedItems = event.detail.selectedItems;
        this.count = selectedItems.length;
        this.ifxFilterAccordionChange.emit({
            filterGroupName: this.filterGroupName,
            selectedItems,
        });
    };
    componentWillUnload() {
        this.el.removeEventListener("ifxListUpdate", this.handleCheckedChange);
    }
    toggleAccordion = (event) => {
        event.stopPropagation();
        this.expanded = !this.expanded;
    };
    render() {
        return (h("div", { key: '17fbd1f9def94f7338a92ed159b560cdb0ea5c20', class: `accordion ${this.expanded ? "expanded" : ""}` }, h("div", { key: 'd4950dd73670b9a8efa055706e415e4c6b92fae0', class: `header ${this.expanded ? "expanded" : ""}`, onClick: this.toggleAccordion }, h("div", { key: '996c5f20064e200a9c56e11e704c8f37b757729a', class: `text-and-icon ${this.expanded ? "expanded" : ""}` }, h("div", { key: '40e21cce69fe8673f636a1622e63ee1ba54b2c1f', class: "text" }, h("span", { key: '421652b4f84e604d0c815cddfeead5861099d718' }, this.filterGroupName), h("ifx-indicator", { key: 'dd9a758c3110680250506f31907a6c7e6521f8c4', variant: "number", number: this.count })), h("ifx-icon", { key: '6adbedf280099f79126f9e1b36af39778b1ead72', class: this.expanded ? "" : "hidden", icon: "minus-16", onClick: this.toggleAccordion }), h("ifx-icon", { key: '6b44875586538252c679312b776f1e43d4e39cb3', class: this.expanded ? "hidden" : "", icon: "plus-16", onClick: this.toggleAccordion }))), this.expanded && (h("div", { key: '2ed695afacb26e541c6c1a2ed1d8b68a90c1688f', class: "filter-accordion-container" }, h("slot", { key: 'ca3575022f9700040ec57e7b345b66896bd56bf9', name: "list" })))));
    }
    static get is() { return "ifx-filter-accordion"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["filter-accordion.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["filter-accordion.css"]
        };
    }
    static get properties() {
        return {
            "maxVisibleItems": {
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
                "attribute": "max-visible-items"
            },
            "filterGroupName": {
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
                "attribute": "filter-group-name",
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "expanded": {},
            "count": {},
            "totalItems": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxFilterAccordionChange",
                "name": "ifxFilterAccordionChange",
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
}
//# sourceMappingURL=filter-accordion.js.map
