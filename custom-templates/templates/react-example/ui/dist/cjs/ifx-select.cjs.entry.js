'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

/**
 * Filter out entries from an object.
 *
 * @param obj - object to filter.
 * @param fn - filter function.
 * @returns a new object without the entries satisfying the filter function.
 */
function filterObject(obj, fn) {
    return Object.keys(obj).reduce((accum, property) => {
        const value = obj[property];
        if (fn(value, property, obj)) {
            accum[property] = value;
        }
        return accum;
    }, {});
}
/**
 * Check if given parameter is not undefined.
 *
 * @param value - value to check.
 * @returns whether the value is defined.
 */
function isDefined(value) {
    return typeof value !== "undefined";
}
/**
 * Determines whether a string is valid JSON and can be parsed.
 *
 * @param str - The input string.
 * @returns - Whether the string can be parsed.
 */
function isJSONParseable(str) {
    try {
        JSON.parse(str);
        return true;
    }
    catch (e) {
        return false;
    }
}

const selectCss = () => `.ifx-select-container{box-sizing:border-box;font-family:var(--ifx-font-family)}.ifx-select-container.small-select{height:36px}.ifx-select-container.medium-select{height:40px}.ifx-select-container:hover{cursor:pointer}.ifx-select-container .ifx-label-wrapper{font-size:1rem;line-height:1.5rem;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;max-width:100%;overflow:hidden}.ifx-select-container .ifx-label-wrapper.disabled{color:#BFBBBB}.ifx-select-container .ifx-label-wrapper .required{margin-left:4px}.ifx-select-container .ifx-label-wrapper .required.error{color:#CD002F}.ifx-select-container .single__select-caption{font-style:normal;font-weight:400;font-size:0.75rem;line-height:1rem;color:#1D1D1D;flex:none;order:1;align-self:stretch;flex-grow:0}.ifx-select-container .single__select-caption.error{color:#CD002F}.ifx-select-container .single__select-caption.disabled{color:#BFBBBB}.ifx-select-container .ifx-choices__wrapper{background-color:#FFFFFF;box-sizing:border-box;position:relative;display:flex;align-items:center;border:1px solid #8D8786;border-radius:1px;font-weight:400;font-style:normal;width:100%}.ifx-select-container .ifx-choices__wrapper .choices{flex-grow:1;overflow:hidden}.ifx-select-container .ifx-choices__wrapper .single__select-icon-container{display:flex;align-items:center;margin-left:auto}.ifx-select-container .ifx-choices__wrapper.small-select{height:36px;line-height:20px;padding:8px 12px;font-size:0.875rem;line-height:1.25rem}.ifx-select-container .ifx-choices__wrapper.medium-select{height:40px;line-height:24px;padding:8px 16px;font-size:1rem;line-height:1.5rem}.ifx-select-container .ifx-choices__wrapper.disabled{background:#BFBBBB;color:#FFFFFF;border-color:#BFBBBB;cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ifx-select-container .ifx-choices__wrapper.disabled .choices .choices__inner .choices__list .choices__item{color:#FFFFFF}.ifx-select-container .ifx-choices__wrapper.disabled .ifx-choices__icon-wrapper-down{color:#FFFFFF}.ifx-select-container .ifx-choices__wrapper.disabled .ifx-choices__icon-wrapper-down:hover{cursor:default}.ifx-select-container .ifx-choices__wrapper.error{border-color:#CD002F}.ifx-select-container .ifx-choices__wrapper:not(.disabled):hover:not(.focus,:focus){border-color:#575352}.ifx-select-container .ifx-choices__wrapper.active{border-color:#0A8276 !important}.ifx-select-container .ifx-choices__wrapper.active .ifx-choices__icon-wrapper-up{display:flex;align-items:center;justify-content:center;padding-left:8px}.ifx-select-container .ifx-choices__wrapper.active .ifx-choices__icon-wrapper-down{display:none}.ifx-select-container .ifx-choices__wrapper:focus-visible:not(.active):not(:active){outline:none}.ifx-select-container .ifx-choices__wrapper:focus-visible:not(.active):not(:active)::before{content:"";position:absolute;width:calc(100% + 4px);height:calc(100% + 4px);top:50%;left:50%;transform:translate(-50%, -50%);border:2px solid #0A8276;border-radius:2px}.ifx-select-container .ifx-choices__wrapper:focus:not(.active,:active):not(.disabled)::before{content:"";position:absolute;width:calc(100% + 4px);height:calc(100% + 4px);top:50%;left:50%;transform:translate(-50%, -50%)}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-up{display:none}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-up:hover{cursor:pointer}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-down{display:flex;align-items:center;justify-content:center;padding-left:8px}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-down:hover{cursor:pointer}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-delete{display:flex;align-items:center;justify-content:center}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-delete.hide{display:none}.ifx-select-container .ifx-choices__wrapper .ifx-choices__icon-wrapper-delete:focus{outline:none;border:2px solid #08665C;border-radius:50%;box-sizing:border-box}.ifx-select-container{}.ifx-select-container .choices{width:100%}.ifx-select-container .choices:focus{outline:none}.choices .ifx-select-container.is-focused{outline:none}.ifx-select-container .choices:last-child{margin-bottom:0}.ifx-select-container .choices.is-disabled .choices__inner,.ifx-select-container .choices.is-disabled .choices__input{cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none}.ifx-select-container .choices.is-disabled .choices__item{cursor:default;color:#BFBBBB}.ifx-select-container .choices [hidden]{display:none !important}.ifx-select-container .choices[data-type*=select-one]{cursor:pointer}.ifx-select-container .choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:8px 16px;border-bottom:1px solid #8D8786;background-color:#FFFFFF;margin:0;font-style:normal;font-weight:400}.ifx-select-container .choices[data-type*=select-one] .choices__input.small-select{font-size:0.875rem;line-height:1.25rem}.ifx-select-container .choices[data-type*=select-one] .choices__input.medium-select{font-size:1rem;line-height:1.5rem}.ifx-select-container .choices[data-type*=select-one] .choices__single-button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:0.5}.ifx-select-container .choices[data-type*=select-one] .choices__single-button:hover,.ifx-select-container .choices[data-type*=select-one] .choices__single-button:focus{opacity:1}.ifx-select-container .choices[data-type*=select-one] .choices__single-button:focus{box-shadow:0px 0px 0px 2px #0A8276}.ifx-select-container .choices[data-type*=select-one] .choices__item[data-value=""] .choices__single-button{display:none}.ifx-select-container .choices[data-type*=select-one].is-open:after{margin-top:-7.5px}.ifx-select-container .choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.ifx-select-container .choices[data-type*=select-one][dir=rtl] .choices__single-button{right:auto;left:0;margin-left:25px;margin-right:0}.ifx-select-container .choices[data-type*=select-multiple]{cursor:pointer}.ifx-select-container .choices[data-type*=select-multiple] .choices__input{display:block;width:100%;margin:0}.ifx-select-container .choices[data-type*=select-multiple] .choices__inner,.ifx-select-container .choices[data-type*=text] .choices__inner{cursor:text}.ifx-select-container .choices[data-type*=select-multiple] .choices__button,.ifx-select-container .choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin-top:0;margin-right:-4px;margin-bottom:0;margin-left:8px;padding-left:16px;border-left:1px solid #0A8276;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:0.75;border-radius:0}.ifx-select-container .choices[data-type*=select-multiple] .choices__button:hover,.ifx-select-container .choices[data-type*=select-multiple] .choices__button:focus,.ifx-select-container .choices[data-type*=text] .choices__button:hover,.ifx-select-container .choices[data-type*=text] .choices__button:focus{opacity:1}.ifx-select-container .choices__inner{overflow:hidden}.ifx-select-container .choices__inner .choices__list .choices__item span{flex-grow:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ifx-select-container .is-focused .choices__inner,.ifx-select-container .is-open .choices__inner{border-color:#b7b7b7}.ifx-select-container .is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.ifx-select-container .is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.ifx-select-container .choices__list{margin:0;padding-left:0;list-style:none}.ifx-select-container .choices__list--single .choices__item{width:100%;display:flex;justify-content:space-between}.ifx-select-container .disabled>.choices__list--single .choices__item[data-value=""]{color:#8d8786;}.ifx-select-container .choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:1rem;line-height:1.5rem;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#0A8276;border:1px solid #0A8276;color:#FFFFFF;word-break:break-all;box-sizing:border-box}.ifx-select-container .choices__list--multiple .choices__item[data-deletable]{padding-right:5px}.ifx-select-container [dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.ifx-select-container .choices__list--multiple .choices__item.is-highlighted{background-color:#EEEDED;border:1px solid #0A8276}.ifx-select-container .choices__list--dropdown{display:none;visibility:hidden;box-sizing:border-box;position:absolute;width:100%;background-color:#FFFFFF;top:100%;overflow:hidden;word-break:break-all;will-change:visibility;box-shadow:0px 0px 16px rgba(29, 29, 29, 0.12);border-radius:1px;margin-top:8px;z-index:1000;left:0;padding-bottom:8px}.ifx-select-container .choices__list--dropdown.is-active{display:block;visibility:visible}.ifx-select-container .is-open .choices__list--dropdown{border-color:#b7b7b7}.ifx-select-container .is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:0.25rem 0.25rem 0 0}.ifx-select-container .choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.ifx-select-container .choices__list--dropdown .choices__item{position:relative;padding:8px 16px;gap:8px;align-items:center;display:flex;justify-content:space-between;font-style:normal;font-weight:400}.ifx-select-container .choices__list--dropdown .choices__item.small-select{font-size:0.875rem;line-height:1.25rem}.ifx-select-container .choices__list--dropdown .choices__item.medium-select{font-size:1rem;line-height:1.5rem}.ifx-select-container .choices__list--dropdown .choices__item.selected{color:#0A8276}.ifx-select-container [dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width: 640px){.ifx-select-container .choices__list--dropdown .choices__item--selectable:after{font-size:0.75rem;line-height:1rem;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}.ifx-select-container [dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}.ifx-select-container [dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.ifx-select-container .choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#eeeded}.ifx-select-container .choices__list--dropdown .choices__item--selectable.is-highlighted.selected{color:#0A8276}.ifx-select-container .choices__list--dropdown .choices__item--selectable:hover{background-color:#EEEDED}.ifx-select-container .choices__list--dropdown .choices__item--selectable:hover.selected{color:#0A8276}.ifx-select-container .choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:0.5}.ifx-select-container .choices__item{cursor:default}.ifx-select-container .choices__item--selectable{cursor:pointer}.ifx-select-container .choices__item--disabled{cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none;opacity:0.5}.ifx-select-container .choices__heading{font-weight:600;font-size:0.75rem;line-height:1rem;padding:10px;border-bottom:1px solid #f7f7f7;color:#1D1D1D}.ifx-select-container .choices__button{text-indent:-9999px;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.ifx-select-container .choices__button:focus{outline:none}.ifx-select-container .choices__single-button{text-indent:-9999px;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer;visibility:hidden}.ifx-select-container .choices__single-button:focus{outline:none}.ifx-select-container .choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:0.875rem;line-height:1.25rem;margin:12px -16px 4px;border:0;border-radius:0;max-width:100%}.ifx-select-container .choices__input--cloned{background-color:transparent}.ifx-select-container{}.ifx-select-container .choices__input::-ms-clear{display:none;width:0;height:0}.ifx-select-container .choices__input::-ms-reveal{display:none;width:0;height:0}.ifx-select-container{}.ifx-select-container .choices__input::-webkit-search-decoration,.ifx-select-container .choices__input::-webkit-search-cancel-button,.ifx-select-container .choices__input::-webkit-search-results-button,.ifx-select-container .choices__input::-webkit-search-results-decoration{display:none}.ifx-select-container .choices__input:focus{outline:0}.ifx-select-container [dir=rtl] .choices__input{padding-right:2px;padding-left:0}.ifx-select-container .ifx-choices__wrapper:not(.disabled) .choices__placeholder{opacity:0.5}.ifx-select-container{}`;

let ChoicesJs;
const Choices = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxSelect = index.createEvent(this, "ifxSelect", 7);
        this.ifxInput = index.createEvent(this, "ifxInput", 7);
    }
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
    get root() { return index.getElement(this); }
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
            const mod = await Promise.resolve().then(function () { return require('./choices-BNEg927Z.js'); });
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
        if (!domUtils.isNestedInIfxComponent(this.root)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-select", await framework);
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
        return (index.h("div", { key: '638dfcaf41899baa0ed53f0dda48d357b952c27b', class: `ifx-select-container` }, this.label ? (index.h("div", { class: `ifx-label-wrapper ${this.disabled && !this.error ? "disabled" : ""}` }, index.h("span", null, this.label), this.required && (index.h("span", { class: `required ${this.error ? "error" : ""}` }, "*")))) : null, index.h("div", { key: 'b43346c28de73ffa896ced9a8abe719634f05842', class: `${choicesWrapperClass} 
            ${this.disabled && !this.error ? "disabled" : ""} 
            ${this.error ? "error" : ""}`, onClick: this.disabled && !this.error
                ? undefined
                : (e) => this.handleWrapperClick(e), onKeyDown: (event) => this.handleKeyDown(event) }, index.h("select", { key: '7728220fee5427a4f274ae515ee5d4d013c17ee0', class: "single__select-input-field", disabled: this.disabled && !this.error, ...attributes, "data-trigger": true, onChange: () => this.handleChange() }, this.createSelectOptions(this.options)), index.h("div", { key: '18620d6acda74d1198af99fde8ec9f1ee008a6e0', class: "single__select-icon-container" }, this.optionIsSelected && (index.h("div", { key: '2324b8b93869abf30810cbdf895fcde72cdeaed5', class: `ifx-choices__icon-wrapper-delete ${!this.showClearButton ? "hide" : ""}` }, index.h("ifx-icon", { key: 'd2fd649bf5c5bfb5119b62ebb4f8381cc9d93a9c', icon: "cRemove16", onClick: () => this.clearSelection() }))), index.h("div", { key: 'fc6eda5deb1d0dfe90d6709343c779e11e81cc2e', class: "ifx-choices__icon-wrapper-up" }, index.h("ifx-icon", { key: "icon-up", icon: "chevron-up-16" })), index.h("div", { key: 'cc5da0218a42ea4b38052471fb4855df769b1d02', class: "ifx-choices__icon-wrapper-down" }, index.h("ifx-icon", { key: "icon-down", icon: "chevron-down-16" })))), this.caption && (index.h("div", { key: '415ae6ea5af635055c30a17a8b812be84ce359b4', class: `single__select-caption ${this.error ? "error" : ""} ${this.disabled && !this.error ? "disabled" : ""}` }, this.caption))));
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
                    index.h("option", { value: optionValueBasedOnAvailableOptions.value }, optionValueBasedOnAvailableOptions.label),
                ];
            }
        }
        // Assign a unique id for the placeholder
        return this.placeholder !== "false"
            ? [index.h("option", { value: "" }, this.placeholderValue)]
            : [index.h("option", { value: "" })];
    }
    static get watchers() { return {
        "disabled": [{
                "watchDisabled": 0
            }]
    }; }
};
Choices.style = selectCss();

exports.ifx_select = Choices;
//# sourceMappingURL=ifx-select.entry.cjs.js.map

//# sourceMappingURL=ifx-select.cjs.entry.js.map