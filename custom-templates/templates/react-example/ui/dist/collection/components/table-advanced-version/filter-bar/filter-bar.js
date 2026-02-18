// FilterBar.tsx
import { Host, h, } from "@stencil/core";
export class FilterBar {
    el;
    selectedOptions = [];
    ifxTopbarFilterChange;
    showAllFilters = false;
    maxShownFilters = 4; // Default to 4, can be overridden by parent component
    visibleSlots;
    showMoreFiltersButton = true;
    /* If the component is ever removed and then reattached to the DOM,
connectedCallback ensures that the event listeners are properly set up again */
    connectedCallback() {
        this.el.addEventListener("ifxFilterSelect", this.handleTopbarFilterChange);
        this.el.addEventListener("ifxFilterSearchChange", this.handleSearchChange);
        window.addEventListener("ifxResetFiltersEvent", this.handleResetEvent);
    }
    componentWillUnload() {
        this.el.removeEventListener("ifxFilterSelect", this.handleTopbarFilterChange);
        this.el.removeEventListener("ifxFilterSearchChange", this.handleSearchChange);
        window.removeEventListener("ifxResetFiltersEvent", this.handleResetEvent);
    }
    componentWillLoad() {
        this.updateVisibleSlots();
    }
    // Modify updateVisibleSlots to use showAllFilters to determine the number of slots
    updateVisibleSlots() {
        this.visibleSlots = this.showAllFilters
            ? Number.MAX_SAFE_INTEGER
            : this.maxShownFilters;
    }
    handleMoreFiltersClick = () => {
        this.showAllFilters = true;
        this.updateVisibleSlots(); // Recalculate visible slots based on the new state
    };
    handleResetEvent = () => {
        const filterSearchSlot = this.el.shadowRoot?.querySelector('slot[name="filter-search"]');
        if (filterSearchSlot instanceof HTMLSlotElement) {
            // Ensure it's treated as HTMLSlotElement
            const filterSearchSlottedElements = filterSearchSlot.assignedElements({
                flatten: true,
            });
            filterSearchSlottedElements.forEach((filterSearchWrapper) => {
                const filterSearch = filterSearchWrapper.querySelector("ifx-filter-search");
                const searchField = filterSearch.shadowRoot.querySelectorAll("ifx-search-field");
                if (searchField.length > 0) {
                    searchField.forEach((searchFieldElement) => {
                        searchFieldElement.value = "";
                    });
                }
            });
        }
        this.selectedOptions = [];
        // Emit the change to inform any parent components that the filters have been reset
        this.ifxTopbarFilterChange.emit(this.selectedOptions);
    };
    handleSearchChange = (event) => {
        this.handleTopbarFilterChange(event);
    };
    handleFilterSelect = (event) => {
        this.handleTopbarFilterChange(event);
    };
    handleTopbarFilterChange = (event) => {
        const newSelectedOptions = [...this.selectedOptions];
        if (event.type === "ifxFilterSearchChange") {
            const { filterName, filterValue } = event.detail;
            const existingOptionIndex = newSelectedOptions.findIndex((option) => option.filterName === filterName);
            if (existingOptionIndex !== -1) {
                // If an existing filter is found, update its value
                newSelectedOptions[existingOptionIndex].filterValues = [filterValue];
            }
            else {
                newSelectedOptions.push({
                    filterName: filterName,
                    filterValues: [filterValue],
                    type: "text",
                });
            }
        }
        else if (event.type === "ifxFilterSelect") {
            const { filterName, filterValues, type } = event.detail;
            const existingOptionIndex = newSelectedOptions.findIndex((option) => option.filterName === filterName);
            if (existingOptionIndex !== -1) {
                newSelectedOptions[existingOptionIndex].filterValues = filterValues;
                newSelectedOptions[existingOptionIndex].type = type; // Update type based on the number of selected items
            }
            else {
                newSelectedOptions.push({
                    filterName: filterName,
                    filterValues: filterValues,
                    type: type,
                });
            }
        }
        this.selectedOptions = newSelectedOptions;
        this.ifxTopbarFilterChange.emit(this.selectedOptions);
    };
    render() {
        const safeVisibleSlots = Math.max(0, this.visibleSlots);
        const actualNumberOfComponents = this.el.querySelectorAll("ifx-set-filter").length;
        // Calculate slotsToShow safely
        const slotsToShow = Math.min(safeVisibleSlots, actualNumberOfComponents, Number.MAX_SAFE_INTEGER);
        const slots = Array.from({ length: slotsToShow }, (_, i) => (h("div", { class: "filter-slot-wrapper" }, h("slot", { name: `filter-component-${i + 1}` }))));
        return (h(Host, { key: '7a227e3803a7fa44984e2f08fb8681df46136881' }, h("div", { key: 'aa9cc192f4b0b08efaf6c9f6390c844fb00cf57b', class: "search-container" }, h("slot", { key: '315551a3622d65b61b78b124013705ff3716607f', name: "filter-search" }), " "), h("div", { key: '12a9302a9619df28db86e70ab819a46291189202', class: "components-container" }, slots.length > 0 ? slots : h("slot", { name: "filter-component" }), this.showMoreFiltersButton && !this.showAllFilters && (h("div", { key: '1d3d8ed1eda9704ed7e615885d1150db2782ca60', class: "more-filters-wrapper", onClick: this.handleMoreFiltersClick }, h("ifx-button", { key: 'b5a13ae81f46cd5c8c255636902dc12152faa1dd', type: "button", disabled: false, variant: "tertiary", size: "m", target: "_blank", theme: "default", "full-width": "false" }, h("ifx-icon", { key: 'd134288470249bded05623d4c3b6921b8ed786fe', icon: "filter-16" }), "More filters"))))));
    }
    static get is() { return "ifx-filter-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["filter-bar.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["filter-bar.css"]
        };
    }
    static get properties() {
        return {
            "maxShownFilters": {
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
                "attribute": "max-shown-filters",
                "defaultValue": "4"
            },
            "showMoreFiltersButton": {
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
                "attribute": "show-more-filters-button",
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "selectedOptions": {},
            "showAllFilters": {},
            "visibleSlots": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxTopbarFilterChange",
                "name": "ifxTopbarFilterChange",
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
//# sourceMappingURL=filter-bar.js.map
