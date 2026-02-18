import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';

const filterSearchCss = () => `.sidebar-filter-search-wrapper{display:flex;padding:12px 16px 16px 16px;flex-direction:column;align-items:flex-start;align-self:stretch;gap:4px;font-family:var(--ifx-font-family);background:#EEEDED}.topbar-filter-search-wrapper{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch;gap:4px;font-family:var(--ifx-font-family)}.topbar-filter-search-wrapper ifx-search-field{width:100%;}.filter-name{font-size:1rem;line-height:1.5rem;font-weight:600}`;

const FilterSearch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxFilterSearchChange = createEvent(this, "ifxFilterSearchChange", 7);
    }
    get host() { return getElement(this); }
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
    static get watchers() { return {
        "value": [{
                "valueChanged": 0
            }]
    }; }
};
FilterSearch.style = filterSearchCss();

export { FilterSearch as ifx_filter_search };
//# sourceMappingURL=ifx-filter-search.entry.js.map

//# sourceMappingURL=ifx-filter-search.entry.js.map