import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../../../shared/utils/dom-utils";
import { detectFramework } from "../../../shared/utils/framework-detection";
import { trackComponent } from "../../../shared/utils/tracking";
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
export class Multiselect {
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
    el;
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
    static get is() { return "ifx-multiselect"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["multiselect.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["multiselect.css"]
        };
    }
    static get properties() {
        return {
            "name": {
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
                "attribute": "name"
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
            "required": {
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
                "attribute": "required",
                "defaultValue": "false"
            },
            "error": {
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
                "attribute": "error",
                "defaultValue": "false"
            },
            "caption": {
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
                "attribute": "caption",
                "defaultValue": "\"\""
            },
            "label": {
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
                "attribute": "label",
                "defaultValue": "\"\""
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
                "attribute": "placeholder",
                "defaultValue": "\"\""
            },
            "showSearch": {
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
                "attribute": "show-search",
                "defaultValue": "true"
            },
            "showSelectAll": {
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
                "attribute": "show-select-all",
                "defaultValue": "true"
            },
            "showClearButton": {
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
                "attribute": "show-clear-button",
                "defaultValue": "true"
            },
            "showExpandCollapse": {
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
                "attribute": "show-expand-collapse",
                "defaultValue": "true"
            },
            "noResultsMessage": {
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
                "attribute": "no-results-message",
                "defaultValue": "\"No results found.\""
            },
            "showNoResultsMessage": {
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
                "attribute": "show-no-results-message",
                "defaultValue": "true"
            },
            "searchPlaceholder": {
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
                "attribute": "search-placeholder",
                "defaultValue": "\"Search\""
            },
            "selectAllLabel": {
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
                "attribute": "select-all-label",
                "defaultValue": "\"Select all\""
            },
            "expandLabel": {
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
                "attribute": "expand-label",
                "defaultValue": "\"Expand\""
            },
            "collapseLabel": {
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
                "attribute": "collapse-label",
                "defaultValue": "\"Collapse\""
            },
            "ariaMultiSelectLabel": {
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
                "attribute": "aria-multi-select-label",
                "defaultValue": "\"Multi-select dropdown\""
            },
            "ariaMultiSelectLabelledBy": {
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
                "attribute": "aria-multi-select-labelled-by",
                "defaultValue": "\"\""
            },
            "ariaMultiSelectDescribedBy": {
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
                "attribute": "aria-multi-select-described-by",
                "defaultValue": "\"\""
            },
            "ariaSearchLabel": {
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
                "attribute": "aria-search-label",
                "defaultValue": "\"Search options\""
            },
            "ariaClearLabel": {
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
                "attribute": "aria-clear-label",
                "defaultValue": "\"Clear all selections\""
            },
            "ariaToggleLabel": {
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
                "attribute": "aria-toggle-label",
                "defaultValue": "\"Toggle dropdown\""
            },
            "ariaSelectAllLabel": {
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
                "attribute": "aria-select-all-label",
                "defaultValue": "\"Select all options\""
            },
            "ariaExpandAllLabel": {
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
                "attribute": "aria-expand-all-label",
                "defaultValue": "\"Expand all categories\""
            },
            "ariaCollapseAllLabel": {
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
                "attribute": "aria-collapse-all-label",
                "defaultValue": "\"Collapse all categories\""
            }
        };
    }
    static get states() {
        return {
            "internalError": {},
            "persistentSelectedOptions": {},
            "dropdownOpen": {},
            "dropdownFlipped": {},
            "searchTerm": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxSelect",
                "name": "ifxSelect",
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
            }, {
                "method": "ifxOpen",
                "name": "ifxOpen",
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
    static get methods() {
        return {
            "clearSelection": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "error",
                "methodName": "updateInternalError"
            }, {
                "propName": "persistentSelectedOptions",
                "methodName": "onSelectionChange"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=multiselect.js.map
