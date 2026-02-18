'use strict';

var index = require('./index-BfM4jcLt.js');
var index$1 = require('./index-Bp6Dd2i1.js');

const actionListItemCss = () => `.action-list-item{display:flex;align-items:center;padding:8px 16px;background:#FFFFFF;transition:background-color 0.2s ease;cursor:default}.action-list-item--clickable{cursor:pointer}.action-list-item--clickable:hover:not(.action-list-item--disabled){background:#F7F7F7}.action-list-item--clickable:focus:not(.action-list-item--disabled){outline:none;background:#F7F7F7}.action-list-item--clickable:active:not(.action-list-item--disabled){background:#EEEDED}.action-list-item--disabled ::slotted(ifx-icon){color:#BFBBBB}.action-list-item--disabled ::slotted(*) ifx-icon{color:#BFBBBB}.action-list-item__leading{display:flex;align-items:center;justify-content:center;margin-right:16px;flex-shrink:0}.action-list-item__content{flex:1;min-width:0}.action-list-item__title{font-weight:600;font-size:1rem;line-height:1.5rem;color:#1D1D1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.action-list-item--disabled .action-list-item__title{color:#BFBBBB}.action-list-item__description{font-size:0.875rem;line-height:1.25rem;color:#575352;margin-top:2px}.action-list-item--disabled .action-list-item__description{color:#BFBBBB}.action-list-item__trailing{display:flex;align-items:center;justify-content:center;margin-left:16px;flex-shrink:0;gap:16px}`;

const ActionListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxActionListItemClick = index.createEvent(this, "ifxActionListItemClick", 7);
    }
    get host() { return index.getElement(this); }
    /**
     * The title text displayed in the item
     */
    itemTitle;
    /**
     * The description text displayed below the title
     */
    description;
    /**
     * Value associated with this item
     */
    value;
    /**
     * URL to navigate to when item is clicked
     */
    href;
    /**
     * Target for the link navigation
     * @default '_self'
     */
    target = "_self";
    /**
     * Controls whether the item is disabled
     * @default false
     */
    disabled = false;
    /**
     * Aria label for accessibility support
     */
    itemAriaLabel;
    /**
     * Event emitted when the main item area is clicked
     */
    ifxActionListItemClick;
    onDisabledChange() {
        // Update interactive elements when disabled state changes
        this.updateSlotElementsDisabledState();
    }
    handleMainClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // Check if clicked element is inside leading or trailing areas
        const leadingElement = this.host.shadowRoot?.querySelector(".action-list-item__leading");
        const trailingElement = this.host.shadowRoot?.querySelector(".action-list-item__trailing");
        if (leadingElement?.contains(event.target) ||
            trailingElement?.contains(event.target)) {
            return; // Don't trigger main click if clicking on leading/trailing areas
        }
        // Always emit main event when clicking on content area (text), regardless of interactive elements
        this.ifxActionListItemClick.emit({
            value: this.value,
            href: this.href,
            target: this.target,
            component: this,
        });
        // If href is provided, automatically navigate (Link mode)
        // If no href is provided, only the event is emitted (Event mode)
        if (this.href) {
            if (this.target === "_blank") {
                window.open(this.href, this.target);
            }
            else {
                window.location.href = this.href;
            }
        }
    };
    handleLeadingClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const target = event.target;
        // Check if the clicked element or any of its parents is an interactive component
        let currentElement = target;
        while (currentElement && currentElement !== this.host) {
            if (this.isInteractiveElement(currentElement)) {
                // Interactive element clicked - stop propagation to prevent main event
                event.stopPropagation();
                return;
            }
            currentElement = currentElement.parentElement;
        }
        // Non-interactive element clicked - trigger main action
        event.stopPropagation();
        this.ifxActionListItemClick.emit({
            value: this.value,
            href: this.href,
            target: this.target,
            component: this,
        });
        // If href is provided, automatically navigate
        if (this.href) {
            if (this.target === "_blank") {
                window.open(this.href, this.target);
            }
            else {
                window.location.href = this.href;
            }
        }
    };
    handleTrailingClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const target = event.target;
        // Check if the clicked element or any of its parents is an interactive component
        let currentElement = target;
        while (currentElement && currentElement !== this.host) {
            if (this.isInteractiveElement(currentElement)) {
                // Interactive element clicked - stop propagation to prevent main event
                event.stopPropagation();
                return;
            }
            currentElement = currentElement.parentElement;
        }
        // Non-interactive element clicked - trigger main action
        event.stopPropagation();
        this.ifxActionListItemClick.emit({
            value: this.value,
            href: this.href,
            target: this.target,
            component: this,
        });
        // If href is provided, automatically navigate
        if (this.href) {
            if (this.target === "_blank") {
                window.open(this.href, this.target);
            }
            else {
                window.location.href = this.href;
            }
        }
    };
    isInteractiveElement = (element) => {
        // Get the tag name, handling both custom elements and standard HTML
        const tagName = element.tagName.toUpperCase();
        // List of Infineon components that should block main event
        const interactiveInfineonComponents = [
            "IFX-BUTTON",
            "IFX-CHECKBOX",
            "IFX-SWITCH",
        ];
        // Check if it's an interactive Infineon component
        return interactiveInfineonComponents.includes(tagName);
    };
    handleMainKeyDown = (event) => {
        if (this.disabled)
            return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            // Always trigger main action via keyboard, regardless of interactive elements
            this.handleMainClick(event);
        }
    };
    handleLeadingKeyDown = (event) => {
        if (this.disabled)
            return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const leadingSlot = this.host.shadowRoot?.querySelector('slot[name="leading"]');
            const assignedElements = leadingSlot?.assignedElements() || [];
            // Find first interactive element and activate it
            const firstInteractive = assignedElements.find((el) => this.isInteractiveElement(el));
            if (firstInteractive) {
                firstInteractive.focus();
                firstInteractive.click();
            }
        }
    };
    handleTrailingKeyDown = (event) => {
        if (this.disabled)
            return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const trailingSlot = this.host.shadowRoot?.querySelector('slot[name="trailing"]');
            const assignedElements = trailingSlot?.assignedElements() || [];
            // Find first interactive element and activate it
            const firstInteractive = assignedElements.find((el) => this.isInteractiveElement(el));
            if (firstInteractive) {
                firstInteractive.focus();
                firstInteractive.click();
            }
        }
    };
    hasSlotContent(slotName) {
        const slot = this.host.querySelector(`[slot="${slotName}"]`);
        return !!slot;
    }
    componentDidLoad() {
        // Apply disabled state to interactive elements in slots
        this.updateSlotElementsDisabledState();
    }
    componentDidUpdate() {
        // Apply disabled state to interactive elements in slots when disabled prop changes
        this.updateSlotElementsDisabledState();
    }
    updateSlotElementsDisabledState = () => {
        // Only handle interactive components that should be disabled
        const interactiveComponents = ["ifx-checkbox", "ifx-switch", "ifx-button"];
        // Get all slotted elements
        const slots = this.host.querySelectorAll("[slot]");
        slots.forEach((slottedElement) => {
            // Check if the slotted element itself is an interactive component
            if (interactiveComponents.includes(slottedElement.tagName.toLowerCase())) {
                this.setElementDisabledState(slottedElement);
            }
            // Also check for nested interactive components within the slotted element
            interactiveComponents.forEach((componentTag) => {
                const nestedElements = slottedElement.querySelectorAll(componentTag);
                nestedElements.forEach((nestedElement) => {
                    this.setElementDisabledState(nestedElement);
                });
            });
        });
    };
    setElementDisabledState = (element) => {
        if (this.disabled) {
            element.setAttribute("disabled", "true");
        }
        else {
            element.removeAttribute("disabled");
        }
    };
    render() {
        const isClickable = !this.disabled && (this.href || this.value);
        const ariaLabel = this.itemAriaLabel ||
            `${this.itemTitle}${this.description ? ` - ${this.description}` : ""}`;
        const hasLeadingContent = this.hasSlotContent("leading");
        const hasTrailingContent = this.hasSlotContent("trailing");
        return (index.h("div", { key: '904000c21fe5b3edd4bd9fd6d713ada083b3405d', class: index$1.classNames("action-list-item", this.disabled && "action-list-item--disabled", isClickable && "action-list-item--clickable"), role: "listitem", tabIndex: isClickable ? 0 : -1, "aria-label": ariaLabel, "aria-disabled": this.disabled ? "true" : undefined, onClick: this.handleMainClick, onKeyDown: this.handleMainKeyDown }, hasLeadingContent && (index.h("div", { key: 'a936dc1d770b28e1e4892386cd157cbf904dede9', class: "action-list-item__leading", onClick: this.handleLeadingClick, onKeyDown: this.handleLeadingKeyDown }, index.h("slot", { key: 'e2db3a7bb6365375d033236aa5a510c7afeb36ec', name: "leading" }))), index.h("div", { key: '402bd4b28a89f6095bcdcadd3d17f29d621e3130', class: "action-list-item__content" }, index.h("div", { key: '23a359f7ea1bfb57690e40ba25d95ea3df06712a', class: "action-list-item__title" }, this.itemTitle), this.description && (index.h("div", { key: '7c16cfd8ab22086567f439718edf25696bc3c305', class: "action-list-item__description" }, this.description))), hasTrailingContent && (index.h("div", { key: '3eb67e229ae310950d3d09a7f7d93e36066884e3', class: "action-list-item__trailing", onClick: this.handleTrailingClick, onKeyDown: this.handleTrailingKeyDown }, index.h("slot", { key: 'ef30fecda349b7c5f075756cb70fcea5b9ce065e', name: "trailing" })))));
    }
    static get watchers() { return {
        "disabled": [{
                "onDisabledChange": 0
            }]
    }; }
};
ActionListItem.style = actionListItemCss();

exports.ifx_action_list_item = ActionListItem;
//# sourceMappingURL=ifx-action-list-item.entry.cjs.js.map

//# sourceMappingURL=ifx-action-list-item.cjs.entry.js.map