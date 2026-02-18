import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';

const listEntryCss = () => `.list-entry{display:flex;align-items:center;margin-top:8px;align-self:stretch}`;

const ListEntry = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxListEntryChange = createEvent(this, "ifxListEntryChange", 7);
    }
    get host() { return getElement(this); }
    value;
    label;
    type;
    ifxListEntryChange;
    valueChanged(newValue) {
        if (newValue) {
            this.host.setAttribute("value", "true");
        }
        else {
            this.host.removeAttribute("value");
        }
    }
    handleFilterEntryChange(event) {
        this.value = event.detail;
        this.ifxListEntryChange.emit({
            label: this.label,
            value: this.value,
            type: this.type,
        });
    }
    render() {
        return (h("div", { key: 'b7408b7b403873d4c1250edb3acf409f369452c3', class: "wrapper" }, this.type === "checkbox" ? (h("div", { class: "list-entry" }, h("ifx-checkbox", { size: "s", checked: this.value }, this.label))) : (h("div", { class: "list-entry" }, h("ifx-radio-button", { size: "s", checked: this.value }, this.label)))));
    }
    static get watchers() { return {
        "value": [{
                "valueChanged": 0
            }]
    }; }
};
ListEntry.style = listEntryCss();

export { ListEntry as ifx_list_entry };
//# sourceMappingURL=ifx-list-entry.entry.js.map

//# sourceMappingURL=ifx-list-entry.entry.js.map