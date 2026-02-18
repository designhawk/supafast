import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const chipCss = () => `:host{display:inline-block}.chip{position:relative}.chip__wrapper{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;border-radius:9999px;background:#FFFFFF;cursor:pointer;transition:border 100ms ease;font:400 0.875rem/1.25rem "Source Sans 3"}.chip__wrapper .icon__wrapper{display:flex}.chip__wrapper.outlined,.chip__wrapper.filled-dark,.chip__wrapper.filled-light{outline:2px solid transparent}.chip__wrapper.outlined:focus-visible,.chip__wrapper.filled-dark:focus-visible,.chip__wrapper.filled-light:focus-visible{outline:2px solid #0A8276;outline-offset:2px}.chip__wrapper.outlined.chip__wrapper--opened .wrapper__open-button,.chip__wrapper.filled-dark.chip__wrapper--opened .wrapper__open-button,.chip__wrapper.filled-light.chip__wrapper--opened .wrapper__open-button{transform:rotate(-180deg)}.chip__wrapper.outlined.chip__wrapper--selected .wrapper__label .label__selected-options,.chip__wrapper.filled-dark.chip__wrapper--selected .wrapper__label .label__selected-options,.chip__wrapper.filled-light.chip__wrapper--selected .wrapper__label .label__selected-options{font:400 0.875rem/1.25rem "Source Sans 3"}.chip__wrapper.filled-dark.chip__wrapper--selected:not(.read-only),.chip__wrapper.filled-light.chip__wrapper--selected:not(.read-only){background-color:#0A8276;color:white}.chip__wrapper.filled-dark.chip__wrapper--selected:not(.read-only):hover,.chip__wrapper.filled-light.chip__wrapper--selected:not(.read-only):hover{background-color:#08665C}.chip__wrapper.filled-dark.chip__wrapper--selected:not(.read-only):hover.disabled,.chip__wrapper.filled-light.chip__wrapper--selected:not(.read-only):hover.disabled{background-color:#0A8276}.chip__wrapper.outlined{border:1px solid #8D8786}.chip__wrapper.outlined:hover:not(.read-only){border-color:#575352;background-color:#F7F7F7}.chip__wrapper.outlined:active:not(.read-only){border-color:#575352;background-color:#BFBBBB}.chip__wrapper.outlined.chip__wrapper--opened{border:1px solid #0A8276}.chip__wrapper.outlined.chip__wrapper--selected{outline:3px solid #0A8276;border:1px solid transparent;background-color:white}.chip__wrapper.outlined.chip__wrapper--selected:focus-visible{outline-offset:0px}.chip__wrapper.outlined.chip__wrapper--selected:hover:not(.read-only){outline-color:#08665C}.chip__wrapper.outlined.chip__wrapper--selected.read-only{outline:none;border:1px solid black}.chip__wrapper.outlined.disabled{outline:none;color:#BFBBBB;border:1px solid #BFBBBB}.chip__wrapper.outlined.disabled:hover{outline:none;border-color:#BFBBBB;background-color:white}.chip__wrapper.outlined.read-only{border:1px solid black}.chip__wrapper.outlined.read-only:focus-visible{outline:2px solid #0A8276;outline-offset:2px}.chip__wrapper.filled-dark{background-color:#3C3A39;color:white}.chip__wrapper.filled-dark:hover:not(.chip__wrapper--selected,.disabled,.read-only){background-color:#575352}.chip__wrapper.filled-dark:active:not(.chip__wrapper--selected,.disabled,.read-only){background-color:#8D8786;color:black}.chip__wrapper.filled-dark.disabled{outline:none;color:#BFBBBB}.chip__wrapper.filled-dark.disabled:hover:not(.chip__wrapper--selected){background-color:#3C3A39}.chip__wrapper.filled-dark.chip__wrapper--selected.read-only{border:1px solid #8D8786}.chip__wrapper.filled-dark.read-only{border:1px solid #8D8786}.chip__wrapper.filled-light{background-color:#EEEDED}.chip__wrapper.filled-light:hover:not(.read-only){background-color:#BFBBBB}.chip__wrapper.filled-light:active:not(.read-only){background-color:#8D8786}.chip__wrapper.filled-light.disabled{outline:none;color:#BFBBBB}.chip__wrapper.filled-light.disabled:hover:not(.chip__wrapper--selected){background-color:#EEEDED}.chip__wrapper.filled-light.chip__wrapper--selected.read-only{border:1px solid black}.chip__wrapper.filled-light.read-only{border:1px solid black}.chip__wrapper.chip__wrapper--small{padding:4px 8px;height:24px}.chip__wrapper.chip__wrapper--medium{padding:4px 12px;height:28px}.chip__wrapper.chip__wrapper--large{padding:8px 12px;height:36px}.wrapper__label{display:inline-flex;align-items:center;gap:4px}.wrapper__label .label__selected-options{font:600 0.875rem/1.25rem "Source Sans 3"}.wrapper__open-button{display:flex;align-items:center}.wrapper__unselect-button{display:flex;align-items:center}.chip__dropdown{position:absolute;z-index:1;box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1019607843);border:1px solid #EEEDED;border-radius:1px;padding:8px 0;min-width:222px;background-color:#FFFFFF}`;

const Chip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxChange = createEvent(this, "ifxChange", 7);
    }
    get chip() { return getElement(this); }
    ifxChange;
    placeholder = "";
    size = "medium";
    value = undefined;
    variant = "single";
    theme = "outlined";
    readOnly = false;
    ariaLabel;
    disabled = false;
    icon = "";
    opened = false;
    selectedOptions = [];
    handleValueChange(newValue) {
        this.syncSelectedOptionsWithProp(newValue);
    }
    handleReadOnlyChange(newValue) {
        if (newValue) {
            this.opened = false;
        }
    }
    closeDropdownOnOutsideClick(event) {
        const path = event.composedPath();
        const chipWrapper = this.chip.shadowRoot.querySelector(".chip__wrapper");
        const chipDropdown = this.chip.shadowRoot.querySelector(".chip__dropdown");
        if (!path.includes(chipDropdown) &&
            !path.includes(chipWrapper) &&
            this.opened) {
            this.toggleDropdownMenu();
        }
    }
    handleKeyDown(event) {
        // override behavior of all keys except Tab. Users should be able to tab out of the component.
        if (event.code !== "Tab") {
            event.preventDefault();
        }
        if (event.target.tagName === "IFX-CHIP") {
            this.handleWrapperKeyDown(event);
        }
        else if (event.target.tagName === "IFX-CHIP-ITEM") {
            this.handleDropdownKeyDown(event);
        }
    }
    updateSelectedOptions(event) {
        const eventDetail = event.detail;
        const previousSelection = [
            ...this.selectedOptions,
        ];
        if (this.variant !== "multi") {
            if (eventDetail.selected) {
                this.opened = false;
                const chipItems = this.getChipItems();
                chipItems.forEach((chipItem) => {
                    if (chipItem.selected && chipItem !== event.target) {
                        chipItem.chipState = {
                            ...chipItem.chipState,
                            emitIfxChipItemSelect: false,
                        };
                        chipItem.selected = false;
                    }
                });
                this.selectedOptions = [eventDetail];
            }
            else {
                this.selectedOptions = [];
            }
            this.value = this.selectedOptions[0]
                ? this.selectedOptions[0].value
                : undefined;
        }
        else {
            if (eventDetail.selected) {
                // Prevent duplicate entries
                if (!this.selectedOptions.find((option) => option.value === eventDetail.value)) {
                    this.selectedOptions = [...this.selectedOptions, eventDetail];
                }
            }
            else {
                this.selectedOptions = this.selectedOptions.filter((option) => option.value !== eventDetail.value);
            }
            this.value = this.selectedOptions.map((option) => option.value);
        }
        if (eventDetail.emitIfxChange) {
            this.ifxChange.emit({
                previousSelection: previousSelection,
                currentSelection: this.selectedOptions,
                name: this.placeholder,
            });
        }
    }
    getChipItems() {
        return this.chip.querySelectorAll("ifx-chip-item");
    }
    getSelectedOptions() {
        if (this.variant !== "multi") {
            return this.selectedOptions.map((option) => option.label).join("");
        }
        return this.selectedOptions
            .slice(0, 2)
            .map((option) => option.label)
            .join(", ");
    }
    toggleDropdownMenu() {
        if (this.readOnly)
            return;
        this.opened = !this.opened;
    }
    /**
     * Focuses the chip item at the specified index.
     * @param index the index of the chip item to focus. -1 will focus the last chip item.
     */
    focusChipItemAt(index = 0) {
        this.opened = true;
        const chipItems = this.getChipItems();
        let item;
        if (index === -1) {
            item = chipItems.item(chipItems.length - 1);
        }
        else if (index >= 0 && index < chipItems.length) {
            item = chipItems.item(index);
        }
        else {
            console.error(`Invalid index: ${index}`);
            return;
        }
        const shadowItem = item.shadowRoot.querySelector(".chip-item");
        if (shadowItem) {
            // Delay needed for the shadow item to be rendered.
            setTimeout(() => {
                shadowItem.focus();
            }, 1);
        }
    }
    focusChip() {
        const chipWrapper = this.chip.shadowRoot.querySelector(".chip__wrapper");
        chipWrapper.focus();
    }
    handleUnselectButtonClick(event) {
        event.stopPropagation();
        this.opened = false;
        let itemGotUnselected = false;
        const chipItems = this.getChipItems();
        chipItems.forEach((chipItem) => {
            if (chipItem.selected) {
                itemGotUnselected = true;
                chipItem.chipState = {
                    ...chipItem.chipState,
                    emitIfxChipItemSelect: false,
                };
                chipItem.selected = false;
            }
        });
        /* Emit event only if at least one item was unselected. */
        if (itemGotUnselected) {
            const previousSelection = this.selectedOptions;
            this.selectedOptions = [];
            this.value = [];
            this.ifxChange.emit({
                previousSelection: previousSelection,
                currentSelection: [],
                name: this.placeholder,
            });
        }
    }
    handleWrapperClick() {
        if (!this.readOnly) {
            this.toggleDropdownMenu();
        }
    }
    handleWrapperKeyDown(event) {
        // Keymap oriented at https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#keyboard_interaction
        if (this.readOnly)
            return;
        if (!this.opened) {
            switch (event.code) {
                case "Space":
                case "Enter":
                case "ArrowDown":
                    this.focusChipItemAt(0);
                    break;
                case "ArrowUp":
                    this.focusChipItemAt(-1);
                    break;
            }
        }
        else {
            switch (event.code) {
                case "Escape":
                    this.opened = false;
                    this.focusChip();
                    break;
            }
        }
    }
    handleDropdownKeyDown(event) {
        const chipitems = this.getChipItems();
        const targetIndex = Array.from(chipitems).indexOf(event.target);
        if (targetIndex === -1) {
            console.error("Target not found in chip items");
            return;
        }
        switch (event.code) {
            case "ArrowDown":
                if (targetIndex === chipitems.length - 1)
                    break;
                this.focusChipItemAt(targetIndex + 1);
                break;
            case "ArrowUp":
                if (targetIndex === 0)
                    break;
                this.focusChipItemAt(targetIndex - 1);
                break;
            case "Escape":
                this.opened = false;
                this.focusChip();
                break;
            case "Space":
                // selection is handled by the chip-item component
                if (this.variant === "single") {
                    // only close dropdown if single select
                    this.opened = false;
                    this.focusChip();
                }
                break;
            case "Enter":
                // selection is handled by the chip-item component
                this.opened = false;
                this.focusChip();
                break;
        }
    }
    syncChipState() {
        const chipItems = this.getChipItems();
        let key = 0;
        chipItems.forEach((chipItem) => {
            chipItem.chipState = {
                emitIfxChipItemSelect: true,
                size: this.size ? this.size : "medium",
                variant: this.variant === "multi" ? "multi" : "single",
                key: key++,
            };
        });
    }
    syncSelectedOptionsWithProp(newValue) {
        // Clear old selected options
        this.selectedOptions = [];
        const generateKey = (() => {
            let count = 0;
            return () => count++;
        })();
        if (Array.isArray(newValue)) {
            this.selectedOptions = newValue.map((value) => ({
                value,
                label: value,
                selected: true,
                key: generateKey(),
                emitIfxChange: true,
            }));
        }
        else if (typeof newValue === "string") {
            this.selectedOptions = [
                {
                    value: newValue,
                    label: newValue,
                    selected: true,
                    key: generateKey(),
                    emitIfxChange: true,
                },
            ];
        }
        this.syncChipState();
    }
    componentWillLoad() {
        this.syncSelectedOptionsWithProp(this.value);
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.chip)) {
            const framework = detectFramework();
            trackComponent("ifx-chip", await framework);
        }
    }
    render() {
        return (h("div", { key: '00f3dc7448c3a2c0116d3102de633c0a80e4d194', class: "chip" }, h("div", { key: '4747b74751dabc76e87a5493142650bd17809019', class: `chip__wrapper chip__wrapper--${this.size ? this.size : "medium"}
                  chip__wrapper--${this.variant === "multi" ? "multi" : "single"}
                  ${this.opened && !this.readOnly ? "chip__wrapper--opened" : ""}
                  ${this.selectedOptions.length ? "chip__wrapper--selected" : ""}
                  ${this.theme ? this.theme : "outlined"}
                  ${this.disabled ? "disabled" : ""}
                  ${this.readOnly ? "read-only" : ""}`, tabIndex: 0, onClick: !this.readOnly && !this.disabled
                ? () => {
                    this.handleWrapperClick();
                }
                : undefined, role: "combobox", "aria-label": this.ariaLabel, "aria-value": this.getSelectedOptions(), "aria-haspopup": !this.readOnly ? "listbox" : undefined, "aria-expanded": !this.readOnly ? this.opened.toString() : undefined, "aria-controls": !this.readOnly ? "dropdown" : undefined, "aria-readonly": this.readOnly ? "true" : undefined, "aria-multiselectable": this.variant === "multi" ? "true" : undefined }, this.icon && (h("div", { key: 'a27f8d20add277778261a4c9c1bb8fa2014fa8de', class: "icon__wrapper" }, h("ifx-icon", { key: '034f39df1f7117b590d1638f358b506fdf070557', icon: this.icon }))), h("div", { key: '1761d90ebb8a08a58ee147def633058d818d912a', class: "wrapper__label" }, this.selectedOptions.length === 0 && `${this.placeholder}`, this.selectedOptions.length !== 0 &&
            this.variant === "multi" &&
            this.placeholder !== "" &&
            `${this.placeholder}:`, this.selectedOptions.length !== 0 && (h("div", { key: '59390d68dc73ac54963ccda688706e09e5da6100', class: "label__selected-options" }, this.getSelectedOptions())), this.selectedOptions.length > 2 && this.variant === "multi" && (h("ifx-indicator", { key: 'f7c365a36af4c19b952790277caa8e1c19dcf84a', variant: "number", inverted: this.theme === "outlined" ? false : true, number: this.selectedOptions.length - 2 }))), !this.readOnly &&
            (this.variant !== "multi" ||
                (this.variant === "multi" &&
                    this.selectedOptions.length === 0)) && (h("div", { key: 'b6c27c0e3b890300030d5c9369ac0446f94dfb3b', class: "wrapper__open-button" }, h("ifx-icon", { key: 1, icon: `chevron-down-16` }))), this.selectedOptions.length >= 1 && this.variant === "multi" && (h("div", { key: '3ea341f27bd6476639d558b9c91ac72e4eee79f9', class: "wrapper__unselect-button", onClick: !this.readOnly && !this.disabled
                ? (e) => {
                    this.handleUnselectButtonClick(e);
                }
                : undefined }, h("ifx-icon", { key: 2, icon: `cross16` })))), this.opened && !this.readOnly && (h("div", { key: '028b582a3d8401cc699d14bd59daba01b60c3be0', id: "dropdown", role: "listbox", class: "chip__dropdown" }, h("slot", { key: '266f693738851d3b6b471bbd9a6e844034e95509' })))));
    }
    static get watchers() { return {
        "value": [{
                "handleValueChange": 0
            }],
        "readOnly": [{
                "handleReadOnlyChange": 0
            }]
    }; }
};
Chip.style = chipCss();

const chipItemCss = () => `.chip-item{display:flex;align-items:center;gap:8px;padding:8px 16px;user-select:none;transition:all 100ms ease;transition-property:background, color}.chip-item:hover{cursor:pointer;background-color:#EEEDED}.chip-item:active{background-color:#BFBBBB}.chip-item:focus{outline:2px solid #0A8276}.chip-item.chip-item--large{font:400 1rem/1.5rem "Source Sans 3"}.chip-item.chip-item--small{font:400 0.875rem/1.25rem "Source Sans 3"}.chip-item.chip-item--selected{color:#0A8276}.chip-item.chip-item--selected .chip-item__selected-indicator{display:block}.chip-item__selected-indicator{display:none;margin-left:auto}`;

const ChipItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxChipItemSelect = createEvent(this, "ifxChipItemSelect", 5);
    }
    get chipItem() { return getElement(this); }
    ifxChipItemSelect;
    value = undefined;
    chipState = {
        emitIfxChipItemSelect: true,
        variant: "multi",
        size: "large",
    };
    selected = false;
    updateItemSelection(event) {
        if (this.chipState.variant === "single") {
            const target = event.target;
            /* Also making sure chip items are from the same group (parent) while unselecting. */
            if (this.chipItem !== target &&
                this.chipItem.parentElement === target.parentElement) {
                this.selected = false;
            }
        }
    }
    validateSelected(newValue, oldValue) {
        if (newValue !== oldValue) {
            /* Do not emit if ChipState does not allow. */
            if (this.chipState.emitIfxChipItemSelect) {
                this.emitIfxChipItemSelectEvent();
            }
            else {
                this.chipState.emitIfxChipItemSelect = true;
            }
        }
    }
    getItemLabel() {
        return this.chipItem.innerText;
    }
    toggleItemSelection() {
        this.selected = !this.selected;
    }
    emitIfxChipItemSelectEvent(emitIfxChange = true) {
        this.ifxChipItemSelect.emit({
            emitIfxChange: emitIfxChange,
            key: this.chipState.key,
            label: this.getItemLabel(),
            selected: this.selected,
            value: this.value,
        });
    }
    handleItemClick() {
        this.toggleItemSelection();
    }
    handleItemKeyDown(event) {
        if (event.code === "Enter" || event.code === "Space") {
            this.toggleItemSelection();
        }
    }
    handleSelectedState() {
        if (this.selected) {
            this.emitIfxChipItemSelectEvent(false);
        }
    }
    componentWillLoad() {
        /* Propogating the selected state to the Chip (Parent) component if it is set. */
        this.handleSelectedState();
    }
    render() {
        return (h("div", { key: '4d2245f4c4da836f60a3dbb77fe76db38eb8b36d', class: `chip-item chip-item--${this.chipState.size} 
                    chip-item--${(this.selected && this.chipState.variant) === "single" ? "selected" : ""}`, tabIndex: 0, onClick: () => {
                this.handleItemClick();
            }, onKeyDown: (e) => {
                this.handleItemKeyDown(e);
            }, role: "option", "aria-selected": this.selected.toString() }, this.chipState.variant === "multi" && (h("ifx-checkbox", { key: '516aadec9eceba16011531f406d41f5e4ab0668f', checked: this.selected, tabIndex: -1, size: "s" })), h("div", { key: '319e918bf893498f9f15859833e64f071f2c9775', class: "chip-item__label" }, " ", h("slot", { key: '3e9a5f0fee83e6917a27302532000757c22d49ca' }), " "), h("div", { key: 'b01c487bffd42cc49268b4c91cb979e156457f29', class: "chip-item__selected-indicator" }, h("ifx-icon", { key: 'b89353251f67f0e068810dc5795f6591bb84fc8e', icon: "check-16" }, " "))));
    }
    static get watchers() { return {
        "selected": [{
                "validateSelected": 0
            }]
    }; }
};
ChipItem.style = chipItemCss();

const paginationCss = () => `:host{display:inline-flex}.container{display:inline-flex;justify-content:center;align-items:center;gap:32px;font-family:var(--ifx-font-family);flex-wrap:wrap}.container .items__per-page-wrapper{display:flex;align-items:center;gap:16px}.container .items__per-page-wrapper .items__per-page-label{color:#1D1D1D;font-size:14px;font-style:normal;font-weight:600;line-height:20px}.container .items__per-page-wrapper .items__per-page-field{display:flex;flex-direction:column;align-items:flex-start}.container .items__per-page-wrapper .items__per-page-field ifx-select{width:92px}.container .items__total-wrapper{display:flex;justify-content:center;align-items:center;gap:12px}.container .items__total-wrapper .items__total-button{display:flex;width:40px;height:40px;justify-content:center;align-items:center;border-radius:100px;border:1px solid #BFBBBB;background:#FFF}.container .items__total-wrapper .page__numbers-wrapper{display:flex;justify-content:center;align-items:center;gap:12px}.container .items__total-wrapper .page__numbers-wrapper .page__number-item{display:flex;padding:6px;flex-direction:column;justify-content:center;align-items:center;gap:10px;border-radius:100px}.container .items__total-wrapper .page__numbers-wrapper .page__number-item.active{background-color:#0A8276}.container .items__total-wrapper .page__numbers-wrapper .page__number-item.active span{color:#fff}.container .items__total-wrapper .page__numbers-wrapper .page__number-item:hover{cursor:pointer}.container .items__total-wrapper .page__numbers-wrapper .page__number-item:hover:not(.active){background-color:#ddd}.container .items__total-wrapper .page__numbers-wrapper .page__number-item:active:not(.active){background-color:#575352}.container .items__total-wrapper .page__numbers-wrapper .page__number-item span{display:flex;width:16px;height:16px;flex-direction:column;justify-content:center;color:#1D1D1D;text-align:center;font-size:13px;font-style:normal;font-weight:400;line-height:20px}.pagination{display:flex}.pagination ifx-icon-button:first-of-type{margin-right:12px}.pagination ifx-icon-button:last-of-type{margin-left:12px}.page__button{padding:8px;border-radius:100px}ol{list-style-type:none;padding:0;margin:0;display:inline-flex;align-items:center;gap:12px}li{display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:100px}li:hover:not(.active) page__button{background-color:#EEEDED}li:active:not(.active) .page__button{background-color:#575352;color:#fff}li.active{background-color:#0A8276}li.active .page__button{color:#fff}li:hover{cursor:pointer}li .page__button{text-decoration:none;display:flex;width:16px;height:16px;flex-direction:column;justify-content:center;color:#1D1D1D;text-align:center;font-size:13px;font-style:normal;font-weight:400;line-height:20px;align-items:center}.prev.disabled,.next.disabled{cursor:default}.prev.disabled:hover,.next.disabled:hover{cursor:default;text-decoration:none}.prev{margin-right:2.5px}.next{margin-left:2.5px}@media (max-width: 768px){.container{gap:16px;justify-content:left}.container .items__total-wrapper .pagination ol{gap:12px}}@media (max-width: 374px){.pagination .ellipsis+.active{margin-left:8px}.pagination .active+.ellipsis{margin-left:8px}}`;

const Pagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxPageChange = createEvent(this, "ifxPageChange", 7);
        this.ifxItemsPerPageChange = createEvent(this, "ifxItemsPerPageChange", 7);
    }
    get el() { return getElement(this); }
    ifxPageChange;
    ifxItemsPerPageChange;
    currentPage = 1;
    showItemsPerPage = true;
    internalPage = 1;
    internalItemsPerPage = 10;
    numberOfPages = [];
    total = 1;
    itemsPerPage;
    filteredItemsPerPage = [];
    visiblePages = [];
    CLASS_DISABLED = "disabled";
    CLASS_ACTIVE = "active";
    prevInternalPage;
    watchTotalHandler() {
        this.calculateNumberOfPages();
        this.updateVisiblePages();
    }
    currentPageWatcher(newVal) {
        this.internalPage = Math.max(1, Math.min(newVal, this.numberOfPages.length));
        this.calculateNumberOfPages();
        this.updateVisiblePages();
    }
    setItemsPerPage(e) {
        const selectedValue = e.detail?.value || e.detail?.label;
        const newItemsPerPage = parseInt(selectedValue) || 10;
        if (newItemsPerPage === this.internalItemsPerPage) {
            return;
        }
        this.internalItemsPerPage = newItemsPerPage;
        this.internalPage = 1;
        this.calculateNumberOfPages();
        this.updateVisiblePages();
        this.handleEventEmission();
    }
    emitItemsPerPage(e) {
        this.ifxItemsPerPageChange.emit(e.detail.label);
    }
    async componentDidLoad() {
        if (this.showItemsPerPage) {
            const select = this.el.shadowRoot.querySelector("#itemsPerPageSelect");
            if (select) {
                select.addEventListener("ifxSelect", (e) => this.emitItemsPerPage(e));
            }
        }
        // Add resize listener to update pagination on screen size changes
        window.addEventListener("resize", this.handleResize);
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-pagination", await framework);
        }
        this.initPagination();
    }
    disconnectedCallback() {
        if (this.showItemsPerPage) {
            const select = this.el.shadowRoot.querySelector("#itemsPerPageSelect");
            if (select) {
                select.removeEventListener("ifxSelect", (e) => this.emitItemsPerPage(e));
            }
        }
        // Remove resize listener
        window.removeEventListener("resize", this.handleResize);
        // Clear any pending resize timeout
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    }
    updateVisiblePages() {
        // Check if screen is mobile (< 375px)
        const isMobile = window.innerWidth < 375;
        const totalPages = this.numberOfPages.length;
        const current = this.internalPage;
        let pages = [];
        if (isMobile) {
            // Mobile logic: maximum 5 elements
            if (totalPages <= 5) {
                pages = [...this.numberOfPages];
            }
            else {
                // Always show first page
                pages.push(1);
                if (current <= 2) {
                    // Show: 1 2 3 … 10 (for pages 1 and 2)
                    pages.push(2, 3, "...", totalPages);
                }
                else if (current >= totalPages - 1) {
                    // Show: 1 … 23 24 25 (for last 2 pages only)
                    pages.push("...", totalPages - 2, totalPages - 1, totalPages);
                }
                else {
                    // Show: 1 … 5 … 10 (for middle pages, including page 3 and third-to-last page)
                    pages.push("...", current, "...", totalPages);
                }
            }
        }
        else {
            // Desktop logic: maximum 7 elements
            const buffer = 2;
            if (totalPages <= 7) {
                pages = [...this.numberOfPages];
            }
            else {
                // Always show first page
                pages.push(1);
                // Determine the range around current page
                let start = Math.max(2, current - buffer);
                let end = Math.min(totalPages - 1, current + buffer);
                // Adjust range to ensure we show enough pages
                // If we're close to the beginning, extend the end
                if (current <= 4) {
                    start = 2;
                    end = Math.min(totalPages - 1, 5);
                }
                // If we're close to the end, extend the start
                else if (current >= totalPages - 3) {
                    start = Math.max(2, totalPages - 4);
                    end = totalPages - 1;
                }
                // For middle pages, show current +/- 1
                else {
                    start = current - 1;
                    end = current + 1;
                }
                // Add ellipsis before the range if there's a gap
                if (start > 2) {
                    pages.push("...");
                }
                // Add the range of pages
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                // Add ellipsis after the range if there's a gap
                if (end < totalPages - 1) {
                    pages.push("...");
                }
                // Always show last page
                pages.push(totalPages);
            }
        }
        this.visiblePages = pages;
    }
    calculateNumberOfPages() {
        const totalPages = Math.ceil(this.total / this.internalItemsPerPage);
        this.numberOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
        this.internalPage = Math.max(1, Math.min(this.currentPage, totalPages));
    }
    filterOptionsArray() {
        const items = typeof this.itemsPerPage === "string"
            ? JSON.parse(this.itemsPerPage)
            : this.itemsPerPage;
        this.filteredItemsPerPage = items.map((item) => ({
            ...item,
            label: item.label || item.value,
        }));
    }
    componentWillLoad() {
        this.filterOptionsArray();
        const selectedOption = this.filteredItemsPerPage.find((option) => option.selected);
        if (selectedOption) {
            this.internalItemsPerPage = Number(selectedOption.value);
        }
        else if (this.filteredItemsPerPage.length > 0) {
            this.internalItemsPerPage = Number(this.filteredItemsPerPage[0].value);
        }
        this.calculateNumberOfPages();
        this.internalPage = Math.max(1, Math.min(this.currentPage, this.numberOfPages.length));
        this.updateVisiblePages();
    }
    componentWillUpdate() {
        if (this.prevInternalPage !== this.internalPage) {
            this.updateVisiblePages();
            this.prevInternalPage = this.internalPage;
        }
    }
    componentDidUpdate() {
        this.initPagination();
    }
    handleEventEmission() {
        this.ifxPageChange.emit({
            currentPage: this.internalPage,
            totalPages: this.numberOfPages.length,
            itemsPerPage: this.internalItemsPerPage,
        });
    }
    initPagination() {
        const pagination = this.el.shadowRoot.querySelector(".pagination");
        if (!pagination)
            return;
        const updateButtons = () => {
            const prev = pagination.querySelector(".prev");
            const next = pagination.querySelector(".next");
            if (prev) {
                prev.disabled = this.internalPage === 1;
                prev.classList.toggle(this.CLASS_DISABLED, this.internalPage === 1);
            }
            if (next) {
                next.disabled = this.internalPage === this.numberOfPages.length;
                next.classList.toggle(this.CLASS_DISABLED, this.internalPage === this.numberOfPages.length);
            }
        };
        pagination.querySelectorAll("li").forEach((li) => {
            li.removeEventListener("click", this.handlePageClick);
            li.addEventListener("click", this.handlePageClick);
        });
        updateButtons();
    }
    handlePageClick = (e) => {
        const li = e.currentTarget;
        const page = parseInt(li.dataset.page);
        if (!isNaN(page))
            this.changePage(page);
    };
    handleResize = () => {
        // Debounce resize events to prevent excessive calls
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateVisiblePages();
        }, 100);
    };
    resizeTimeout;
    changePage(newPage) {
        newPage = Math.max(1, Math.min(newPage, this.numberOfPages.length));
        if (newPage === this.internalPage)
            return;
        this.internalPage = newPage;
        this.handleEventEmission();
        this.initPagination();
    }
    render() {
        return (h("div", { key: '1a7e9f420d6d05115474e0687853207790b711f3', class: "container" }, this.showItemsPerPage && (h("div", { key: '10bba45b2e9ac9255111ae503e707f12323a0f66', class: "items__per-page-wrapper" }, h("div", { key: '90ed8b8ba7734eb44b9208058698204f2471dc79', class: "items__per-page-label" }, "Results per Page"), h("div", { key: '1775ce7abcdefa82670cc521bdd2cacfd2e017f8', class: "items__per-page-field" }, h("ifx-select", { key: '057c807d88b7ebeeb8c5c2828b8b43b83a5fa32c', id: "itemsPerPageSelect", placeholder: "false", "show-search": "false", value: undefined, disabled: false, error: false, size: "s", options: this.filteredItemsPerPage, "placeholder-value": "Select" })))), h("div", { key: 'a4cfcaf23feef6856849239302d8ceb45820a25d', class: "items__total-wrapper" }, h("div", { key: 'e2487f7b8fbaa9d283bbc0a1d036fcc3f4848109', class: "pagination" }, h("ifx-icon-button", { key: 'bcaabe30551b47a4a03226ddbdc44017d1fb0547', class: "prev", icon: "arrow-left-16", "aria-label": "Previous Page", onClick: () => this.changePage(this.internalPage - 1), variant: "secondary" }), h("ol", { key: '555db71408f416a74ad0c0f7414bd8228c7ffae5' }, this.visiblePages.map((page, i) => typeof page === "number" ? (h("li", { key: `page-${page}`, class: { [this.CLASS_ACTIVE]: page === this.internalPage }, "data-page": page }, h("span", { class: "page__button", role: "button", tabindex: "0", "aria-current": page === this.internalPage ? "page" : undefined, "aria-label": `Page ${page}`, onClick: () => this.changePage(page), onKeyDown: (e) => (e.key === "Enter" || e.key === " ") &&
                this.changePage(page) }, page))) : (h("li", { class: "ellipsis", key: `ellipsis-${i}` }, h("span", { "aria-hidden": "true" }, "..."))))), h("ifx-icon-button", { key: '0f39a25a83b88078c9a6268740e3400846fcd449', class: "next", icon: "arrow-right-16", "aria-label": "Next Page", onClick: () => this.changePage(this.internalPage + 1), variant: "secondary" })))));
    }
    static get watchers() { return {
        "total": [{
                "watchTotalHandler": 0
            }],
        "currentPage": [{
                "currentPageWatcher": 0
            }]
    }; }
};
Pagination.style = paginationCss();

export { Chip as ifx_chip, ChipItem as ifx_chip_item, Pagination as ifx_pagination };
//# sourceMappingURL=ifx-chip.ifx-chip-item.ifx-pagination.entry.js.map

//# sourceMappingURL=ifx-chip_3.entry.js.map