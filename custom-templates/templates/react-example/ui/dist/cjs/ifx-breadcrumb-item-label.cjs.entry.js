'use strict';

var index = require('./index-BfM4jcLt.js');

const breadcrumbItemLabelCss = () => `.breadcrumb-item-label-container{display:flex;align-items:center;gap:8px;text-decoration:none;color:#1D1D1D}.breadcrumb-item-label-container.margin{margin-left:16px}.breadcrumb-item-label-container ifx-icon:empty{display:none}.breadcrumb-item-label-container .label-icon-wrapper{display:inline-flex}.breadcrumb-item-label-container .menu-icon-wrapper{display:flex;justify-content:center;align-items:center;width:16px;height:16px}.breadcrumb-item-label-container .menu-icon-wrapper.hide{display:none}.breadcrumb-item-label-container .menu-icon-wrapper ifx-icon{transition:0.3s}.breadcrumb-item-label-container .menu-icon-wrapper.show ifx-icon{transition:0.3s;transform:rotate(180deg)}`;

const BreadcrumbItemLabel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.breadcrumbMenuIconWrapper = index.createEvent(this, "breadcrumbMenuIconWrapper", 7);
    }
    icon;
    href;
    target = "_self";
    get el() { return index.getElement(this); }
    breadcrumbMenuIconWrapper;
    componentDidLoad() {
        const container = this.el.shadowRoot.querySelector(".breadcrumb-item-label-container");
        const menuWrapper = container.querySelector(".menu-icon-wrapper");
        this.breadcrumbMenuIconWrapper.emit(menuWrapper);
    }
    render() {
        return (index.h("a", { key: 'eb39eeb687c3bc04eedb3e21698a6921f2cb7a91', href: this.href, target: this.target, class: "breadcrumb-item-label-container", role: "link" }, index.h("ifx-icon", { key: '38d68e9cf885cf7ef2de9e7c574468a07aa75aca', icon: this.icon, "aria-hidden": "true" }), index.h("span", { key: '03c9dc04e7e5d14d9ad96699be54a20cdca64233', class: "label-wrapper" }, index.h("slot", { key: '06efe9f1937791ae8bd82b3b1e1ce149716cd5f4' })), index.h("span", { key: 'a6946ba4a3abfe71fea8028211d5928f6304c3cf', class: "menu-icon-wrapper", "aria-hiden": "true" }, index.h("ifx-icon", { key: '931b00789f1b78b64d9aea359755976661c37e62', icon: "chevron-down-16" }))));
    }
};
BreadcrumbItemLabel.style = breadcrumbItemLabelCss();

exports.ifx_breadcrumb_item_label = BreadcrumbItemLabel;
//# sourceMappingURL=ifx-breadcrumb-item-label.entry.cjs.js.map

//# sourceMappingURL=ifx-breadcrumb-item-label.cjs.entry.js.map