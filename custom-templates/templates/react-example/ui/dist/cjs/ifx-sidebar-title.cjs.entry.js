'use strict';

var index = require('./index-BfM4jcLt.js');

const sidebarTitleCss = () => `:host{position:relative;display:var(--ifx-sidebar-title-display, block)}:host([data-show-in-collapsed=true]){display:var(--ifx-sidebar-title-show-in-collapsed-display, block)}.sidebar__title{width:100%;height:fit-content;border-top:1px solid #EEEDED;padding:var(--ifx-sidebar-title-padding, 12px 0)}.sidebar__title.no-top-border{border-top:none}.sidebar__title-label{height:20px;font:600 0.875rem/1.25rem "Source Sans 3";text-transform:uppercase;color:#575352;letter-spacing:3px;display:var(--ifx-sidebar-title-label-display, block)}`;

const SidebarTitle = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    showInCollapsed = false;
    componentWillLoad() {
        // Set data attribute for CSS targeting
        this.el.setAttribute("data-show-in-collapsed", this.showInCollapsed.toString());
    }
    render() {
        return (index.h("div", { key: '98f8c05081ff7b90c2b4d10a5946c18541f1b92e', class: "sidebar__title" }, index.h("div", { key: 'd5b21f302971aa6ea3a0c91d21b9866f235d90ee', class: "sidebar__title-label" }, index.h("slot", { key: 'c24b01560d05a373e8e67ca3893dced67a8ef442' }))));
    }
};
SidebarTitle.style = sidebarTitleCss();

exports.ifx_sidebar_title = SidebarTitle;
//# sourceMappingURL=ifx-sidebar-title.entry.cjs.js.map

//# sourceMappingURL=ifx-sidebar-title.cjs.entry.js.map