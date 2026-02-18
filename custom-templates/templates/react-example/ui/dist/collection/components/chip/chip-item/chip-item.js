import { h, } from "@stencil/core";
export class ChipItem {
    chipItem;
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
    static get is() { return "ifx-chip-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["chip-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["chip-item.css"]
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
                "attribute": "value",
                "defaultValue": "undefined"
            },
            "chipState": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ChipState",
                    "resolved": "ChipState",
                    "references": {
                        "ChipState": {
                            "location": "import",
                            "path": "../interfaces",
                            "id": "src/components/chip/interfaces.tsx::ChipState",
                            "referenceLocation": "ChipState"
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
                "defaultValue": "{\n\t\temitIfxChipItemSelect: true,\n\t\tvariant: \"multi\",\n\t\tsize: \"large\",\n\t}"
            },
            "selected": {
                "type": "boolean",
                "mutable": true,
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
                "reflect": true,
                "attribute": "selected",
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "ifxChipItemSelect",
                "name": "ifxChipItemSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "ChipItemSelectEvent",
                    "resolved": "ChipItemSelectEvent",
                    "references": {
                        "ChipItemSelectEvent": {
                            "location": "import",
                            "path": "../interfaces",
                            "id": "src/components/chip/interfaces.tsx::ChipItemSelectEvent",
                            "referenceLocation": "ChipItemSelectEvent"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "chipItem"; }
    static get watchers() {
        return [{
                "propName": "selected",
                "methodName": "validateSelected"
            }];
    }
    static get listeners() {
        return [{
                "name": "ifxChipItemSelect",
                "method": "updateItemSelection",
                "target": "body",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=chip-item.js.map
