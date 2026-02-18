import { r as registerInstance, c as createEvent, a as getElement, h, F as Fragment } from './index-CA_siwAQ.js';

const treeViewItemCss = () => `.tree-item{position:relative;cursor:pointer;list-style:none}.tree-item.tree-item--expanded{position:relative}.tree-item.tree-item--has-children{position:relative}.tree-item.tree-item--has-children .tree-item__header>.tree-item__chevron-container{display:flex}.tree-item.tree-item--has-children.tree-item--expanded .tree-item__header>.tree-item__chevron-container::after{display:block}.tree-item--disabled{cursor:not-allowed;pointer-events:none;color:#BFBBBB}.tree-item__content{display:flex;flex-direction:row}.tree-item__content:hover .tree-item__checkbox-container,.tree-item__content:hover .tree-item__header{background-color:#F7F7F7}.tree-item__checkbox-container{position:sticky;left:0;z-index:10;padding:4px;background-color:#FFFFFF}.tree-item__header{flex-grow:1;display:flex;align-items:center;white-space:nowrap;height:20px;padding-top:4px;padding-right:16px;padding-bottom:4px;padding-left:8px}.tree-item__chevron-container{display:none;align-items:center;margin-right:8px;height:20px}.tree-item__chevron-container::after{--height-line-start:28px;display:none;content:"";position:absolute;z-index:1;top:var(--height-line-start);left:auto;margin-left:8px;width:1px;height:calc(100% - var(--height-line-start));background-color:#EEEDED}.tree-item--disabled .tree-item__chevron-container::after{color:#EEEDED}.tree-item__chevron.chevron-down{transform:rotate(90deg)}.tree-item__chevron.chevron-right{transform:rotate(0)}.tree-item__label-icon-container{display:flex;align-items:center}.tree-item__label-icon-container:focus{outline:none}.tree-item__label-icon-container:focus-visible{outline:2px solid #0A8276;outline-offset:2px;border-radius:1px}.tree-item__icon-container{position:relative;width:16px;height:16px}.tree-item__icon-container ifx-icon{position:absolute;left:0;top:0;opacity:1;transition:opacity 0.2s ease-in-out}.tree-item__icon-container ifx-icon.icon--hidden{opacity:0}.tree-item__label{padding-left:8px}.tree-item__children{display:none}.tree-item[aria-expanded=true]>.tree-item__children{display:block}`;

const TreeViewItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxTreeViewItemExpandChange = createEvent(this, "ifxTreeViewItemExpandChange", 7);
        this.ifxTreeViewItemCheckChange = createEvent(this, "ifxTreeViewItemCheckChange", 7);
        this.ifxTreeViewItemDisableChange = createEvent(this, "ifxTreeViewItemDisableChange", 7);
    }
    get host() { return getElement(this); }
    expanded = false;
    initiallyExpanded = false;
    disableItem = false;
    ariaLabel;
    initiallySelected = false;
    value;
    ifxTreeViewItemExpandChange;
    ifxTreeViewItemCheckChange;
    ifxTreeViewItemDisableChange;
    hasChildren = false;
    isChecked = false;
    partialChecked = false;
    level = 0;
    disableAllItems = false;
    expandAllItems = false;
    suppressExpandEvents = false;
    get disabled() {
        return this.disableAllItems || this.disableItem;
    }
    get isExpanded() {
        return this.expandAllItems || this.expanded;
    }
    findChildren = () => Array.from(this.host.children).filter((child) => child instanceof HTMLElement && child.tagName === "IFX-TREE-VIEW-ITEM");
    calculateNodeLevel = () => {
        let level = 0, parent = this.host.parentElement;
        while (parent) {
            if (parent.tagName === "IFX-TREE-VIEW-ITEM")
                level++;
            parent = parent.parentElement;
        }
        return level;
    };
    componentWillLoad() {
        this.expanded = this.initiallyExpanded;
        this.hasChildren = this.findChildren().length > 0;
        this.level = this.calculateNodeLevel();
        this.host.setAttribute("data-level", this.level.toString());
        this.isChecked = this.initiallySelected;
        this.host.addEventListener("internal-check-state-change", this.handleStateChange);
    }
    componentDidLoad() {
        this.observeParentAttribute("disable-all-items", (val) => (this.disableAllItems = val));
        this.observeParentAttribute("data-expand-all-items", (val) => (this.expandAllItems = val), true);
        if (this.shouldExpandFromParent())
            this.expandAllDescendants();
        this.host["__stencil_instance"] = this;
        if (this.initiallySelected)
            setTimeout(() => this.updateParentState(), 0);
    }
    observeParentAttribute(attr, cb, breakOnAttr = false) {
        let parent = this.host.parentElement;
        while (parent) {
            if (parent.tagName === "IFX-TREE-VIEW" ||
                (breakOnAttr && parent.hasAttribute(attr))) {
                const observer = new MutationObserver(() => cb(parent.hasAttribute(attr)));
                observer.observe(parent, { attributes: true });
                cb(parent.hasAttribute(attr));
                break;
            }
            parent = parent.parentElement;
        }
    }
    shouldExpandFromParent() {
        let parent = this.host.parentElement;
        while (parent) {
            if (parent.tagName === "IFX-TREE-VIEW" &&
                (parent.hasAttribute("expand-all-items") ||
                    parent.hasAttribute("data-expand-all-items")))
                return true;
            parent = parent.parentElement;
        }
        return false;
    }
    expandAllDescendants() {
        this.expanded = true;
        this.findChildren().forEach((child) => {
            child.expanded = true;
            child.expandAllDescendants?.();
        });
    }
    handleStateChange = (event) => {
        if (this.disabled)
            return;
        event.stopPropagation();
        this.updateCheckState(event.detail.checked);
    };
    handleCheckboxChange = (event) => {
        if (this.disabled)
            return;
        this.updateCheckState(event.detail?.checked ?? !this.isChecked);
    };
    handleHeaderClick = ({ target }) => {
        if (this.disabled)
            return;
        if (!target.closest(".tree-item__checkbox-container, .tree-item__chevron-container")) {
            if (this.hasChildren) {
                const newCheckedState = !this.isChecked;
                this.updateCheckState(newCheckedState);
                const affectedItems = newCheckedState
                    ? this.expandOrCollapseAllDescendants(true)
                    : this.expandOrCollapseAllDescendants(false);
                this.ifxTreeViewItemExpandChange.emit({
                    expanded: newCheckedState,
                    affectedItems,
                    component: this,
                });
            }
            else {
                this.updateCheckState(!this.isChecked);
            }
        }
    };
    expandOrCollapseAllDescendants(expand) {
        this.suppressExpandEvents = true;
        const affectedItems = [];
        this.expanded = expand;
        if (this.hasChildren)
            affectedItems.push({ expanded: expand, value: this.value });
        this.findChildren().forEach((child) => {
            const childInstance = child["__stencil_instance"];
            if (childInstance && childInstance.hasChildren) {
                childInstance.suppressExpandEvents = true;
                childInstance.expanded = expand;
                affectedItems.push({ expanded: expand, value: childInstance.value });
                if (childInstance.hasChildren) {
                    const childAffected = childInstance.expandOrCollapseAllDescendants(expand);
                    affectedItems.push(...childAffected);
                }
            }
        });
        this.suppressExpandEvents = false;
        return affectedItems;
    }
    async updateCheckState(checked, fromParent = false) {
        if (this.disabled)
            return;
        if (!fromParent && this.hasChildren) {
            const affected = this.collectDescendantStates(checked);
            this.setNodeState({ isChecked: checked, partialChecked: false }, false);
            await this.updateChildrenSilently(checked);
            this.ifxTreeViewItemCheckChange.emit({
                checked,
                indeterminate: false,
                value: this.value,
                affectedChildItems: affected,
                component: this,
            });
            this.updateParentState();
        }
        else if (fromParent) {
            this.setNodeState({ isChecked: checked, partialChecked: false }, false);
        }
        else {
            this.setNodeState({ isChecked: checked, partialChecked: false });
            await this.updateChildrenState(checked);
            this.updateParentState();
        }
    }
    async updateChildrenSilently(checked) {
        for (const child of this.findChildren()) {
            const childInstance = child["__stencil_instance"];
            if (childInstance && !childInstance.disabled) {
                childInstance.setNodeState({ isChecked: checked, partialChecked: false }, false);
                await childInstance.updateChildrenSilently(checked);
            }
        }
    }
    handleExpandedChange(newValue) {
        if (!this.suppressExpandEvents) {
            this.ifxTreeViewItemExpandChange.emit({
                expanded: newValue,
                value: this.value,
                affectedItems: [{ expanded: newValue, value: this.value }],
                component: this,
            });
        }
    }
    handleDisableItemChange(newValue) {
        this.ifxTreeViewItemDisableChange.emit({
            disabled: newValue,
            component: this,
        });
    }
    setNodeState(state, emitEvent = true) {
        this.isChecked = state.isChecked;
        this.partialChecked = state.partialChecked;
        if (emitEvent) {
            this.ifxTreeViewItemCheckChange.emit({
                checked: this.isChecked,
                indeterminate: this.partialChecked,
                value: this.value,
                level: this.level,
                disabled: this.disabled,
                component: this,
            });
        }
    }
    collectDescendantStates(checked) {
        const descendants = [];
        const collect = (el, skipSelf = false) => {
            const instance = el === this.host ? this : el["__stencil_instance"];
            if (!skipSelf && !instance?.disabled) {
                descendants.push({
                    checked,
                    indeterminate: false,
                    value: instance?.value,
                });
            }
            Array.from(el.children).forEach((child) => {
                if (child.tagName === "IFX-TREE-VIEW-ITEM")
                    collect(child, false);
            });
        };
        Array.from(this.host.children).forEach((child) => {
            if (child.tagName === "IFX-TREE-VIEW-ITEM")
                collect(child, false);
        });
        return descendants;
    }
    async updateChildrenState(checked) {
        for (const child of this.findChildren()) {
            const childInstance = child["__stencil_instance"];
            if (childInstance && !childInstance.disabled) {
                await child.componentOnReady();
                child.dispatchEvent(new CustomEvent("internal-check-state-change", {
                    detail: { checked },
                    bubbles: false,
                    composed: true,
                }));
            }
        }
    }
    findSiblingNodes(parent) {
        return Array.from(parent.children).filter((child) => child instanceof HTMLElement && child.tagName === "IFX-TREE-VIEW-ITEM");
    }
    updateParentState() {
        const parent = this.host.parentElement?.closest("ifx-tree-view-item");
        if (!parent)
            return;
        setTimeout(() => {
            const parentInstance = parent["__stencil_instance"];
            if (!parentInstance)
                return;
            const siblings = this.findSiblingNodes(parent);
            const { allChecked, someChecked } = this.calculateSiblingStates(siblings);
            parentInstance.setNodeState({
                isChecked: allChecked,
                partialChecked: !allChecked && someChecked,
            }, false);
            parentInstance.updateParentState();
        }, 0);
    }
    calculateSiblingStates(siblings) {
        const states = siblings.map((sib) => {
            const instance = sib["__stencil_instance"];
            return {
                checked: instance?.isChecked,
                partial: instance?.partialChecked,
            };
        });
        const checkedCount = states.filter((state) => state.checked).length;
        const partialCount = states.filter((state) => state.partial).length;
        return {
            allChecked: states.length > 0 &&
                checkedCount === states.length &&
                partialCount === 0,
            someChecked: checkedCount > 0 || partialCount > 0,
        };
    }
    toggleExpand = () => {
        if (this.disabled || !this.hasChildren)
            return;
        this.expanded = !this.expanded;
    };
    handleKeyDown = (event) => {
        const allItems = Array.from(this.host
            .closest("ifx-tree-view")
            ?.querySelectorAll("ifx-tree-view-item") || []);
        const visibleItems = allItems.filter((item) => {
            let parent = item.parentElement?.closest("ifx-tree-view-item");
            while (parent) {
                const parentCmp = parent;
                if (!(parentCmp.expandAllItems || parentCmp.expanded))
                    return false;
                parent = parent.parentElement?.closest("ifx-tree-view-item");
            }
            return true;
        });
        const currentIndex = visibleItems.findIndex((el) => el === this.host);
        const focusLabelIcon = (el) => el?.focus();
        switch (event.key) {
            case "ArrowDown": {
                event.preventDefault();
                for (let i = currentIndex + 1; i < visibleItems.length; i++) {
                    const next = visibleItems[i];
                    if (!next.disabled) {
                        focusLabelIcon(next.shadowRoot?.querySelector(".tree-item__label-icon-container"));
                        break;
                    }
                }
                break;
            }
            case "ArrowUp": {
                event.preventDefault();
                for (let i = currentIndex - 1; i >= 0; i--) {
                    const prev = visibleItems[i];
                    if (!prev.disabled) {
                        focusLabelIcon(prev.shadowRoot?.querySelector(".tree-item__label-icon-container"));
                        break;
                    }
                }
                break;
            }
            case "ArrowRight": {
                event.preventDefault();
                if (!this.isExpanded && this.hasChildren) {
                    this.expanded = true;
                }
                else if (this.isExpanded && this.hasChildren) {
                    const firstChild = this.host.querySelector("ifx-tree-view-item");
                    if (firstChild && !firstChild.disabled) {
                        focusLabelIcon(firstChild.shadowRoot?.querySelector(".tree-item__label-icon-container"));
                    }
                }
                break;
            }
            case "ArrowLeft": {
                event.preventDefault();
                if (this.isExpanded && this.hasChildren) {
                    this.expanded = false;
                }
                else {
                    const parent = this.host.parentElement?.closest("ifx-tree-view-item");
                    if (parent && !parent.disabled) {
                        focusLabelIcon(parent.shadowRoot?.querySelector(".tree-item__label-icon-container"));
                    }
                }
                break;
            }
            case " ":
            case "Enter": {
                event.preventDefault();
                if (this.hasChildren) {
                    const newCheckedState = !this.isChecked;
                    this.updateCheckState(newCheckedState);
                    const affectedItems = newCheckedState
                        ? this.expandOrCollapseAllDescendants(true)
                        : this.expandOrCollapseAllDescendants(false);
                    this.ifxTreeViewItemExpandChange.emit({
                        expanded: newCheckedState,
                        affectedItems,
                        component: this,
                    });
                }
                else {
                    this.updateCheckState(!this.isChecked);
                }
                break;
            }
        }
    };
    render() {
        return (h("div", { key: '9aab415f6363cfb42b27ec64372dbc10ba564f58', class: {
                "tree-item": true,
                "tree-item--expanded": this.isExpanded,
                "tree-item--has-children": this.hasChildren,
                "tree-item--disabled": this.disabled,
            }, role: "treeitem", "aria-expanded": this.isExpanded ? "true" : "false", "data-level": this.level, "aria-disabled": this.disabled ? "true" : undefined, "aria-label": this.ariaLabel }, h("div", { key: '54e902025588fc30671623a3246ad25079f2b471', class: "tree-item__content" }, h("div", { key: '9d82af8b1e9027bbe6f4b73f109cec013ed4babd', class: "tree-item__checkbox-container", onClick: (e) => e.stopPropagation() }, h("ifx-checkbox", { key: 'a7fc71f1eb2dbb30e6e9df5f99b253299842cfd1', size: "s", checked: this.partialChecked ? false : this.isChecked, indeterminate: this.partialChecked, onIfxChange: this.handleCheckboxChange, disabled: this.disabled })), h("div", { key: '700ecdb65e20732a4fe0a30cf05fd9207f884559', class: "tree-item__header", style: { paddingLeft: `${this.level * 24 + 10}px` }, onClick: this.handleHeaderClick, tabIndex: -1, "aria-disabled": this.disabled ? "true" : undefined }, this.hasChildren && (h("div", { key: '1b6ed42b76033f14324db742ec7b1d2760873375', class: "tree-item__chevron-container", onClick: this.toggleExpand }, h("ifx-icon", { key: 'ec03dae18d7941443336d20f4d0c0a4dbbb54938', class: `tree-item__chevron ${this.isExpanded ? "chevron-down" : "chevron-right"}`, icon: "chevron-right-16" }), h("div", { key: '05979928988b2e43f7b572172147bf62129806d3', class: "tree-item__line" }))), h("div", { key: 'd5e85a32ba4de10152cec452fc5da951f52ef28d', class: "tree-item__label-icon-container", tabIndex: this.disabled ? -1 : 0, onKeyDown: this.handleKeyDown }, h("div", { key: '33221ccadd075833dbe60fe8030e9cf471c0828b', class: "tree-item__icon-container" }, this.hasChildren ? (h(Fragment, null, h("ifx-icon", { class: { "icon--hidden": this.isExpanded }, icon: "folder-16" }), h("ifx-icon", { class: { "icon--hidden": !this.isExpanded }, icon: "folder-open-16" }))) : (h("ifx-icon", { icon: "file-16" }))), h("span", { key: 'b485fedddd71dad05ee86264c9bf4ba13f29f8a0', class: "tree-item__label" }, h("slot", { key: '6f51f9308f910d7291b5797af8195b48b2d1b1a5' }))))), this.isExpanded && (h("div", { key: 'e1b4fec8f6de6e2e1abddc2da76e01dacd7eb928', class: "tree-item__children" }, h("slot", { key: 'd193d748313f2fbcbfdbd943c20935aeec3a4a70', name: "children" })))));
    }
    static get watchers() { return {
        "expanded": [{
                "handleExpandedChange": 0
            }],
        "disableItem": [{
                "handleDisableItemChange": 0
            }]
    }; }
};
TreeViewItem.style = treeViewItemCss();

export { TreeViewItem as ifx_tree_view_item };
//# sourceMappingURL=ifx-tree-view-item.entry.js.map

//# sourceMappingURL=ifx-tree-view-item.entry.js.map