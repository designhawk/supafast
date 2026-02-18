'use strict';

var index = require('./index-BfM4jcLt.js');

const dropdownMenuCss = () => `:host{position:relative;z-index:1000}.dropdown-menu{display:none;visibility:hidden;flex-direction:column;width:224px;max-height:289px;min-width:224px;overflow-y:auto;background:#FFFFFF;box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1019607843);border:1px solid #EEEDED;padding:8px 4px;font-family:var(--ifx-font-family)}.dropdown-menu.small{max-height:266px;max-width:186px;overflow-y:auto}.dropdown-menu.hideTopPadding{padding-top:0px}.dropdown-menu.show{display:flex;visibility:visible}`;

const DropdownMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.menuSize = index.createEvent(this, "menuSize", 7);
        this.ifxDropdownMenuItem = index.createEvent(this, "ifxDropdownMenuItem", 7);
    }
    isOpen = false;
    size = "l";
    hideTopPadding = false;
    get el() { return index.getElement(this); }
    menuSize;
    filteredItems = [];
    ifxDropdownMenuItem;
    handleMenuFilter(event) {
        const searchValue = event.detail;
        this.filterDropdownItems(searchValue);
    }
    handleDropdownItemValueEmission(event) {
        this.ifxDropdownMenuItem.emit(event.detail);
    }
    filterDropdownItems(searchValue) {
        const allItems = Array.from(this.el.querySelectorAll("ifx-dropdown-item"));
        let dropdownItem, txtValue;
        const query = searchValue.toUpperCase();
        for (let i = 0; i < allItems.length; i++) {
            dropdownItem = allItems[i];
            txtValue = dropdownItem.textContent || dropdownItem.innerText;
            if (txtValue.toUpperCase().indexOf(query) > -1) {
                dropdownItem.setAttribute("hide", false);
            }
            else {
                dropdownItem.setAttribute("hide", true);
            }
        }
    }
    componentWillUpdate() {
        this.menuSize.emit(this.size);
    }
    componentWillLoad() {
        this.filteredItems = Array.from(this.el.querySelectorAll("ifx-dropdown-item"));
        const searchField = this.el.querySelector("ifx-search-field");
        const dropdownHeader = this.el.querySelector("ifx-dropdown-header");
        if (searchField || dropdownHeader) {
            this.hideTopPadding = true;
        }
        else
            this.hideTopPadding = false;
    }
    render() {
        return (index.h("div", { key: 'c53b2bf03379e276e757b6f62e5272756dbc7810', class: `dropdown-menu 
      ${this.isOpen ? "show" : ""} 
      ${this.hideTopPadding ? "hideTopPadding" : ""}
      ${this.size === "s" ? "small" : ""}` }, index.h("slot", { key: 'bba228106f09be140abd51378e954d2ca66ff654' })));
    }
};
DropdownMenu.style = dropdownMenuCss();

exports.ifx_dropdown_menu = DropdownMenu;
//# sourceMappingURL=ifx-dropdown-menu.entry.cjs.js.map

//# sourceMappingURL=ifx-dropdown-menu.cjs.entry.js.map