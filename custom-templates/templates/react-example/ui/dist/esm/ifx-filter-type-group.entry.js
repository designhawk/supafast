import { r as registerInstance, c as createEvent, a as getElement, h, d as Host } from './index-CA_siwAQ.js';

const filterTypeGroupCss = () => `:host{display:flex}.filter-type-group{width:260px;align-items:flex-start;gap:8px}.filter-type-group>::slotted(*){margin-bottom:8px}`;

const IfxFilterTypeGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxSidebarFilterChange = createEvent(this, "ifxSidebarFilterChange", 7);
    }
    get el() { return getElement(this); }
    selectedOptions = [];
    ifxSidebarFilterChange;
    /* If the component is ever removed and then reattached to the DOM,
  connectedCallback ensures that the event listeners are properly set up again */
    connectedCallback() {
        this.el.addEventListener("ifxFilterAccordionChange", this.handleAccordionChange);
        this.el.addEventListener("ifxFilterSearchChange", this.handleSearchChange);
        window.addEventListener("ifxResetFiltersEvent", this.handleResetEvent);
        window.addEventListener("ifxUpdateSidebarFilter", this.handleUpdateSidebarFilter);
    }
    componentWillUnload() {
        this.el.removeEventListener("ifxFilterAccordionChange", this.handleAccordionChange);
        this.el.removeEventListener("ifxFilterSearchChange", this.handleSearchChange);
        window.removeEventListener("ifxResetFiltersEvent", this.handleResetEvent);
    }
    handleResetEvent = () => {
        const accordionSlot = this.el.shadowRoot.querySelector('slot[name="filter-accordion"]');
        const filterAccordionSlottedElements = accordionSlot.assignedElements({ flatten: true });
        filterAccordionSlottedElements.forEach((accordionElement) => {
            const ifxLists = accordionElement.querySelectorAll("ifx-list");
            ifxLists.forEach((ifxListElement) => {
                ifxListElement.resetTrigger = !ifxListElement.resetTrigger;
            });
        });
        const filterSearchSlot = this.el.shadowRoot.querySelector('slot[name="filter-search"]');
        const filterSearchSlottedElements = filterSearchSlot.assignedElements({ flatten: true });
        filterSearchSlottedElements.forEach((filterSearchWrapper) => {
            const filterSearch = filterSearchWrapper.querySelector("ifx-filter-search");
            const searchField = filterSearch.shadowRoot.querySelectorAll("ifx-search-field");
            if (searchField.length > 0) {
                searchField.forEach((searchFieldElement) => {
                    searchFieldElement.value = "";
                });
            }
        });
        this.selectedOptions = [];
        // Emit the change to inform any parent components that the filters have been reset
        this.ifxSidebarFilterChange.emit(this.selectedOptions);
    };
    handleUpdateSidebarFilter = (event) => {
        const { filterName } = event.detail;
        const accordionSlot = this.el.shadowRoot.querySelector('slot[name="filter-accordion"]');
        const filterAccordionSlottedElements = accordionSlot
            ? accordionSlot.assignedElements({ flatten: true })
            : [];
        filterAccordionSlottedElements.forEach((accordionElement) => {
            const ifxLists = accordionElement.querySelectorAll("ifx-list");
            ifxLists.forEach((ifxListElement) => {
                if (ifxListElement.getAttribute("name") === filterName) {
                    ifxListElement.resetTrigger = !ifxListElement.resetTrigger;
                }
            });
        });
        // Clear the search bar within the filter-search slot
        const searchSlot = this.el.shadowRoot.querySelector('slot[name="filter-search"]');
        const filterSearchSlottedElements = searchSlot
            ? searchSlot.assignedNodes({ flatten: true })
            : [];
        filterSearchSlottedElements.forEach((searchElement) => {
            if (searchElement.nodeType === Node.ELEMENT_NODE) {
                // Identify the ifx-filter-search component within the slot
                const filterSearchComponent = searchElement;
                const searchField = filterSearchComponent.firstElementChild;
                if (searchField) {
                    searchField.setAttribute("value", "");
                    searchField.dispatchEvent(new CustomEvent("ifxInput", {
                        bubbles: true,
                        composed: true,
                        detail: "",
                    })); // Trigger ifxInput event to reset
                }
            }
        });
        const newSelectedOptions = this.selectedOptions.map((option) => {
            if (option.filterGroupName === filterName) {
                return { ...option, selectedItems: [], value: "" };
            }
            return option;
        });
        this.selectedOptions = newSelectedOptions;
        this.ifxSidebarFilterChange.emit(this.selectedOptions);
    };
    handleAccordionChange = (event) => {
        this.handleFilterChange(event);
    };
    handleSearchChange = (event) => {
        // Call handleFilterChange with the created CustomEvent object
        this.handleFilterChange(event);
    };
    handleFilterChange = (event) => {
        // Create a new array to hold the new state
        const newSelectedOptions = [...this.selectedOptions];
        // Check the type of the event
        if (event.type === "ifxFilterSearchChange") {
            // Handle the ifxFilterSearchChange event
            const { filterName, filterValue } = event.detail;
            // Find the existing filter with the same filterName
            const existingOptionIndex = newSelectedOptions.findIndex((option) => typeof option !== "string" && option.filterGroupName === filterName);
            if (existingOptionIndex !== -1) {
                // If an existing filter is found, update its value
                newSelectedOptions[existingOptionIndex].value = filterValue;
            }
            else {
                // If no existing filter is found, append the new filter
                newSelectedOptions.push({
                    filterGroupName: filterName,
                    value: filterValue,
                });
            }
        }
        else if (event.type === "ifxFilterAccordionChange") {
            const { filterGroupName, selectedItems } = event.detail;
            // Find the existing filter group with the same filterGroupName
            const existingOptionIndex = newSelectedOptions.findIndex((option) => option.filterGroupName === filterGroupName);
            if (existingOptionIndex !== -1) {
                // If an existing filter group is found, update its selectedItems
                newSelectedOptions[existingOptionIndex] = {
                    filterGroupName,
                    selectedItems,
                };
            }
            else {
                // If no existing filter group is found, append the new filter group
                newSelectedOptions.push({ filterGroupName, selectedItems });
            }
        }
        // Update the state with the new selected options
        this.selectedOptions = newSelectedOptions;
        // Emit the entire selectedOptions array
        this.ifxSidebarFilterChange.emit(this.selectedOptions);
    };
    render() {
        return (h(Host, { key: 'fa23a5623122875d0fb73f00e3137eb8d5b3b2d8' }, h("div", { key: '26ccb7ed20d68e0a5ed26edb224700bf93502470', class: "filter-type-group" }, h("slot", { key: '9e0ccf0628230109ff143c1037bca05b01e962d1', name: "filter-search" }), h("slot", { key: 'e124f556423c8c255df6fbacce64a922767142dc', name: "filter-accordion" }))));
    }
};
IfxFilterTypeGroup.style = filterTypeGroupCss();

export { IfxFilterTypeGroup as ifx_filter_type_group };
//# sourceMappingURL=ifx-filter-type-group.entry.js.map

//# sourceMappingURL=ifx-filter-type-group.entry.js.map