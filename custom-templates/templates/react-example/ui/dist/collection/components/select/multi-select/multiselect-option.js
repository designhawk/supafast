import { Host, h, } from "@stencil/core";
export class MultiselectOption {
    el;
    value;
    selected = false;
    disabled = false;
    indeterminate = false;
    isExpanded = false;
    hasChildren = false;
    depth = 0;
    searchTerm = "";
    isSearchActive = false;
    isSearchDisabled = false;
    componentWillLoad() {
        this.hasChildren = this.el.children.length > 0;
        this.depth = this.calculateDepth();
        this.el.setAttribute("data-level", this.depth.toString());
        if (this.hasChildren) {
            const hasSelectedChildren = this.hasAnySelectedChildren();
            if (hasSelectedChildren) {
                this.isExpanded = true;
            }
        }
    }
    componentDidLoad() {
        this.el['__stencil_instance'] = this;
        this.notifyMultiselect();
        this.el.addEventListener('ifx-search-filter', this.handleSearchFilter);
    }
    disconnectedCallback() {
        this.el.removeEventListener("ifx-search-filter", this.handleSearchFilter);
    }
    handleSearchFilter = (event) => {
        const { searchTerm, isActive } = event.detail;
        this.searchTerm = searchTerm.toLowerCase();
        this.isSearchActive = isActive;
        requestAnimationFrame(() => {
            this.updateSearchClasses();
        });
    };
    updateSearchClasses() {
        const optionDiv = this.el.shadowRoot?.querySelector(".option");
        if (!optionDiv)
            return;
        if (!this.isSearchActive) {
            optionDiv.classList.remove("search-hidden", "search-parent", "search-match");
            this.removeHighlighting();
            this.isSearchDisabled = false;
            return;
        }
        const textContent = this.getTextContent().toLowerCase();
        const matchesSearch = textContent.includes(this.searchTerm);
        const hasMatchingParent = this.hasMatchingParent();
        requestAnimationFrame(() => {
            const hasMatchingChildren = this.hasMatchingChildren();
            optionDiv.classList.remove("search-hidden", "search-parent", "search-match");
            this.isSearchDisabled = false;
            if (matchesSearch && !this.hasChildren) {
                optionDiv.classList.add("search-match");
                this.highlightSearchTerm();
            }
            else if (matchesSearch && this.hasChildren) {
                optionDiv.classList.add("search-match");
                this.highlightSearchTerm();
                this.isExpanded = true;
            }
            else if (!matchesSearch && this.hasChildren && hasMatchingChildren) {
                optionDiv.classList.add("search-parent");
                this.removeHighlighting();
                this.isExpanded = true;
                this.isSearchDisabled = true;
            }
            else if (hasMatchingParent) {
                optionDiv.classList.add("search-match");
                this.removeHighlighting();
            }
            else {
                optionDiv.classList.add("search-hidden");
                this.removeHighlighting();
            }
        });
    }
    highlightSearchTerm() {
        if (!this.searchTerm)
            return;
        const labelElement = this.el.shadowRoot?.querySelector(".option-label");
        if (!labelElement)
            return;
        const slotElement = labelElement.querySelector("slot");
        if (!slotElement)
            return;
        this.removeHighlighting();
        const originalText = this.getTextContent();
        const searchTermLower = this.searchTerm.toLowerCase();
        const originalTextLower = originalText.toLowerCase();
        if (!originalTextLower.includes(searchTermLower))
            return;
        const searchIndex = originalTextLower.indexOf(searchTermLower);
        if (searchIndex === -1)
            return;
        const beforeMatch = originalText.substring(0, searchIndex);
        const matchText = originalText.substring(searchIndex, searchIndex + searchTermLower.length);
        const afterMatch = originalText.substring(searchIndex + searchTermLower.length);
        const highlightedContent = document.createElement("span");
        highlightedContent.className = "highlighted-text";
        if (beforeMatch) {
            highlightedContent.appendChild(document.createTextNode(beforeMatch));
        }
        const boldElement = document.createElement("strong");
        boldElement.className = "search-highlight";
        boldElement.textContent = matchText;
        highlightedContent.appendChild(boldElement);
        if (afterMatch) {
            highlightedContent.appendChild(document.createTextNode(afterMatch));
        }
        labelElement.setAttribute("data-original-content", "true");
        slotElement.style.display = "none";
        labelElement.appendChild(highlightedContent);
    }
    removeHighlighting() {
        const labelElement = this.el.shadowRoot?.querySelector(".option-label");
        if (!labelElement)
            return;
        const slotElement = labelElement.querySelector("slot");
        const highlightedElement = labelElement.querySelector(".highlighted-text");
        if (highlightedElement) {
            labelElement.removeChild(highlightedElement);
        }
        if (slotElement) {
            slotElement.style.display = "";
        }
        labelElement.removeAttribute("data-original-content");
    }
    getTextContent() {
        let text = "";
        Array.from(this.el.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent?.trim() || "";
            }
        });
        return text || this.value || "";
    }
    hasMatchingChildren() {
        if (!this.hasChildren)
            return false;
        const childOptions = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return childOptions.some((child) => {
            const childInstance = child["__stencil_instance"];
            if (!childInstance)
                return false;
            const childText = childInstance.getTextContent().toLowerCase();
            const childMatches = childText.includes(this.searchTerm);
            const grandChildrenMatch = childInstance.hasMatchingChildren();
            return childMatches || grandChildrenMatch;
        });
    }
    hasMatchingParent() {
        let parent = this.el.parentElement;
        while (parent && parent.tagName === "IFX-MULTISELECT-OPTION") {
            const parentInstance = parent["__stencil_instance"];
            if (parentInstance) {
                const parentText = parentInstance.getTextContent().toLowerCase();
                if (parentText.includes(this.searchTerm)) {
                    return true;
                }
            }
            parent = parent.parentElement;
        }
        return false;
    }
    calculateDepth() {
        let depth = 0;
        let parent = this.el.parentElement;
        while (parent && parent.tagName !== "IFX-MULTISELECT") {
            if (parent.tagName === "IFX-MULTISELECT-OPTION") {
                depth++;
            }
            parent = parent.parentElement;
        }
        return depth;
    }
    handleClick(event) {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        event.stopPropagation();
        if (event.type === "click" &&
            event.target.closest(".chevron-wrapper")) {
            this.toggleExpansion();
            return;
        }
        let newSelectedState;
        if (this.indeterminate) {
            newSelectedState = true;
        }
        else {
            newSelectedState = !this.selected;
        }
        this.selected = newSelectedState;
        this.indeterminate = false;
        if (this.hasChildren) {
            this.isExpanded = newSelectedState;
            requestAnimationFrame(() => {
                this.selectAllChildren(newSelectedState);
                this.expandAllChildren(newSelectedState);
            });
        }
        this.updateParentStates();
        this.notifyMultiselect();
    }
    handleKeyDown(event) {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        const target = event.target;
        if (target.closest(".chevron-wrapper") ||
            target.closest(".checkbox-wrapper")) {
            return;
        }
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
            event.stopPropagation();
        }
        if (event.key === "ArrowRight" && this.hasChildren) {
            this.isExpanded = true;
        }
        if (event.key === "ArrowLeft" && this.hasChildren) {
            this.isExpanded = false;
        }
    }
    notifyMultiselect() {
        const updateEvent = new CustomEvent("ifx-option-changed", {
            bubbles: true,
            detail: {
                value: this.value,
                selected: this.selected,
                indeterminate: this.indeterminate,
            },
        });
        this.el.dispatchEvent(updateEvent);
    }
    selectAllChildren(selected) {
        const directChildren = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        directChildren.forEach((child) => {
            const childInstance = child["__stencil_instance"];
            if (childInstance) {
                childInstance.selected = selected;
                childInstance.indeterminate = false;
                if (childInstance.hasChildren) {
                    childInstance.isExpanded = selected;
                    childInstance.selectAllChildren(selected);
                }
                childInstance.notifyMultiselect?.();
            }
        });
    }
    expandAllChildren(expanded) {
        const directChildren = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        directChildren.forEach((child) => {
            const childInstance = child["__stencil_instance"];
            if (childInstance && childInstance.hasChildren) {
                childInstance.isExpanded = expanded;
                childInstance.expandAllChildren(expanded);
            }
        });
    }
    updateParentStates() {
        let parent = this.el.parentElement;
        while (parent && parent.tagName === "IFX-MULTISELECT-OPTION") {
            const parentInstance = parent["__stencil_instance"];
            if (!parentInstance) {
                parent = parent.parentElement;
                continue;
            }
            const siblings = Array.from(parent.children)
                .filter((child) => child.tagName === "IFX-MULTISELECT-OPTION")
                .map((child) => child["__stencil_instance"])
                .filter((instance) => instance !== null);
            const selectedCount = siblings.filter((sibling) => sibling.selected).length;
            const indeterminateCount = siblings.filter((sibling) => sibling.indeterminate).length;
            const totalCount = siblings.length;
            if (selectedCount === totalCount && indeterminateCount === 0) {
                parentInstance.selected = true;
                parentInstance.indeterminate = false;
            }
            else if (selectedCount === 0 && indeterminateCount === 0) {
                parentInstance.selected = false;
                parentInstance.indeterminate = false;
            }
            else {
                parentInstance.selected = false;
                parentInstance.indeterminate = true;
            }
            parentInstance.notifyMultiselect?.();
            parent = parent.parentElement;
        }
    }
    toggleExpansion() {
        this.isExpanded = !this.isExpanded;
    }
    handleCheckboxClick = (event) => {
        if (this.disabled || (this.isSearchActive && this.isSearchDisabled))
            return;
        event.stopPropagation();
        let newSelectedState;
        if (this.indeterminate) {
            newSelectedState = true;
        }
        else {
            newSelectedState = !this.selected;
        }
        this.selected = newSelectedState;
        this.indeterminate = false;
        if (this.hasChildren) {
            this.isExpanded = newSelectedState;
            requestAnimationFrame(() => {
                this.selectAllChildren(newSelectedState);
                this.expandAllChildren(newSelectedState);
            });
        }
        this.updateParentStates();
        this.notifyMultiselect();
    };
    handleHeaderClick = (event) => {
        event.stopPropagation();
        if (!this.disabled && !(this.isSearchActive && this.isSearchDisabled)) {
            this.handleClick(event);
        }
    };
    hasAnySelectedChildren() {
        const childOptions = Array.from(this.el.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return childOptions.some((child) => {
            const hasSelected = child.hasAttribute("selected");
            const hasSelectedDescendants = this.checkForSelectedDescendants(child);
            return hasSelected || hasSelectedDescendants;
        });
    }
    checkForSelectedDescendants(element) {
        const nestedOptions = Array.from(element.children).filter((child) => child.tagName === "IFX-MULTISELECT-OPTION");
        return nestedOptions.some((nestedChild) => {
            const isSelected = nestedChild.hasAttribute("selected");
            const hasSelectedNested = this.checkForSelectedDescendants(nestedChild);
            return isSelected || hasSelectedNested;
        });
    }
    render() {
        let isFlatMultiselect = false;
        const parentMultiselect = this.el.closest("ifx-multiselect");
        if (parentMultiselect) {
            const allOptions = Array.from(parentMultiselect.querySelectorAll("ifx-multiselect-option"));
            isFlatMultiselect = allOptions.every((option) => option.children.length === 0);
        }
        const basePadding = this.depth * 28 + 16;
        const additionalPadding = this.hasChildren ? 0 : 28;
        const totalPadding = basePadding + additionalPadding;
        const optionItemStyle = isFlatMultiselect
            ? undefined
            : { paddingLeft: `${totalPadding}px` };
        return (h(Host, { key: '02456f3eb7c3cb9a43bbed255d0c4f8f7773e637' }, h("div", { key: '4496cbfb613844d6643ad8796777b55d4ac06dbd', class: {
                option: true,
                "option--has-children": this.hasChildren,
                "option--expanded": this.isExpanded,
                "option--disabled": this.disabled,
                "option--selected": this.selected,
            }, role: "option", "aria-expanded": this.hasChildren ? (this.isExpanded ? "true" : "false") : undefined, "aria-selected": this.selected ? "true" : "false", "aria-disabled": this.disabled ? "true" : "false", "data-level": this.depth, "data-value": this.value }, h("div", { key: '355abb8b4e86fb26b5cf8a878e6c15a70d97b9ae', class: "option-item", style: optionItemStyle }, h("div", { key: 'f9623e8ee76f8cee3679b6aaecf130d988e20c9d', class: "chevron-wrapper", tabIndex: this.hasChildren ? 0 : -1, role: this.hasChildren ? "button" : undefined, "aria-label": this.hasChildren
                ? this.isExpanded
                    ? "Collapse"
                    : "Expand"
                : undefined, onClick: (e) => {
                e.stopPropagation();
                this.toggleExpansion();
            }, onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleExpansion();
                }
            } }, this.hasChildren && (h("ifx-icon", { key: 'd7bb92cbc69bd4ac5f2ce0062070f7b62cf0f0c0', class: `chevron ${this.isExpanded ? "chevron--expanded" : "chevron--collapsed"}`, icon: "chevron-right-16" }))), h("div", { key: 'b2abd3d5eb547cd544606b5885e6e93445d5c7ae', class: "checkbox-wrapper", onClick: (e) => e.stopPropagation() }, h("ifx-checkbox", { key: 'ea0c810dc4813cebdb993e413b9d9516e0c79618', size: "s", checked: this.isSearchActive && this.isSearchDisabled
                ? false
                : this.indeterminate
                    ? false
                    : this.selected, indeterminate: this.isSearchActive && this.isSearchDisabled
                ? false
                : this.indeterminate, onClick: this.handleCheckboxClick, disabled: this.disabled ||
                (this.isSearchActive && this.isSearchDisabled), onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleCheckboxClick(e);
                }
            } })), h("div", { key: '95d76f425080089e93fec232bc984b12dd7a1273', class: "option-label", onClick: this.handleHeaderClick, tabIndex: -1 }, h("slot", { key: 'd4b55c67d8f31bd8b6dfc4756c1eaa7367b183fd' }))), this.isExpanded && (h("div", { key: '4765b74ea8288daf72b6b0f0ce1ecf986f2a0a65', class: "option-children" }, h("slot", { key: '75ca13e8068d2f6d2642d44e2f9220a2431b1d41', name: "children" }))))));
    }
    static get is() { return "ifx-multiselect-option"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["multiselect-option.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["multiselect-option.css"]
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
                "attribute": "value"
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
            },
            "disabled": {
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
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "indeterminate": {
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
                "attribute": "indeterminate",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "isExpanded": {},
            "hasChildren": {},
            "depth": {},
            "searchTerm": {},
            "isSearchActive": {},
            "isSearchDisabled": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "click",
                "method": "handleClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=multiselect-option.js.map
