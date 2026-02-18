'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const treeViewCss = () => `:host{display:block}.tree-view{font-family:var(--ifx-font-family, sans-serif);font-size:14px;color:var(--ifx-color-text, #1a1a1a);display:flex;flex-wrap:wrap;flex-direction:column;overflow-x:auto;overflow-y:hidden}.tree-view__label{font:600 1.125rem/1.625rem "Source Sans 3";margin-bottom:8px}`;

const TreeView = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxTreeViewExpandAllChange = index.createEvent(this, "ifxTreeViewExpandAllChange", 7);
        this.ifxTreeViewDisableAllChange = index.createEvent(this, "ifxTreeViewDisableAllChange", 7);
    }
    get el() { return index.getElement(this); }
    label;
    disableAllItems = false;
    expandAllItems = false;
    ariaLabel;
    ifxTreeViewExpandAllChange;
    ifxTreeViewDisableAllChange;
    handleExpandAllItemsChange(newValue) {
        this.ifxTreeViewExpandAllChange.emit(newValue);
    }
    handleDisableAllItemsChange(newValue) {
        this.ifxTreeViewDisableAllChange.emit(newValue);
    }
    handleSlotRef = (el) => {
        if (el) {
            if (this.disableAllItems) {
                el.setAttribute("data-disable-all-items", "true");
            }
            else {
                el.removeAttribute("data-disable-all-items");
            }
            if (this.expandAllItems) {
                el.setAttribute("data-expand-all-items", "true");
            }
            else {
                el.removeAttribute("data-expand-all-items");
            }
        }
    };
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-tree-view", await framework);
        }
    }
    render() {
        return (index.h("div", { key: 'f724e2ff30c8851fd5b0b684f8bf8085d26a0a36', class: `tree-view ${this.disableAllItems ? " tree-view--disabled" : ""}`, role: "tree", "aria-label": this.ariaLabel }, this.label && this.label.trim() !== "" && (index.h("div", { key: '7ee3289331eab5dbd86c997f1f381b04f29f51da', class: "tree-view__label" }, this.label)), index.h("slot", { key: 'a73b5ad17a5b95edd714a931520046abeb525509', ref: this.handleSlotRef })));
    }
    static get watchers() { return {
        "expandAllItems": [{
                "handleExpandAllItemsChange": 0
            }],
        "disableAllItems": [{
                "handleDisableAllItemsChange": 0
            }]
    }; }
};
TreeView.style = treeViewCss();

exports.ifx_tree_view = TreeView;
//# sourceMappingURL=ifx-tree-view.entry.cjs.js.map

//# sourceMappingURL=ifx-tree-view.cjs.entry.js.map