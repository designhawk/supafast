import { h, } from "@stencil/core";
export class FilterSearch {
    host;
    filterName;
    disabled = false;
    filterValue;
    filterKey;
    showDeleteIcon = false;
    filterOrientation = "sidebar"; //topbar
    placeholder;
    ifxFilterSearchChange;
    valueChanged(newValue) {
        this.host.setAttribute("value", newValue.toString());
    }
    handleFilterSearchChange(event) {
        // Check if a search filter with the same filterName already exists
        const existingFilter = this.host.parentElement.querySelector(`ifx-filter-search[filter-name="${this.filterName}"]`);
        if (existingFilter && existingFilter !== this.host) {
            throw new Error(`A search filter with the name '${this.filterName}' already exists.`);
        }
        // // Check if the filterName is 'search' and the filter is not the search component
        // if (this.filterName === 'search' && this.filterKey !== 'text') {
        //   throw new Error("The filter name 'search' is reserved for the search component.");
        // }
        this.filterValue = event.detail;
        this.showDeleteIcon = this.filterValue !== "";
        this.ifxFilterSearchChange.emit({
            filterName: this.filterName,
            filterValue: this.filterValue,
            filterKey: this.filterKey,
        }); // Emitting filterKey along with other properties
    }
    render() {
        return (h("div", { key: '91bd7376e86f8ddd670e1e14899b2b141bd0a769', class: `${this.filterOrientation === "sidebar"
                ? "sidebar-filter-search-wrapper"
                : "topbar-filter-search-wrapper"}` }, h("div", { key: 'e1b0804255ba3fd762b1bd0a669851ae011d6541', class: "filter-name" }, this.filterName), h("ifx-search-field", { key: '92ba71f980dafa0ef75aad76db9f3144176d7501', placeholder: this.placeholder, "show-delete-icon": this.showDeleteIcon, disabled: this.disabled, value: this.filterValue })));
    }
    static get is() { return "ifx-filter-search"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["filter-search.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["filter-search.css"]
        };
    }
    static get properties() {
        return {
            "filterName": {
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
                "attribute": "filter-name"
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
            "filterValue": {
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
                "attribute": "filter-value"
            },
            "filterKey": {
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
                "attribute": "filter-key"
            },
            "filterOrientation": {
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
                "attribute": "filter-orientation",
                "defaultValue": "\"sidebar\""
            },
            "placeholder": {
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
                "attribute": "placeholder"
            }
        };
    }
    static get states() {
        return {
            "showDeleteIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxFilterSearchChange",
                "name": "ifxFilterSearchChange",
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
    static get elementRef() { return "host"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "ifxInput",
                "method": "handleFilterSearchChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=filter-search.js.map
