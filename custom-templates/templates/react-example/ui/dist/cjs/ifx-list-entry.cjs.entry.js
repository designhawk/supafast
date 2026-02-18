'use strict';

var index = require('./index-BfM4jcLt.js');

const listEntryCss = () => `.list-entry{display:flex;align-items:center;margin-top:8px;align-self:stretch}`;

const ListEntry = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxListEntryChange = index.createEvent(this, "ifxListEntryChange", 7);
    }
    get host() { return index.getElement(this); }
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
        return (index.h("div", { key: 'b7408b7b403873d4c1250edb3acf409f369452c3', class: "wrapper" }, this.type === "checkbox" ? (index.h("div", { class: "list-entry" }, index.h("ifx-checkbox", { size: "s", checked: this.value }, this.label))) : (index.h("div", { class: "list-entry" }, index.h("ifx-radio-button", { size: "s", checked: this.value }, this.label)))));
    }
    static get watchers() { return {
        "value": [{
                "valueChanged": 0
            }]
    }; }
};
ListEntry.style = listEntryCss();

exports.ifx_list_entry = ListEntry;
//# sourceMappingURL=ifx-list-entry.entry.cjs.js.map

//# sourceMappingURL=ifx-list-entry.cjs.entry.js.map