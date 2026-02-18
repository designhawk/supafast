import { r as registerInstance, c as createEvent, a as getElement, h, d as Host } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const multiselectCss = () => `.ifx-multiselect-container{position:relative;box-sizing:border-box;font-family:var(--ifx-font-family)}.ifx-multiselect-container.disabled .ifx-label-wrapper{color:#BFBBBB}.ifx-multiselect-container.disabled .ifx-multiselect-wrapper{background:#BFBBBB;color:#FFFFFF;border-color:#BFBBBB;cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ifx-multiselect-container:hover{cursor:pointer}.ifx-multiselect-container .ifx-label-wrapper{font-size:1rem;line-height:1.5rem;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;max-width:100%}.ifx-multiselect-container .ifx-label-wrapper .required{margin-left:4px}.ifx-multiselect-container .ifx-label-wrapper .required.error{color:#CD002F}.ifx-multiselect-container .multi__select-caption{font-style:normal;font-weight:400;font-size:0.75rem;line-height:1rem;color:#1D1D1D;flex:none;order:1;align-self:stretch;flex-grow:0}.ifx-multiselect-container .multi__select-caption.error{color:#CD002F}.ifx-multiselect-container .multi__select-caption.disabled{color:#BFBBBB}.ifx-multiselect-container .ifx-multiselect-wrapper{background-color:#FFFFFF;box-sizing:border-box;display:flex;align-items:center;border:1px solid #8D8786;border-radius:1px;width:100%;font-weight:400;font-style:normal;height:40px;line-height:24px;padding:8px 16px;font-size:1rem;line-height:1.5rem}.ifx-multiselect-container .ifx-multiselect-wrapper:focus-visible{outline:none}.ifx-multiselect-container .ifx-multiselect-wrapper:focus-visible:not(.active):not(:active){outline:none}.ifx-multiselect-container .ifx-multiselect-wrapper:focus-visible:not(.active):not(:active)::before{content:"";position:absolute;width:calc(100% + 4px);height:calc(100% + 4px);top:50%;left:50%;transform:translate(-50%, -50%);border:2px solid #0A8276;border-radius:2px}.ifx-multiselect-container .ifx-multiselect-wrapper.error{border-color:#CD002F}.ifx-multiselect-container .ifx-multiselect-wrapper.active{border-color:#0A8276 !important}.ifx-multiselect-container .ifx-multiselect-wrapper.active .icon-wrapper-up{display:flex;align-items:center;justify-content:center;padding-left:8px}.ifx-multiselect-container .ifx-multiselect-wrapper.active .icon-wrapper-down{display:none}.ifx-multiselect-container .ifx-multiselect-wrapper .icon-wrapper-up{display:none}.ifx-multiselect-container .ifx-multiselect-wrapper .icon-wrapper-down{display:flex;align-items:center;justify-content:center;padding-left:8px}.ifx-multiselect-container .ifx-multiselect-wrapper.is-flipped .ifx-multiselect-dropdown-menu{top:auto;bottom:100%}.ifx-multiselect-container .ifx-multiselect-input{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ifx-multiselect-container .ifx-multiselect-input.placeholder{opacity:0.5}.ifx-multiselect-container .ifx-multiselect-icon-container{margin-left:auto;display:flex;align-items:center;gap:8px}.ifx-multiselect-container .ifx-multiselect-icon-container .ifx-multiselect-icon-container{display:flex}.ifx-multiselect-container .ifx-multiselect-icon-container .icon-wrapper{display:flex;align-items:center;transition:transform 0.2s ease-in-out}.ifx-multiselect-container .ifx-multiselect-icon-container .icon-wrapper--open{transform:rotate(180deg)}.ifx-multiselect-container .ifx-clear-button{display:flex;align-items:center}.ifx-multiselect-container .ifx-clear-button.hide{display:none}.ifx-multiselect-container .ifx-multiselect-dropdown-menu{box-sizing:border-box;position:absolute;top:100%;left:0;width:100%;margin-top:4px;padding-bottom:8px;border:1px solid #EEEDED;background-color:#FFFFFF;box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1);max-height:300px;z-index:1000;display:flex;flex-direction:column}.ifx-multiselect-container:not(.disabled) .ifx-multiselect-wrapper:hover:not(.focus,:focus){border-color:#575352}.ifx-multiselect-dropdown-functions{padding:12px 16px;border-bottom:1px solid #EEEDED;flex-shrink:0}.ifx-multiselect-dropdown-search{margin-bottom:12px}.ifx-multiselect-dropdown-controls{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px}.ifx-multiselect-dropdown-controls .select-all-wrapper{display:flex}.ifx-multiselect-dropdown-controls .expand-collapse-controls{display:flex;gap:12px}.ifx-multiselect-dropdown-controls .control-item{font-size:16px;line-height:24px}.ifx-multiselect-dropdown-controls .control-item:hover{color:#0A8276}.ifx-multiselect-dropdown-controls .control-item:active{color:#08665C}.ifx-multiselect-dropdown-controls .control-item:focus{outline:none}.ifx-multiselect-dropdown-controls .control-item:focus-visible{outline:2px solid #0A8276;outline-offset:2px;border-radius:1px}.ifx-multiselect-options{flex:1;overflow-y:auto;padding-top:8px}.ifx-multiselect-options.show-no-results .ifx-multiselect-no-results{display:block}.ifx-multiselect-no-results{padding-left:16px;padding-right:16px;display:none}`;

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
const Multiselect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxSelect = createEvent(this, "ifxSelect", 7);
        this.ifxOpen = createEvent(this, "ifxOpen", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    name;
    disabled = false;
    required = false;
    error = false;
    caption = "";
    label = "";
    placeholder = "";
    showSearch = true;
    showSelectAll = true;
    showClearButton = true;
    showExpandCollapse = true;
    noResultsMessage = "No results found.";
    showNoResultsMessage = true;
    searchPlaceholder = "Search";
    selectAllLabel = "Select all";
    expandLabel = "Expand";
    collapseLabel = "Collapse";
    ariaMultiSelectLabel = "Multi-select dropdown";
    ariaMultiSelectLabelledBy = "";
    ariaMultiSelectDescribedBy = "";
    ariaSearchLabel = "Search options";
    ariaClearLabel = "Clear all selections";
    ariaToggleLabel = "Toggle dropdown";
    ariaSelectAllLabel = "Select all options";
    ariaExpandAllLabel = "Expand all categories";
    ariaCollapseAllLabel = "Collapse all categories";
    internalError = false;
    persistentSelectedOptions = [];
    dropdownOpen = false;
    dropdownFlipped;
    searchTerm = "";
    ifxSelect;
    ifxOpen;
    get el() { return getElement(this); }
    dropdownElement;
    internals;
    parseChildOptions() {
        const options = [];
        const childElements = Array.from(this.el.children);
        childElements.forEach((child, index) => {
            if (child.tagName === "IFX-MULTISELECT-OPTION") {
                const option = this.parseOptionElement(child, index);
                if (option) {
                    options.push(option);
                }
            }
        });
        return options;
    }
    parseOptionElement(element, index) {
        const value = element.getAttribute("value") || `option-${index}`;
        const selected = element.hasAttribute("selected");
        const disabled = element.hasAttribute("disabled");
        const indeterminate = element.hasAttribute("indeterminate");
        const option = {
            value,
            selected,
            disabled,
            indeterminate,
        };
        const nestedOptions = Array.from(element.children)
            .filter((child) => child.tagName === "IFX-MULTISELECT-OPTION")
            .map((child, childIndex) => this.parseOptionElement(child, childIndex))
            .filter((opt) => opt !== null);
        if (nestedOptions.length > 0) {
            option.children = nestedOptions;
        }
        return option;
    }
    loadInitialOptions() {
        this.internalError = this.error;
        const allOptions = this.parseChildOptions();
        const initiallySelected = this.collectSelectedOptions(allOptions);
        const initiallySelectedNotInState = initiallySelected.filter((init) => !this.persistentSelectedOptions.some((opt) => opt.value == init.value));
        this.persistentSelectedOptions = [
            ...this.persistentSelectedOptions,
            ...initiallySelectedNotInState,
        ];
    }
    collectSelectedOptions(options) {
        let selectedOptions = [];
        for (const option of options) {
            if (option.selected) {
                if (option.children && option.children.length > 0) {
                    selectedOptions = selectedOptions.concat(this.collectLeafOptions(option.children));
                }
                else {
                    if (!selectedOptions.some((existingOption) => existingOption.value === option.value)) {
                        selectedOptions.push(option);
                    }
                }
            }
            else {
                if (option.children && option.children.length > 0) {
                    selectedOptions = selectedOptions.concat(this.collectSelectedOptions(option.children));
                }
            }
        }
        return selectedOptions;
    }
    collectLeafOptions(children) {
        let leafOptions = [];
        for (const child of children) {
            if (child.children && child.children.length > 0) {
                leafOptions = leafOptions.concat(this.collectLeafOptions(child.children));
            }
            else {
                leafOptions.push(child);
            }
        }
        return leafOptions;
    }
    handleSearch = debounce((targetElement) => {
        const searchTerm = targetElement.value.toLowerCase();
        const isSearchActive = searchTerm !== "";
        this.searchTerm = searchTerm;
        const wrapper = this.el.shadowRoot.querySelector(".ifx-multiselect-wrapper");
        if (wrapper) {
            if (isSearchActive) {
                wrapper.classList.remove("active");
            }
            else {
                const searchField = this.el.shadowRoot.querySelector("ifx-search-field");
                const searchFieldHasFocus = searchField && searchField.matches(":focus-within");
                if (!searchFieldHasFocus) {
                    wrapper.classList.add("active");
                }
            }
        }
        const optionsContainer = this.el.shadowRoot.querySelector(".ifx-multiselect-options");
        if (optionsContainer) {
            if (isSearchActive) {
                optionsContainer.classList.add("has-search-filter");
            }
            else {
                optionsContainer.classList.remove("has-search-filter");
            }
        }
        requestAnimationFrame(() => {
            const allOptions = this.el.querySelectorAll("ifx-multiselect-option");
            allOptions.forEach((option) => {
                const searchEvent = new CustomEvent("ifx-search-filter", {
                    detail: { searchTerm, isActive: isSearchActive },
                });
                option.dispatchEvent(searchEvent);
            });
            if (isSearchActive) {
                setTimeout(() => {
                    const allOptions = this.el.querySelectorAll("ifx-multiselect-option");
                    let visibleCount = 0;
                    allOptions.forEach((option) => {
                        const style = window.getComputedStyle(option);
                        const rect = option.getBoundingClientRect();
                        if (style.display !== "none" &&
                            style.visibility !== "hidden" &&
                            style.opacity !== "0" &&
                            rect.height > 0) {
                            visibleCount++;
                        }
                    });
                    const optionsContainer = this.el.shadowRoot.querySelector(".ifx-multiselect-options");
                    if (optionsContainer) {
                        if (visibleCount === 0) {
                            optionsContainer.classList.add("show-no-results");
                        }
                        else {
                            optionsContainer.classList.remove("show-no-results");
                        }
                    }
                }, 200);
            }
            else {
                const optionsContainer = this.el.shadowRoot.querySelector(".ifx-multiselect-options");
                if (optionsContainer) {
                    optionsContainer.classList.remove("show-no-results");
                }
            }
        });
    }, 150);
    handleSearchFocus(hasFocus) {
        const wrapper = this.el.shadowRoot.querySelector(".ifx-multiselect-wrapper");
        if (wrapper) {
            if (hasFocus || this.searchTerm !== "") {
                wrapper.classList.remove("active");
            }
            else {
                wrapper.classList.add("active");
            }
        }
    }
    positionDropdown() {
        const wrapperRect = this.el.shadowRoot
            .querySelector(".ifx-multiselect-wrapper")
            ?.getBoundingClientRect();
        const spaceBelow = window.innerHeight - wrapperRect.bottom;
        const spaceAbove = wrapperRect.top;
        if ((spaceAbove > spaceBelow && wrapperRect.height > spaceBelow) ||
            wrapperRect.bottom > window.innerHeight) {
            this.dropdownFlipped = true;
        }
        else {
            this.dropdownFlipped = false;
        }
    }
    //private pendingSelectionUpdate = false;
    updateSlotBasedSelections(emitEvent = false) {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        const selectedLeafOptions = [];
        allOptionElements.forEach((optionEl) => {
            const instance = optionEl["__stencil_instance"];
            if (instance && instance.selected && !instance.hasChildren) {
                selectedLeafOptions.push({
                    value: instance.value,
                    selected: true,
                    disabled: instance.disabled,
                    label: instance.getTextContent() || instance.value,
                });
            }
        });
        this.persistentSelectedOptions = selectedLeafOptions;
        if (emitEvent) {
            this.ifxSelect.emit(this.persistentSelectedOptions);
        }
    }
    updateInitialParentStates() {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        const optionsByDepth = Array.from(allOptionElements)
            .map((el) => ({
            element: el,
            instance: el["__stencil_instance"],
            depth: parseInt(el.getAttribute("data-level") || "0"),
        }))
            .filter((item) => item.instance)
            .sort((a, b) => b.depth - a.depth);
        optionsByDepth.forEach(({ instance }) => {
            if (instance.hasChildren) {
                this.updateParentState(instance);
            }
        });
    }
    updateParentState(parentInstance) {
        const directChildren = Array.from(parentInstance.el.children)
            .filter((child) => child.tagName === "IFX-MULTISELECT-OPTION")
            .map((child) => child["__stencil_instance"])
            .filter((instance) => instance !== null);
        const selectedCount = directChildren.filter((child) => child.selected).length;
        const indeterminateCount = directChildren.filter((child) => child.indeterminate).length;
        const totalCount = directChildren.length;
        if (selectedCount === totalCount && indeterminateCount === 0) {
            parentInstance.selected = true;
            parentInstance.indeterminate = false;
        }
        else if (selectedCount === 0 && indeterminateCount === 0) {
            parentInstance.selected = false;
            parentInstance.indeterminate = false;
        }
        else {
            parentInstance.selected = false;
            parentInstance.indeterminate = true;
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-multiselect", await framework);
        }
        setTimeout(() => {
            this.positionDropdown();
        }, 500);
        this.el.addEventListener("ifx-option-changed", (event) => {
            const optionInstance = event.target?.__stencil_instance;
            if (optionInstance && !optionInstance.hasChildren) {
                this.updateSlotBasedSelections(true);
            }
        });
        setTimeout(() => {
            this.updateSlotBasedSelections(false);
            this.updateInitialParentStates();
        }, 100);
    }
    componentWillLoad() {
        this.loadInitialOptions();
    }
    updateInternalError() {
        this.internalError = this.error;
    }
    onSelectionChange(newValue, _) {
        const formData = new FormData();
        newValue.forEach((option) => formData.append(this.name, option.value));
        //this.internals.setFormValue(formData);
    }
    collapseAll() {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        allOptionElements.forEach((optionEl) => {
            const instance = optionEl["__stencil_instance"];
            if (instance && instance.hasChildren) {
                instance.isExpanded = false;
            }
        });
    }
    expandAll() {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        allOptionElements.forEach((optionEl) => {
            const instance = optionEl["__stencil_instance"];
            if (instance && instance.hasChildren) {
                instance.isExpanded = true;
            }
        });
    }
    selectAll() {
        this.resetSearch();
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        allOptionElements.forEach((optionEl) => {
            const instance = optionEl["__stencil_instance"];
            if (instance) {
                if (instance.hasChildren) {
                    instance.isExpanded = true;
                }
                else {
                    instance.selected = true;
                }
            }
        });
        setTimeout(() => {
            this.updateInitialParentStates();
            this.updateSlotBasedSelections(false);
            this.ifxSelect.emit(this.persistentSelectedOptions);
        }, 0);
    }
    async clearSelection() {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        allOptionElements.forEach((optionEl) => {
            const instance = optionEl["__stencil_instance"];
            if (instance) {
                instance.selected = false;
                instance.indeterminate = false;
                if (instance.hasChildren) {
                    instance.isExpanded = false;
                }
            }
        });
        this.persistentSelectedOptions = [];
        setTimeout(() => {
            this.updateSlotBasedSelections(false);
            this.ifxSelect.emit(this.persistentSelectedOptions);
        }, 0);
    }
    handleDocumentClick = (event) => {
        const path = event.composedPath();
        if (!path.includes(this.dropdownElement)) {
            this.dropdownOpen = false;
            document.removeEventListener("click", this.handleDocumentClick);
            this.resetSearch();
            this.ifxOpen.emit(this.dropdownOpen);
        }
    };
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        setTimeout(() => {
            if (this.dropdownOpen) {
                document.addEventListener("click", this.handleDocumentClick);
            }
            else {
                this.resetSearch();
            }
            this.ifxOpen.emit(this.dropdownOpen);
        }, 0);
    }
    resetSearch() {
        this.searchTerm = "";
        const searchField = this.el.shadowRoot.querySelector("ifx-search-field");
        if (searchField) {
            searchField.value = "";
        }
        const optionsContainer = this.el.shadowRoot.querySelector(".ifx-multiselect-options");
        if (optionsContainer) {
            optionsContainer.classList.remove("has-search-filter");
        }
        const allOptions = this.el.querySelectorAll("ifx-multiselect-option");
        allOptions.forEach((option) => {
            const searchEvent = new CustomEvent("ifx-search-filter", {
                detail: { searchTerm: "", isActive: false },
            });
            option.dispatchEvent(searchEvent);
        });
    }
    handleWrapperClick(event) {
        this.positionDropdown();
        if (event.currentTarget === event.target) {
            this.toggleDropdown();
        }
    }
    handleKeyDown(event) {
        if (this.disabled)
            return;
        // If dropdown is closed, only allow opening
        if (!this.dropdownOpen) {
            switch (event.code) {
                case "Enter":
                case "Space":
                case "ArrowDown":
                    event.preventDefault();
                    this.toggleDropdown();
                    break;
            }
            return;
        }
        // Dropdown is open - handle navigation and controls
        switch (event.code) {
            case "Escape":
                event.preventDefault();
                this.toggleDropdown();
                break;
            case "Enter":
            case "Space": {
                // Don't close dropdown when pressing space/enter in controls area
                const target = event.target;
                if (!target.closest(".ifx-multiselect-dropdown-functions")) {
                    event.preventDefault();
                    this.toggleDropdown();
                }
                break;
            }
            case "ArrowDown":
            case "ArrowUp":
                // Focus first/last option for navigation
                event.preventDefault();
                this.focusFirstOption();
                break;
        }
    }
    focusFirstOption() {
        const firstOption = this.el.querySelector("ifx-multiselect-option:not(.search-hidden)");
        if (firstOption) {
            const labelElement = firstOption.shadowRoot?.querySelector(".option-label");
            labelElement?.focus();
        }
    }
    renderSelectAll() {
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        const leafOptions = Array.from(allOptionElements).filter((el) => !el.hasChildren);
        const selectedLeafOptions = Array.from(allOptionElements).filter((el) => !el.hasChildren && el.selected);
        const allSelected = leafOptions.length > 0 &&
            selectedLeafOptions.length === leafOptions.length;
        const toggleSelectAll = (event) => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (allSelected) {
                this.clearSelection();
            }
            else {
                this.selectAll();
            }
        };
        return (h("div", { class: "select-all-wrapper" }, h("ifx-checkbox", { id: "selectAll", checked: allSelected, size: "s", "aria-label": this.ariaSelectAllLabel, onClick: toggleSelectAll, onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelectAll(e);
                }
            } }, this.selectAllLabel)));
    }
    renderNoResultsMessage() {
        return (h("div", { class: "ifx-multiselect-no-results" }, h("div", { class: "no-results-content" }, h("span", { class: "no-results-text" }, this.noResultsMessage))));
    }
    render() {
        const selectedOptionsLabels = this.persistentSelectedOptions
            .map((option) => option.label || option.value)
            .join(", ");
        const hasSelections = this.persistentSelectedOptions.length > 0;
        let isFlatMultiselect = false;
        const allOptionElements = this.el.querySelectorAll("ifx-multiselect-option");
        if (allOptionElements.length > 0) {
            isFlatMultiselect = Array.from(allOptionElements).every((option) => option.children.length === 0);
        }
        return (h("div", { key: '4e19eee53f458103cdc03851f7f0ba0db1b7ab24', class: `ifx-multiselect-container ${this.disabled && !this.error ? "disabled" : ""}`, ref: (el) => (this.dropdownElement = el) }, h("div", { key: '9f7bb71003ce3687e4a316203b42118cc7e640af', class: "ifx-label-wrapper" }, this.label && (h("span", { key: 'd215d4d4cb8c318f318988f6d1d7b1d420a57bc4', class: "wrapper-label" }, h("span", { key: '1c638aad8c1c6c5b579e7aefe55d8cf933b5b8cf' }, this.label), this.required && (h("span", { key: '741befc8bd52c952144963cb934a5137051d4278', class: `required ${this.error ? "error" : ""}` }, "*"))))), h("div", { key: 'fc7e0b1037fdb0d9960b49dcdf66e922981e2570', class: `ifx-multiselect-wrapper
        ${this.dropdownOpen ? "active" : ""}
        ${this.dropdownFlipped ? "is-flipped" : ""}
        ${this.internalError ? "error" : ""}
        ${this.disabled && !this.error ? "disabled" : ""}`, role: "combobox", "aria-label": this.ariaMultiSelectLabel, "aria-labelledby": this.ariaMultiSelectLabelledBy || undefined, "aria-describedby": this.ariaMultiSelectDescribedBy || undefined, "aria-expanded": this.dropdownOpen, "aria-haspopup": "listbox", "aria-disabled": this.disabled && !this.error, tabindex: "0", onClick: this.disabled && !this.error
                ? undefined
                : (event) => this.handleWrapperClick(event), onKeyDown: this.disabled && !this.error
                ? undefined
                : (event) => this.handleKeyDown(event) }, h("div", { key: '0201f2d814edd5d1419b40d9fcf46f0199f1478f', class: `ifx-multiselect-input
          ${hasSelections ? "" : "placeholder"}
          `, onClick: this.disabled && !this.error
                ? undefined
                : () => this.toggleDropdown() }, hasSelections ? selectedOptionsLabels : this.placeholder), this.dropdownOpen && (h("div", { key: '0cd349f15be478d2d45ee6c210449371e9c40972', class: "ifx-multiselect-dropdown-menu" }, (this.showSearch ||
            this.showSelectAll ||
            (this.showExpandCollapse && !isFlatMultiselect)) && (h("div", { key: '50ef9d298ebe178f2d3cbd5160eb150b8a3209ca', class: "ifx-multiselect-dropdown-functions", onClick: (e) => e.stopPropagation() }, this.showSearch && (h("div", { key: '0fd4dadbeeb4d62b2c106e9af8a0282c4ee0f919', class: "ifx-multiselect-dropdown-search" }, h("ifx-search-field", { key: 'e290f2f00763de3951b31d01d89ea01ea284892a', class: "search-input", placeholder: this.searchPlaceholder, size: "s", "show-delete-icon": "true", "aria-label": this.ariaSearchLabel, onKeyDown: (e) => {
                e.stopPropagation();
            }, onIfxInput: (event) => this.handleSearch(event.target), onFocus: () => this.handleSearchFocus(true), onBlur: () => this.handleSearchFocus(false) }))), h("div", { key: '19035f2c6c69d3c1347bd0f094e2a3fd2593fc63', class: "ifx-multiselect-dropdown-controls" }, this.showSelectAll && this.renderSelectAll(), this.showExpandCollapse && !isFlatMultiselect && (h("div", { key: 'fb8f66a2207dddd9854997bc7c357a2919d6f484', class: "expand-collapse-controls" }, h("span", { key: '7b37f0aa6bf1caa7b8ce013fd9b858aa36edcb60', class: "control-item", role: "button", tabIndex: 0, "aria-label": this.ariaExpandAllLabel, onClick: (e) => {
                e.stopPropagation();
                this.expandAll();
            }, onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.expandAll();
                }
            } }, this.expandLabel), h("span", { key: '61cbc3cfb9a9ea953a76756d3b408826df744065', class: "control-item", role: "button", tabIndex: 0, "aria-label": this.ariaCollapseAllLabel, onClick: (e) => {
                e.stopPropagation();
                this.collapseAll();
            }, onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.collapseAll();
                }
            } }, this.collapseLabel)))))), h("div", { key: '0eb3f2c438b647f1eeaf2e8eff736b71696cc764', class: "ifx-multiselect-options", role: "listbox", "aria-multiselectable": "true" }, h("slot", { key: '8712ddc2c75db4f869463adc40bd9036ba864141' }), this.searchTerm &&
            this.showNoResultsMessage &&
            this.renderNoResultsMessage()))), h("div", { key: 'eef9377329f7293b259bcd7209a7a5f027f121ed', class: "ifx-multiselect-icon-container" }, this.persistentSelectedOptions.length > 0 && (h("div", { key: '9563bb568c85172482d506ff8030b91f31562a14', class: `ifx-clear-button ${!this.showClearButton ? "hide" : ""}`, onClick: this.disabled && !this.error
                ? undefined
                : () => this.clearSelection() }, h("ifx-icon", { key: '60bb69c165607832c7c7370fd60dc4c6d1d28d25', icon: "cRemove16" }))), h("div", { key: 'a11767d740b34ffe49955f26f5d85c552ed959c7', class: "icon-wrapper-up", onClick: this.disabled && !this.error
                ? undefined
                : () => this.toggleDropdown() }, h("ifx-icon", { key: "icon-up", icon: "chevron-up-16" })), h("div", { key: 'f868228fa05e34ed9d6ed9817aeaa9ce65a946ce', class: "icon-wrapper-down", onClick: this.disabled && !this.error
                ? undefined
                : () => this.toggleDropdown() }, h("ifx-icon", { key: "icon-down", icon: "chevron-down-16" })))), this.caption && (h("div", { key: 'b0a0c736bf9b564d9008f3a017b8a72d3dbfb9d3', class: `multi__select-caption ${this.error ? "error" : ""} ${this.disabled && !this.error ? "disabled" : ""}` }, this.caption))));
    }
    static get watchers() { return {
        "error": [{
                "updateInternalError": 0
            }],
        "persistentSelectedOptions": [{
                "onSelectionChange": 0
            }]
    }; }
};
Multiselect.style = multiselectCss();

const multiselectOptionCss = () => `:host{display:block;width:100%}.option{display:flex;flex-direction:column;position:relative;cursor:pointer;list-style:none}.option.option--expanded{position:relative}.option.option--has-children{position:relative}.option.option--has-children .option-item>.chevron-wrapper{display:flex}.option--disabled{cursor:not-allowed;pointer-events:none;color:#BFBBBB}.option.search-hidden{display:none !important}.option.search-match .option-item .option-label .search-highlight{font-weight:bold}.option-item{display:flex;flex-direction:row;align-items:center;white-space:nowrap;min-height:20px;padding:4px 16px;background-color:#FFFFFF;transition:background-color 0.2s ease-in-out}.option-item:hover{background-color:#F7F7F7}.option--disabled .option-item:hover{background-color:transparent}.option-children{display:block}.chevron-wrapper{display:none;align-items:center;justify-content:center;margin-right:8px;width:20px;height:20px;flex-shrink:0}.chevron-wrapper:focus{outline:none}.chevron-wrapper:focus-visible{outline:2px solid #0A8276;outline-offset:2px;border-radius:1px}.option--has-children .chevron-wrapper{display:flex}.chevron-wrapper .chevron{transition:transform 0.2s ease-in-out;color:#3C3A39}.chevron-wrapper .chevron.chevron--expanded{transform:rotate(90deg)}.chevron-wrapper .chevron.chevron--collapsed{transform:rotate(0deg)}.checkbox-wrapper{display:flex;align-items:center;margin-right:8px;flex-shrink:0}.option-label{flex-grow:1;display:flex;align-items:center;cursor:pointer;padding:2px 0;font-size:0.875rem}.option-label:focus{outline:none}.option-label:focus-visible{outline:2px solid #0A8276;outline-offset:2px;border-radius:1px}.option--disabled .option-label{cursor:not-allowed;color:#BFBBBB}`;

const MultiselectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    value;
    selected = false;
    disabled = false;
    indeterminate = false;
    isExpanded = false;
    hasChildren = false;
    depth = 0;
    searchTerm = "";
    isSearchActive = false;
    isSearchDisabled = false;
    componentWillLoad() {
        this.hasChildren = this.el.children.length > 0;
        this.depth = this.calculateDepth();
        this.el.setAttribute("data-level", this.depth.toString());
        if (this.hasChildren) {
            const hasSelectedChildren = this.hasAnySelectedChildren();
            if (hasSelectedChildren) {
                this.isExpanded = true;
            }
        }
    }
    componentDidLoad() {
        this.el['__stencil_instance'] = this;
        this.notifyMultiselect();
        this.el.addEventListener('ifx-search-filter', this.handleSearchFilter);
    }
    disconnectedCallback() {
        this.el.removeEventListener("ifx-search-filter", this.handleSearchFilter);
    }
    handleSearchFilter = (event) => {
        const { searchTerm, isActive } = event.detail;
        this.searchTerm = searchTerm.toLowerCase();
        this.isSearchActive = isActive;
        requestAnimationFrame(() => {
            this.updateSearchClasses();
        });
    };
    updateSearchClasses() {
        const optionDiv = this.el.shadowRoot?.querySelector(".option");
        if (!optionDiv)
            return;
        if (!this.isSearchActive) {
            optionDiv.classList.remove("search-hidden", "search-parent", "search-match");
            this.removeHighlighting();
            this.isSearchDisabled = false;
            return;
        }
        const textContent = this.getTextContent().toLowerCase();
        const matchesSearch = textContent.includes(this.searchTerm);
        const hasMatchingParent = this.hasMatchingParent();
        requestAnimationFrame(() => {
            const hasMatchingChildren = this.hasMatchingChildren();
            optionDiv.classList.remove("search-hidden", "search-parent", "search-match");
            this.isSearchDisabled = false;
            if (matchesSearch && !this.hasChildren) {
                optionDiv.classList.add("search-match");
                this.highlightSearchTerm();
            }
            else if (matchesSearch && this.hasChildren) {
                optionDiv.classList.add("search-match");
                this.highlightSearchTerm();
                this.isExpanded = true;
            }
            else if (!matchesSearch && this.hasChildren && hasMatchingChildren) {
                optionDiv.classList.add("search-parent");
                this.removeHighlighting();
                this.isExpanded = true;
                this.isSearchDisabled = true;
            }
            else if (hasMatchingParent) {
                optionDiv.classList.add("search-match");
                this.removeHighlighting();
            }
            else {
                optionDiv.classList.add("search-hidden");
                this.removeHighlighting();
            }
        });
    }
    highlightSearchTerm() {
        if (!this.searchTerm)
            return;
        const labelElement = this.el.shadowRoot?.querySelector(".option-label");
        if (!labelElement)
            return;
        const slotElement = labelElement.querySelector("slot");
        if (!slotElement)
            return;
        this.removeHighlighting();
        const originalText = this.getTextContent();
        const searchTermLower = this.searchTerm.toLowerCase();
        const originalTextLower = originalText.toLowerCase();
        if (!originalTextLower.includes(searchTermLower))
            return;
        const searchIndex = originalTextLower.indexOf(searchTermLower);
        if (searchIndex === -1)
            return;
        const beforeMatch = originalText.substring(0, searchIndex);
        const matchText = originalText.substring(searchIndex, searchIndex + searchTermLower.length);
        const afterMatch = originalText.substring(searchIndex + searchTermLower.length);
        const highlightedContent = document.createElement("span");
        highlightedContent.className = "highlighted-text";
        if (beforeMatch) {
            highlightedContent.appendChild(document.createTextNode(beforeMatch));
        }
        const boldElement = document.createElement("strong");
        boldElement.className = "search-highlight";
        boldElement.textContent = matchText;
        highlightedContent.appendChild(boldElement);
        if (afterMatch) {
            highlightedContent.appendChild(document.createTextNode(afterMatch));
        }
        labelElement.setAttribute("data-original-content", "true");
        slotElement.style.display = "none";
        labelElement.appendChild(highlightedContent);
    }
    removeHighlighting() {
        const labelElement = this.el.shadowRoot?.querySelector(".option-label");
        if (!labelElement)
            return;
        const slotElement = labelElement.querySelector("slot");
        const highlightedElement = labelElement.querySelector(".highlighted-text");
        if (highlightedElement) {
            labelElement.removeChild(highlightedElement);
        }
        if (slotElement) {
            slotElement.style.display = "";
        }
        labelElement.removeAttribute("data-original-content");
    }
    getTextContent() {
        let text = "";
        Array.from(this.el.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent?.trim() || "";
            }
        });
        return text || this.value || "";
    }
    hasMatchingChildren() {
        if (!this.hasChildren)
            return false;
        const childOptions = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return childOptions.some((child) => {
            const childInstance = child["__stencil_instance"];
            if (!childInstance)
                return false;
            const childText = childInstance.getTextContent().toLowerCase();
            const childMatches = childText.includes(this.searchTerm);
            const grandChildrenMatch = childInstance.hasMatchingChildren();
            return childMatches || grandChildrenMatch;
        });
    }
    hasMatchingParent() {
        let parent = this.el.parentElement;
        while (parent && parent.tagName === "IFX-MULTISELECT-OPTION") {
            const parentInstance = parent["__stencil_instance"];
            if (parentInstance) {
                const parentText = parentInstance.getTextContent().toLowerCase();
                if (parentText.includes(this.searchTerm)) {
                    return true;
                }
            }
            parent = parent.parentElement;
        }
        return false;
    }
    calculateDepth() {
        let depth = 0;
        let parent = this.el.parentElement;
        while (parent && parent.tagName !== "IFX-MULTISELECT") {
            if (parent.tagName === "IFX-MULTISELECT-OPTION") {
                depth++;
            }
            parent = parent.parentElement;
        }
        return depth;
    }
    handleClick(event) {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        event.stopPropagation();
        if (event.type === "click" &&
            event.target.closest(".chevron-wrapper")) {
            this.toggleExpansion();
            return;
        }
        let newSelectedState;
        if (this.indeterminate) {
            newSelectedState = true;
        }
        else {
            newSelectedState = !this.selected;
        }
        this.selected = newSelectedState;
        this.indeterminate = false;
        if (this.hasChildren) {
            this.isExpanded = newSelectedState;
            requestAnimationFrame(() => {
                this.selectAllChildren(newSelectedState);
                this.expandAllChildren(newSelectedState);
            });
        }
        this.updateParentStates();
        this.notifyMultiselect();
    }
    handleKeyDown(event) {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        const target = event.target;
        if (target.closest(".chevron-wrapper") ||
            target.closest(".checkbox-wrapper")) {
            return;
        }
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
            event.stopPropagation();
        }
        if (event.key === "ArrowRight" && this.hasChildren) {
            this.isExpanded = true;
        }
        if (event.key === "ArrowLeft" && this.hasChildren) {
            this.isExpanded = false;
        }
    }
    notifyMultiselect() {
        const updateEvent = new CustomEvent("ifx-option-changed", {
            bubbles: true,
            detail: {
                value: this.value,
                selected: this.selected,
                indeterminate: this.indeterminate,
            },
        });
        this.el.dispatchEvent(updateEvent);
    }
    selectAllChildren(selected) {
        const directChildren = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        directChildren.forEach((child) => {
            const childInstance = child["__stencil_instance"];
            if (childInstance) {
                childInstance.selected = selected;
                childInstance.indeterminate = false;
                if (childInstance.hasChildren) {
                    childInstance.isExpanded = selected;
                    childInstance.selectAllChildren(selected);
                }
                childInstance.notifyMultiselect?.();
            }
        });
    }
    expandAllChildren(expanded) {
        const directChildren = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        directChildren.forEach((child) => {
            const childInstance = child["__stencil_instance"];
            if (childInstance && childInstance.hasChildren) {
                childInstance.isExpanded = expanded;
                childInstance.expandAllChildren(expanded);
            }
        });
    }
    updateParentStates() {
        let parent = this.el.parentElement;
        while (parent && parent.tagName === "IFX-MULTISELECT-OPTION") {
            const parentInstance = parent["__stencil_instance"];
            if (!parentInstance) {
                parent = parent.parentElement;
                continue;
            }
            const siblings = Array.from(parent.children)
                .filter((child) => child.tagName === "IFX-MULTISELECT-OPTION")
                .map((child) => child["__stencil_instance"])
                .filter((instance) => instance !== null);
            const selectedCount = siblings.filter((sibling) => sibling.selected).length;
            const indeterminateCount = siblings.filter((sibling) => sibling.indeterminate).length;
            const totalCount = siblings.length;
            if (selectedCount === totalCount && indeterminateCount === 0) {
                parentInstance.selected = true;
                parentInstance.indeterminate = false;
            }
            else if (selectedCount === 0 && indeterminateCount === 0) {
                parentInstance.selected = false;
                parentInstance.indeterminate = false;
            }
            else {
                parentInstance.selected = false;
                parentInstance.indeterminate = true;
            }
            parentInstance.notifyMultiselect?.();
            parent = parent.parentElement;
        }
    }
    toggleExpansion() {
        this.isExpanded = !this.isExpanded;
    }
    handleCheckboxClick = (event) => {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        event.stopPropagation();
        let newSelectedState;
        if (this.indeterminate) {
            newSelectedState = true;
        }
        else {
            newSelectedState = !this.selected;
        }
        this.selected = newSelectedState;
        this.indeterminate = false;
        if (this.hasChildren) {
            this.isExpanded = newSelectedState;
            requestAnimationFrame(() => {
                this.selectAllChildren(newSelectedState);
                this.expandAllChildren(newSelectedState);
            });
        }
        this.updateParentStates();
        this.notifyMultiselect();
    };
    handleHeaderClick = (event) => {
        event.stopPropagation();
        if (!this.disabled && !(this.isSearchActive && this.isSearchDisabled)) {
            this.handleClick(event);
        }
    };
    hasAnySelectedChildren() {
        const childOptions = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return childOptions.some((child) => {
            const hasSelected = child.hasAttribute("selected");
            const hasSelectedDescendants = this.checkForSelectedDescendants(child);
            return hasSelected || hasSelectedDescendants;
        });
    }
    checkForSelectedDescendants(element) {
        const nestedOptions = Array.from(element.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return nestedOptions.some((nestedChild) => {
            const isSelected = nestedChild.hasAttribute("selected");
            const hasSelectedNested = this.checkForSelectedDescendants(nestedChild);
            return isSelected || hasSelectedNested;
        });
    }
    render() {
        let isFlatMultiselect = false;
        const parentMultiselect = this.el.closest("ifx-multiselect");
        if (parentMultiselect) {
            const allOptions = Array.from(parentMultiselect.querySelectorAll("ifx-multiselect-option"));
            isFlatMultiselect = allOptions.every((option) => option.children.length === 0);
        }
        const basePadding = this.depth * 28 + 16;
        const additionalPadding = this.hasChildren ? 0 : 28;
        const totalPadding = basePadding + additionalPadding;
        const optionItemStyle = isFlatMultiselect
            ? undefined
            : { paddingLeft: `${totalPadding}px` };
        return (h(Host, { key: '02456f3eb7c3cb9a43bbed255d0c4f8f7773e637' }, h("div", { key: '4496cbfb613844d6643ad8796777b55d4ac06dbd', class: {
                option: true,
                "option--has-children": this.hasChildren,
                "option--expanded": this.isExpanded,
                "option--disabled": this.disabled,
                "option--selected": this.selected,
            }, role: "option", "aria-expanded": this.hasChildren ? (this.isExpanded ? "true" : "false") : undefined, "aria-selected": this.selected ? "true" : "false", "aria-disabled": this.disabled ? "true" : "false", "data-level": this.depth, "data-value": this.value }, h("div", { key: '355abb8b4e86fb26b5cf8a878e6c15a70d97b9ae', class: "option-item", style: optionItemStyle }, h("div", { key: 'f9623e8ee76f8cee3679b6aaecf130d988e20c9d', class: "chevron-wrapper", tabIndex: this.hasChildren ? 0 : -1, role: this.hasChildren ? "button" : undefined, "aria-label": this.hasChildren
                ? this.isExpanded
                    ? "Collapse"
                    : "Expand"
                : undefined, onClick: (e) => {
                e.stopPropagation();
                this.toggleExpansion();
            }, onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleExpansion();
                }
            } }, this.hasChildren && (h("ifx-icon", { key: 'd7bb92cbc69bd4ac5f2ce0062070f7b62cf0f0c0', class: `chevron ${this.isExpanded ? "chevron--expanded" : "chevron--collapsed"}`, icon: "chevron-right-16" }))), h("div", { key: 'b2abd3d5eb547cd544606b5885e6e93445d5c7ae', class: "checkbox-wrapper", onClick: (e) => e.stopPropagation() }, h("ifx-checkbox", { key: 'ea0c810dc4813cebdb993e413b9d9516e0c79618', size: "s", checked: this.isSearchActive && this.isSearchDisabled
                ? false
                : this.indeterminate
                    ? false
                    : this.selected, indeterminate: this.isSearchActive && this.isSearchDisabled
                ? false
                : this.indeterminate, onClick: this.handleCheckboxClick, disabled: this.disabled ||
                (this.isSearchActive && this.isSearchDisabled), onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleCheckboxClick(e);
                }
            } })), h("div", { key: '95d76f425080089e93fec232bc984b12dd7a1273', class: "option-label", onClick: this.handleHeaderClick, tabIndex: -1 }, h("slot", { key: 'd4b55c67d8f31bd8b6dfc4756c1eaa7367b183fd' }))), this.isExpanded && (h("div", { key: '4765b74ea8288daf72b6b0f0ce1ecf986f2a0a65', class: "option-children" }, h("slot", { key: '75ca13e8068d2f6d2642d44e2f9220a2431b1d41', name: "children" }))))));
    }
};
MultiselectOption.style = multiselectOptionCss();

export { Multiselect as ifx_multiselect, MultiselectOption as ifx_multiselect_option };
//# sourceMappingURL=ifx-multiselect.ifx-multiselect-option.entry.js.map

//# sourceMappingURL=ifx-multiselect_2.entry.js.map