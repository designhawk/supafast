// SetFilter.tsx
import { h, } from "@stencil/core";
export class SetFilter {
    filterName;
    filterLabel;
    placeholder;
    type = "text";
    options;
    filterValues = [];
    ifxFilterSelect;
    handleTextInputChange(event) {
        const target = event.target;
        const value = target.value;
        this.ifxFilterSelect.emit({
            filterName: this.filterName,
            filterValues: [value],
            type: this.type,
        }); // Emit an array for consistency with the multi select component
    }
    handleSingleSelectChange(event) {
        const value = event.detail.value;
        this.ifxFilterSelect.emit({
            filterName: this.filterName,
            filterValues: [value],
            type: this.type,
        }); // Emit an array for consistency with the multi select component
    }
    handleMultiselectOptionChange(event) {
        this.filterValues = event.detail.map((option) => ({
            label: option.value,
            value: option.value,
        }));
        this.ifxFilterSelect.emit({
            filterName: this.filterName,
            filterValues: this.filterValues,
            type: this.type,
        });
    }
    render() {
        let optionsArray = [];
        // Parse options if it's a string
        if (typeof this.options === "string") {
            try {
                optionsArray = JSON.parse(this.options);
            }
            catch (e) {
                console.error("Failed to parse options:", e);
                optionsArray = [];
            }
        }
        else if (Array.isArray(this.options)) {
            optionsArray = this.options;
        }
        switch (this.type) {
            case "text":
                return (h("ifx-text-field", { error: false, disabled: false, placeholder: this.placeholder, onIfxInput: (event) => this.handleTextInputChange(event) }, this.filterLabel));
            case "single-select":
                return (h("ifx-select", { placeholder: "true", "search-enabled": "true", "search-placeholder-value": "Search...", onIfxSelect: (event) => this.handleSingleSelectChange(event), "ifx-placeholder-value": this.placeholder, "ifx-label": this.filterLabel, "ifx-options": this.options }));
            case "multi-select":
                return (h("ifx-multiselect", { label: this.filterLabel, placeholder: this.placeholder, onIfxSelect: (event) => this.handleMultiselectOptionChange(event) }, optionsArray.map((option) => (h("ifx-multiselect-option", { value: option.value || option }, option.label || option)))));
            default:
                return null;
        }
    }
    static get is() { return "ifx-set-filter"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["set-filter.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["set-filter.css"]
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
            "filterLabel": {
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
                "attribute": "filter-label"
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
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"text\" | \"single-select\" | \"multi-select\"",
                    "resolved": "\"multi-select\" | \"single-select\" | \"text\"",
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
                "attribute": "type",
                "defaultValue": "\"text\""
            },
            "options": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "any[] | string",
                    "resolved": "any[] | string",
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
                "attribute": "options"
            }
        };
    }
    static get states() {
        return {
            "filterValues": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxFilterSelect",
                "name": "ifxFilterSelect",
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
//# sourceMappingURL=setFilter.js.map
