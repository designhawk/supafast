import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Chip {
    chip;
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
    static get is() { return "ifx-chip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["chip.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["chip.css"]
        };
    }
    static get properties() {
        return {
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
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"small\" | \"medium\" | \"large\"",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
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
                "defaultValue": "\"medium\""
            },
            "value": {
                "type": "string",
                "mutable": true,
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
                "attribute": "value",
                "defaultValue": "undefined"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"single\" | \"multi\"",
                    "resolved": "\"multi\" | \"single\"",
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
                "attribute": "variant",
                "defaultValue": "\"single\""
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"outlined\" | \"filled-light\" | \"filled-dark\"",
                    "resolved": "\"filled-dark\" | \"filled-light\" | \"outlined\"",
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
                "attribute": "theme",
                "defaultValue": "\"outlined\""
            },
            "readOnly": {
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
                "attribute": "read-only",
                "defaultValue": "false"
            },
            "ariaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
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
                "attribute": "aria-label"
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
            "icon": {
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
                "attribute": "icon",
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "opened": {},
            "selectedOptions": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxChange",
                "name": "ifxChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{\n\t\tpreviousSelection: Array<ChipItemSelectEvent>;\n\t\tcurrentSelection: Array<ChipItemSelectEvent>;\n\t\tname: string;\n\t}",
                    "resolved": "{ previousSelection: ChipItemSelectEvent[]; currentSelection: ChipItemSelectEvent[]; name: string; }",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "ChipItemSelectEvent": {
                            "location": "import",
                            "path": "./interfaces",
                            "id": "src/components/chip/interfaces.tsx::ChipItemSelectEvent",
                            "referenceLocation": "ChipItemSelectEvent"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "chip"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "handleValueChange"
            }, {
                "propName": "readOnly",
                "methodName": "handleReadOnlyChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "closeDropdownOnOutsideClick",
                "target": "document",
                "capture": false,
                "passive": true
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "ifxChipItemSelect",
                "method": "updateSelectedOptions",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=chip.js.map
