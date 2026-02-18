import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../../../shared/utils/dom-utils";
import { detectFramework } from "../../../shared/utils/framework-detection";
import { trackComponent } from "../../../shared/utils/tracking";
let ChoicesJs;
import { filterObject, isDefined, isJSONParseable } from "./utils";
export class Choices {
    value;
    name;
    items;
    choices = undefined;
    renderChoiceLimit;
    maxItemCount;
    addItems;
    removeItems;
    removeItemButton;
    editItems;
    duplicateItemsAllowed;
    delimiter;
    paste;
    showSearch;
    searchChoices;
    searchFields;
    searchFloor;
    searchResultLimit;
    position;
    resetScrollPosition;
    shouldSort;
    shouldSortItems;
    sorter;
    placeholder;
    searchPlaceholderValue;
    prependValue;
    appendValue;
    renderSelectedChoices;
    loadingText;
    noResultsText;
    noChoicesText;
    itemSelectText;
    addItemText;
    maxItemText;
    uniqueItemText;
    classNames;
    fuseOptions;
    addItemFilter;
    customAddItemText;
    callbackOnInit;
    callbackOnCreateTemplates;
    valueComparer;
    //custom ifx props
    error = false;
    label = "";
    caption = "";
    disabled = false;
    required = false;
    placeholderValue = "Placeholder";
    ifxSelect;
    ifxInput;
    options;
    size = "medium (40px)";
    selectedOption = null;
    optionIsSelected = false;
    showClearButton = true;
    resizeObserver;
    previousOptions = [];
    root;
    choice;
    element;
    watchDisabled(newValue) {
        if (newValue && !this.error) {
            this.choice.disable();
        }
        else {
            this.choice.enable();
        }
    }
    async clearSelection() {
        if (!this.disabled) {
            this.clearInput();
            this.clearSelectField();
            this.setPreSelected(null);
            this.closeDropdown();
            this.optionIsSelected = false;
        }
    }
    clearSelectField() {
        this.selectedOption = null;
        this.ifxSelect.emit(null);
    }
    async handleChange() {
        this.ifxSelect.emit(this.choice.getValue());
        this.selectedOption = this.choice.getValue(); //store the selected option to reflect it in the template function
        this.setPreSelected(this.selectedOption.value); //set previously selected items from the input array to false and the new selection to true
        this.closeDropdown();
    }
    async highlightItem(item, runEvent) {
        this.choice.highlightItem(item, runEvent);
        return this;
    }
    async unhighlightItem(item) {
        this.choice.unhighlightItem(item);
        return this;
    }
    async highlightAll() {
        this.choice.highlightAll();
        return this;
    }
    async unhighlightAll() {
        this.choice.unhighlightAll();
        return this;
    }
    async removeActiveItemsByValue(value) {
        this.choice.removeActiveItemsByValue(value);
        return this;
    }
    async removeActiveItems(excludedId) {
        this.choice.removeActiveItems(excludedId);
        return this;
    }
    async removeHighlightedItems(runEvent) {
        this.choice.removeHighlightedItems(runEvent);
        return this;
    }
    async showDropdown(focusInput) {
        this.choice.showDropdown(focusInput);
        return this;
    }
    async hideDropdown(blurInput) {
        this.choice.hideDropdown(blurInput);
        return this;
    }
    async getValue(valueOnly) {
        return this.choice.getValue(valueOnly);
    }
    async setValue(args) {
        this.choice.setValue(args);
        return this;
    }
    async setChoiceByValue(value) {
        this.choice.setChoiceByValue(value);
        return this;
    }
    async setChoices(choices, value, label, replaceChoices) {
        let listOfChoices;
        if (typeof choices === "string") {
            try {
                if (!isJSONParseable(choices)) {
                    //meaning the input string comes from storybook as a non valid json string to be displayed in a beautified version on storybook
                    choices = choices
                        .replace(/'/g, '"')
                        .replace(/"false"/g, "false")
                        .replace(/"true"/g, "true");
                }
                listOfChoices = [...JSON.parse(choices)];
            }
            catch (err) {
                console.error("Failed to parse choices:", err);
            }
        }
        else if (Array.isArray(choices) || typeof choices === "object") {
            listOfChoices = [...choices];
        }
        else {
            console.error("Unexpected value for choices:", this.options);
        }
        this.choice.setChoices(listOfChoices, value, label, replaceChoices);
        return this;
    }
    async clearChoices() {
        this.choice.clearChoices();
        return this;
    }
    async clearStore() {
        this.choice.clearStore();
        return this;
    }
    async clearInput() {
        this.choice.clearInput();
        return this;
    }
    async ajax(fn) {
        this.choice.ajax(fn);
        return this;
    }
    async handleDeleteIcon() {
        const width = this.root.offsetWidth;
        const deleteIconWrapper = this.root.querySelector(".ifx-choices__icon-wrapper-delete");
        if (deleteIconWrapper) {
            if (width <= 180) {
                deleteIconWrapper.classList.add("hide");
            }
            else if (this.showClearButton) {
                deleteIconWrapper.classList.remove("hide");
            }
        }
    }
    async ensureChoicesLoaded() {
        if (typeof window === "undefined" || typeof document === "undefined") {
            return false;
        }
        if (!ChoicesJs) {
            const mod = await import("choices.js");
            ChoicesJs = mod.default ?? mod;
        }
        return true;
    }
    handleCloseButton() {
        if (typeof this.options === "string") {
            const optionsToArray = JSON.parse(this.options);
            const optionIsSelected = optionsToArray.find((option) => option.selected === true);
            if (optionIsSelected) {
                this.optionIsSelected = true;
            }
            else {
                this.optionIsSelected = false;
            }
        }
        else if (this.options && Array.isArray(this.options)) {
            const optionIsSelected = this.options.find((option) => option.selected === true);
            if (optionIsSelected) {
                this.optionIsSelected = true;
            }
            else {
                this.optionIsSelected = false;
            }
        }
    }
    componentWillLoad() {
        this.handleCloseButton();
    }
    componentWillUpdate() {
        this.handleCloseButton();
        this.previousOptions = [...this.options];
        const optionsAreEqual = this.isEqual(this.options, this.previousOptions);
        if (this.options && !optionsAreEqual) {
            this.clearSelectField();
        }
    }
    isEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    addResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => {
            this.handleDeleteIcon();
        });
        const componentWrapper = this.root.querySelector(".ifx-choices__wrapper");
        this.resizeObserver.observe(componentWrapper);
    }
    async componentDidLoad() {
        this.init();
        if (!isNestedInIfxComponent(this.root)) {
            const framework = detectFramework();
            trackComponent("ifx-select", await framework);
        }
        this.addEventListenersToHandleCustomFocusAndActiveState();
        this.handleDeleteIcon();
        this.addResizeObserver();
    }
    componentDidUpdate() {
        this.init();
        this.handleDeleteIcon();
    }
    disconnectedCallback() {
        this.destroy();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
    handleWrapperClick(event) {
        const target = event.target;
        const isSearchInput = target.classList.contains("choices__input") ||
            target.closest(".choices__input");
        const isDropdownItem = target.closest(".choices__list--dropdown .choices__item");
        // Only toggle dropdown if clicking on wrapper itself
        if (!isSearchInput && !isDropdownItem) {
            this.toggleDropdown();
        }
    }
    render() {
        const attributes = {
            "data-selector": "root",
            name: this.name || null,
            // 'remove-item-button': false,
        };
        const choicesWrapperClass = `ifx-choices__wrapper ${this.getSizeClass()}`;
        // destroy choices element to restore previous dom structure
        // so vdom can replace the element correctly
        this.destroy();
        return (h("div", { key: '638dfcaf41899baa0ed53f0dda48d357b952c27b', class: `ifx-select-container` }, this.label ? (h("div", { class: `ifx-label-wrapper ${this.disabled && !this.error ? "disabled" : ""}` }, h("span", null, this.label), this.required && (h("span", { class: `required ${this.error ? "error" : ""}` }, "*")))) : null, h("div", { key: 'b43346c28de73ffa896ced9a8abe719634f05842', class: `${choicesWrapperClass} 
            ${this.disabled && !this.error ? "disabled" : ""} 
            ${this.error ? "error" : ""}`, onClick: this.disabled && !this.error
                ? undefined
                : (e) => this.handleWrapperClick(e), onKeyDown: (event) => this.handleKeyDown(event) }, h("select", { key: '7728220fee5427a4f274ae515ee5d4d013c17ee0', class: "single__select-input-field", disabled: this.disabled && !this.error, ...attributes, "data-trigger": true, onChange: () => this.handleChange() }, this.createSelectOptions(this.options)), h("div", { key: '18620d6acda74d1198af99fde8ec9f1ee008a6e0', class: "single__select-icon-container" }, this.optionIsSelected && (h("div", { key: '2324b8b93869abf30810cbdf895fcde72cdeaed5', class: `ifx-choices__icon-wrapper-delete ${!this.showClearButton ? "hide" : ""}` }, h("ifx-icon", { key: 'd2fd649bf5c5bfb5119b62ebb4f8381cc9d93a9c', icon: "cRemove16", onClick: () => this.clearSelection() }))), h("div", { key: 'fc6eda5deb1d0dfe90d6709343c779e11e81cc2e', class: "ifx-choices__icon-wrapper-up" }, h("ifx-icon", { key: "icon-up", icon: "chevron-up-16" })), h("div", { key: 'cc5da0218a42ea4b38052471fb4855df769b1d02', class: "ifx-choices__icon-wrapper-down" }, h("ifx-icon", { key: "icon-down", icon: "chevron-down-16" })))), this.caption && (h("div", { key: '415ae6ea5af635055c30a17a8b812be84ce359b4', class: `single__select-caption ${this.error ? "error" : ""} ${this.disabled && !this.error ? "disabled" : ""}` }, this.caption))));
    }
    toggleDropdown() {
        const div = this.root.querySelector(".ifx-choices__wrapper");
        if (div.classList.contains("active") || this.choice.dropdown.isActive) {
            this.closeDropdown();
        }
        else {
            this.choice.showDropdown();
            div.classList.add("active");
        }
        const choicesElement = this.root.querySelector(".choices");
        choicesElement.classList.add("is-focused"); // Add the 'is-focused' class, cause a click on the wrapper (and not the embedded select element) doesnt add this automatically to the choices instance
    }
    closeDropdown() {
        this.hideDropdown();
        const wrapper = this.root.querySelector(".ifx-choices__wrapper");
        wrapper.focus();
        wrapper.classList.remove("active");
    }
    handleOutsideClick(event) {
        const path = event.composedPath();
        const ifxChoicesContainer = this.root.querySelector(".ifx-choices__wrapper");
        if (!path.includes(this.root)) {
            ifxChoicesContainer.classList.remove("active");
        }
    }
    handleKeyDown(event) {
        if (this.disabled) {
            return;
        }
        const isSearchInput = event.target.classList.contains("choices__input");
        const isClearButton = event.target.classList.contains("ifx-choices__icon-wrapper-delete");
        switch (event.code) {
            case "Enter": {
                if (isClearButton) {
                    this.clearSelection();
                }
                else {
                    this.toggleDropdown();
                }
                break;
            }
            case "Space": {
                if (!isSearchInput) {
                    this.toggleDropdown();
                }
                break;
            }
            case "Tab": {
                if (isSearchInput) {
                    event.preventDefault();
                    this.closeDropdown();
                }
                break;
            }
        }
    }
    getSizeClass() {
        return `${this.size}` === "s" ? "small-select" : "medium-select";
    }
    async init() {
        const ok = await this.ensureChoicesLoaded();
        if (!ok)
            return;
        const props = {
            allowHTML: true,
            items: this.items,
            choices: this.choices,
            renderChoiceLimit: this.renderChoiceLimit,
            maxItemCount: this.maxItemCount,
            addItems: this.addItems,
            removeItems: this.removeItems,
            removeItemButton: this.removeItemButton,
            editItems: this.editItems,
            duplicateItemsAllowed: this.duplicateItemsAllowed,
            delimiter: this.delimiter,
            paste: this.paste,
            searchEnabled: this.showSearch,
            searchChoices: this.searchChoices,
            searchFields: this.searchFields,
            searchFloor: this.searchFloor,
            searchResultLimit: this.searchResultLimit,
            position: this.position,
            resetScrollPosition: this.resetScrollPosition,
            shouldSort: false, // choices/groups will appear in the order they were given.
            shouldSortItems: this.shouldSortItems,
            sorter: this.sorter,
            placeholder: this.placeholder,
            searchPlaceholderValue: this.searchPlaceholderValue,
            prependValue: this.prependValue,
            appendValue: this.appendValue,
            renderSelectedChoices: this.renderSelectedChoices,
            loadingText: this.loadingText,
            noResultsText: this.noResultsText,
            noChoicesText: this.noChoicesText,
            itemSelectText: this.itemSelectText,
            addItemText: this.addItemText,
            maxItemText: this.maxItemText,
            uniqueItemText: this.uniqueItemText,
            classNames: this.classNames,
            fuseOptions: this.fuseOptions,
            callbackOnInit: this.callbackOnInit,
            callbackOnCreateTemplates: this.callbackOnCreateTemplates,
            valueComparer: this.valueComparer,
            addItemFilter: this.addItemFilter,
            customAddItemText: this.customAddItemText,
        };
        const settings = filterObject(props, isDefined);
        //type check
        const element = this.root.querySelector('[data-selector="root"]');
        if (element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement) {
            // this.choice = new ChoicesJs(element, settings); //standard, without using custom templates
            const self = this; // save the context of this in a variable outside of the function to access it in the following
            this.choice = new ChoicesJs(element, Object.assign({}, settings, {
                callbackOnCreateTemplates: function (template) {
                    return {
                        //modifying the selected item template
                        item: ({ classNames }, data) => {
                            const removeButtonHTML = "";
                            if (data.placeholder && !self.selectedOption?.value) {
                                // For placeholders, use data-id="placeholder"
                                return template(`
                  <div class="choices__placeholder" data-item data-id="${data.id}" data-value="${data.value}" ${data.disabled && !this.error ? 'aria-disabled="true"' : ""}>
                    ${data.label === undefined ? this.placeholderValue : data.label}
                    ${removeButtonHTML}
                  </div>
                `);
                            }
                            else {
                                // For non-placeholder items, use the actual data ID
                                return template(`
                <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}" 
                      data-item 
                      data-id="${self.selectedOption?.id !== undefined ? self.selectedOption?.id : self.choice.getValue().id}" 
                      data-value="${self.selectedOption?.value !== undefined ? self.selectedOption?.value : self.choice.getValue().value}" 
                      ${data.disabled && !this.error ? 'aria-disabled="true"' : ""}>
                  <span>${self.selectedOption?.label !== undefined ? self.selectedOption?.label : self.choice.getValue().label}</span>
                  <!-- Add your remove button here if needed -->
                </div>
              `);
                            }
                        },
                        input: ({ classNames }) => {
                            return template(`
                  <input 
                    type="search"
                    class="${classNames.input} ${classNames.inputCloned} ${self.getSizeClass()}"
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="false"
                    role="textbox"
                    aria-autocomplete="list"
                    aria-label="${this.showSearch ? this.searchPlaceholderValue : ""}">`);
                        },
                        //modifying the template of each item in the options list
                        choice: ({ classNames }, data) => {
                            return template(`
              <div class="${classNames.item} ${classNames.itemChoice} ${self.getSizeClass()} 
              ${data.selected || self.selectedOption?.value === data.value || self.getPreSelected(self)?.value === data.value ? "selected" : ""} 
              ${data.placeholder ? classNames.placeholder : ""} 
              ${data.disabled && !this.error ? classNames.itemDisabled : classNames.itemSelectable} 
                    role="${data.groupId && data.groupId > 0 ? "treeitem" : "option"}"
                    data-choice ${data.disabled && !this.error ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"}                     data-id="${data.id}"
                    data-value="${data.value}"
                    data-select-text="${this.config.itemSelectText}">
                <span>${data.label}</span>
                ${data.selected || self.selectedOption?.value === data.value || self.getPreSelected(self)?.value === data.value ? '<ifx-icon icon="check16"></ifx-icon>' : ""}
              </div>
            `);
                        },
                    };
                },
            }));
            //set select options
            this.setChoices(this.options, "value", "label", true);
            //set custom event listener to listen for search input
            self.addSearchEventListener(self, this.choice);
        }
        else {
            // handle the case when the element is neither an HTMLInputElement nor an HTMLSelectElement
        }
    }
    addEventListenersToHandleCustomFocusAndActiveState() {
        const div = this.root.querySelector(".ifx-choices__wrapper");
        if (!div) {
            console.error(".ifx-choices__wrapper not found");
            return;
        }
        div.tabIndex = 0;
        div.addEventListener("focus", function () {
            if (!this.classList.contains("disabled")) {
                this.classList.add("focus");
            }
        });
        div.addEventListener("blur", function () {
            this.classList.remove("focus");
        });
    }
    addSearchEventListener(self, choiceElement) {
        choiceElement.passedElement.element.addEventListener("search", (event) => {
            self.ifxInput.emit(event.detail.value);
        }, false);
        return choiceElement;
    }
    destroy() {
        if (this.element) {
            this.element = null;
        }
        if (this.choice) {
            this.choice.destroy();
            this.choice = null;
        }
    }
    //get selected values from input array
    getPreSelected(self) {
        const optionsArray = Array.isArray(self.options)
            ? self.options
            : JSON.parse(self.options);
        return optionsArray.find((option) => option.selected === true) || null;
    }
    //set previously marked as selected items in the input array to unselected and select new ones
    setPreSelected(newValue) {
        const optionsArray = Array.isArray(this.options)
            ? this.options
            : JSON.parse(this.options);
        this.options = optionsArray.map((obj) => {
            return {
                ...obj,
                selected: obj.value === newValue,
            };
        });
    }
    //setting the value that gets displayed in the select at component start (either the value prop or a placeholder)
    createSelectOptions(ifxOptions) {
        if (this.value !== "undefined" || this.selectedOption?.value !== "") {
            let options;
            if (isJSONParseable(ifxOptions)) {
                options = [...JSON.parse(ifxOptions)];
            }
            else if (Array.isArray(ifxOptions) || typeof ifxOptions === "object") {
                options = [...ifxOptions];
            }
            const optionValueBasedOnAvailableOptions = options?.find((option) => option.value === this.value || this.selectedOption?.value);
            if (optionValueBasedOnAvailableOptions) {
                return [
                    h("option", { value: optionValueBasedOnAvailableOptions.value }, optionValueBasedOnAvailableOptions.label),
                ];
            }
        }
        // Assign a unique id for the placeholder
        return this.placeholder !== "false"
            ? [h("option", { value: "" }, this.placeholderValue)]
            : [h("option", { value: "" })];
    }
    static get is() { return "ifx-select"; }
    static get originalStyleUrls() {
        return {
            "$": ["select.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["select.css"]
        };
    }
    static get properties() {
        return {
            "value": {
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
                "attribute": "value"
            },
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
            "items": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<any>",
                    "resolved": "any[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "choices": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Array<any> | string",
                    "resolved": "any[] | string",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
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
                "attribute": "choices",
                "defaultValue": "undefined"
            },
            "renderChoiceLimit": {
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
                "attribute": "render-choice-limit"
            },
            "maxItemCount": {
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
                "attribute": "max-item-count"
            },
            "addItems": {
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
                "attribute": "add-items"
            },
            "removeItems": {
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
                "attribute": "remove-items"
            },
            "removeItemButton": {
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
                "attribute": "remove-item-button"
            },
            "editItems": {
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
                "attribute": "edit-items"
            },
            "duplicateItemsAllowed": {
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
                "attribute": "duplicate-items-allowed"
            },
            "delimiter": {
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
                "attribute": "delimiter"
            },
            "paste": {
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
                "attribute": "paste"
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
                "attribute": "show-search"
            },
            "searchChoices": {
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
                "attribute": "search-choices"
            },
            "searchFields": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Array<string> | string",
                    "resolved": "string | string[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    }
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
                "attribute": "search-fields"
            },
            "searchFloor": {
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
                "attribute": "search-floor"
            },
            "searchResultLimit": {
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
                "attribute": "search-result-limit"
            },
            "position": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"auto\" | \"top\" | \"bottom\"",
                    "resolved": "\"auto\" | \"bottom\" | \"top\"",
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
            },
            "resetScrollPosition": {
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
                "attribute": "reset-scroll-position"
            },
            "shouldSort": {
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
                "attribute": "should-sort"
            },
            "shouldSortItems": {
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
                "attribute": "should-sort-items"
            },
            "sorter": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "SortFn",
                    "resolved": "(el1: any, el2: any) => number",
                    "references": {
                        "SortFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::SortFn",
                            "referenceLocation": "SortFn"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "placeholder": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "boolean | string",
                    "resolved": "boolean | string",
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
            "searchPlaceholderValue": {
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
                "attribute": "search-placeholder-value"
            },
            "prependValue": {
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
                "attribute": "prepend-value"
            },
            "appendValue": {
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
                "attribute": "append-value"
            },
            "renderSelectedChoices": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"always\" | \"auto\"",
                    "resolved": "\"always\" | \"auto\"",
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
                "attribute": "render-selected-choices"
            },
            "loadingText": {
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
                "attribute": "loading-text"
            },
            "noResultsText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | NoResultsTextFn",
                    "resolved": "(() => string) | string",
                    "references": {
                        "NoResultsTextFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::NoResultsTextFn",
                            "referenceLocation": "NoResultsTextFn"
                        }
                    }
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
                "attribute": "no-results-text"
            },
            "noChoicesText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | NoChoicesTextFn",
                    "resolved": "(() => string) | string",
                    "references": {
                        "NoChoicesTextFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::NoChoicesTextFn",
                            "referenceLocation": "NoChoicesTextFn"
                        }
                    }
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
                "attribute": "no-choices-text"
            },
            "itemSelectText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"\"",
                    "resolved": "\"\"",
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
                "attribute": "item-select-text"
            },
            "addItemText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | AddItemTextFn",
                    "resolved": "((value: string) => string) | string",
                    "references": {
                        "AddItemTextFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::AddItemTextFn",
                            "referenceLocation": "AddItemTextFn"
                        }
                    }
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
                "attribute": "add-item-text"
            },
            "maxItemText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | MaxItemTextFn",
                    "resolved": "((maxItemCount: number) => string) | string",
                    "references": {
                        "MaxItemTextFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::MaxItemTextFn",
                            "referenceLocation": "MaxItemTextFn"
                        }
                    }
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
                "attribute": "max-item-text"
            },
            "uniqueItemText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "UniqueItemText",
                    "resolved": "((value: string) => string) | string",
                    "references": {
                        "UniqueItemText": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::UniqueItemText",
                            "referenceLocation": "UniqueItemText"
                        }
                    }
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
                "attribute": "unique-item-text"
            },
            "classNames": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ClassNames",
                    "resolved": "{ containerOuter?: string; containerInner?: string; input?: string; inputCloned?: string; list?: string; listItems?: string; listSingle?: string; listDropdown?: string; item?: string; itemSelectable?: string; itemDisabled?: string; itemChoice?: string; placeholder?: string; group?: string; groupHeading?: string; button?: string; activeState?: string; focusState?: string; openState?: string; disabledState?: string; highlightedState?: string; selectedState: string; flippedState?: string; loadingState?: string; noResults?: string; noChoices?: string; }",
                    "references": {
                        "ClassNames": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::ClassNames",
                            "referenceLocation": "ClassNames"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "fuseOptions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "FuseOptions",
                    "resolved": "{ id?: string; caseSensitive?: boolean; includeMatches?: boolean; includeScore?: boolean; shouldSort?: boolean; keys?: string[] | object[] | WeightedField[]; verbose?: boolean; tokenize?: boolean; tokenSeparator?: RegExp; matchAllTokens?: boolean; location?: number; distance?: number; threshold?: number; maxPatternLength?: number; minMatchCharLength?: number; findAllMatches?: boolean; sortFn?(a: { score: number; }, b: { score: number; }): number; getFn?(obj: any, path: string): any; }",
                    "references": {
                        "FuseOptions": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::FuseOptions",
                            "referenceLocation": "FuseOptions"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "addItemFilter": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | RegExp | ItemFilterFn",
                    "resolved": "((value: string) => boolean) | RegExp | string",
                    "references": {
                        "RegExp": {
                            "location": "global",
                            "id": "global::RegExp"
                        },
                        "ItemFilterFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::ItemFilterFn",
                            "referenceLocation": "ItemFilterFn"
                        }
                    }
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
                "attribute": "add-item-filter"
            },
            "customAddItemText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "CustomAddItemText",
                    "resolved": "((value: string) => string) | string",
                    "references": {
                        "CustomAddItemText": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::CustomAddItemText",
                            "referenceLocation": "CustomAddItemText"
                        }
                    }
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
                "attribute": "custom-add-item-text"
            },
            "callbackOnInit": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "OnInit",
                    "resolved": "() => void",
                    "references": {
                        "OnInit": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::OnInit",
                            "referenceLocation": "OnInit"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "callbackOnCreateTemplates": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "OnCreateTemplates",
                    "resolved": "(template: any) => any",
                    "references": {
                        "OnCreateTemplates": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::OnCreateTemplates",
                            "referenceLocation": "OnCreateTemplates"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
            },
            "valueComparer": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ValueCompareFunction",
                    "resolved": "(value1: string, value2: string) => boolean",
                    "references": {
                        "ValueCompareFunction": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::ValueCompareFunction",
                            "referenceLocation": "ValueCompareFunction"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false
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
            "placeholderValue": {
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
                "attribute": "placeholder-value",
                "defaultValue": "\"Placeholder\""
            },
            "options": {
                "type": "string",
                "mutable": true,
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
            },
            "size": {
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
                "attribute": "size",
                "defaultValue": "\"medium (40px)\""
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
            }
        };
    }
    static get states() {
        return {
            "selectedOption": {},
            "optionIsSelected": {}
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
                    "original": "CustomEvent",
                    "resolved": "CustomEvent<any>",
                    "references": {
                        "CustomEvent": {
                            "location": "global",
                            "id": "global::CustomEvent"
                        }
                    }
                }
            }, {
                "method": "ifxInput",
                "name": "ifxInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "CustomEvent",
                    "resolved": "CustomEvent<any>",
                    "references": {
                        "CustomEvent": {
                            "location": "global",
                            "id": "global::CustomEvent"
                        }
                    }
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
            },
            "handleChange": {
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
            },
            "highlightItem": {
                "complexType": {
                    "signature": "(item: HTMLElement, runEvent?: boolean) => Promise<this>",
                    "parameters": [{
                            "name": "item",
                            "type": "HTMLElement",
                            "docs": ""
                        }, {
                            "name": "runEvent",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "unhighlightItem": {
                "complexType": {
                    "signature": "(item: HTMLElement) => Promise<this>",
                    "parameters": [{
                            "name": "item",
                            "type": "HTMLElement",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "highlightAll": {
                "complexType": {
                    "signature": "() => Promise<this>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "unhighlightAll": {
                "complexType": {
                    "signature": "() => Promise<this>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "removeActiveItemsByValue": {
                "complexType": {
                    "signature": "(value: string) => Promise<this>",
                    "parameters": [{
                            "name": "value",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "removeActiveItems": {
                "complexType": {
                    "signature": "(excludedId?: number) => Promise<this>",
                    "parameters": [{
                            "name": "excludedId",
                            "type": "number",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "removeHighlightedItems": {
                "complexType": {
                    "signature": "(runEvent?: boolean) => Promise<this>",
                    "parameters": [{
                            "name": "runEvent",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "showDropdown": {
                "complexType": {
                    "signature": "(focusInput?: boolean) => Promise<this>",
                    "parameters": [{
                            "name": "focusInput",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "hideDropdown": {
                "complexType": {
                    "signature": "(blurInput?: boolean) => Promise<this>",
                    "parameters": [{
                            "name": "blurInput",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "getValue": {
                "complexType": {
                    "signature": "(valueOnly?: boolean) => Promise<string | Array<string>>",
                    "parameters": [{
                            "name": "valueOnly",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    },
                    "return": "Promise<string | string[]>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "setValue": {
                "complexType": {
                    "signature": "(args: Array<any>) => Promise<this>",
                    "parameters": [{
                            "name": "args",
                            "type": "any[]",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "setChoiceByValue": {
                "complexType": {
                    "signature": "(value: string | Array<string>) => Promise<this>",
                    "parameters": [{
                            "name": "value",
                            "type": "string | string[]",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "setChoices": {
                "complexType": {
                    "signature": "(choices: any[] | string, value: string, label: string, replaceChoices?: boolean) => Promise<this>",
                    "parameters": [{
                            "name": "choices",
                            "type": "string | any[]",
                            "docs": ""
                        }, {
                            "name": "value",
                            "type": "string",
                            "docs": ""
                        }, {
                            "name": "label",
                            "type": "string",
                            "docs": ""
                        }, {
                            "name": "replaceChoices",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "clearChoices": {
                "complexType": {
                    "signature": "() => Promise<this>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "clearStore": {
                "complexType": {
                    "signature": "() => Promise<this>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "clearInput": {
                "complexType": {
                    "signature": "() => Promise<this>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "ajax": {
                "complexType": {
                    "signature": "(fn: AjaxFn) => Promise<this>",
                    "parameters": [{
                            "name": "fn",
                            "type": "(callback: any) => void",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "AjaxFn": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/select/single-select/interfaces.tsx::AjaxFn",
                            "referenceLocation": "AjaxFn"
                        }
                    },
                    "return": "Promise<this>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "handleDeleteIcon": {
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
    static get elementRef() { return "root"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "watchDisabled"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "handleOutsideClick",
                "target": "document",
                "capture": false,
                "passive": true
            }];
    }
}
//# sourceMappingURL=select.js.map
