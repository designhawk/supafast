import { h } from "@stencil/core";
import { trackComponent } from "../../shared/utils/tracking";
import { isNestedInIfxComponent } from "../../shared/utils/dom-utils";
import { detectFramework } from "../../shared/utils/framework-detection";
export class Popover {
    el;
    popoverVisible = false;
    computedArrowPosition = {};
    /** Title text displayed in the popover header */
    popoverTitle = '';
    /** Body text displayed in the popover content */
    text = '';
    /** Position of the popover relative to the trigger element */
    position = 'auto';
    /** Whether the popover is disabled */
    disabled = false;
    /** Whether the popover is initially open */
    open = false;
    /** Accessible label for the popover */
    ariaLabel = null;
    /** Emitted when the popover is opened */
    ifxOpen;
    ifxClose;
    static GAP = 12;
    popoverEl;
    triggerEl;
    lastOpenTrigger = null;
    openChanged(newValue) {
        this.popoverVisible = newValue;
        if (!this.popoverEl)
            return;
        if (newValue) {
            this.popoverEl.style.visibility = 'hidden';
            this.popoverEl.style.display = 'flex';
            this.positionPopover();
            this.popoverEl.style.visibility = 'visible';
        }
        else {
            this.popoverEl.style.display = 'none';
            this.popoverEl.style.visibility = '';
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent('ifx-popover', await framework);
        }
        this.popoverEl = this.el.shadowRoot.querySelector('.popover');
        this.setupTriggerElement();
        this.popoverVisible = this.open;
        if (this.open) {
            this.popoverEl.style.visibility = 'hidden';
            this.popoverEl.style.display = 'flex';
            this.positionPopover();
            this.popoverEl.style.visibility = 'visible';
            this.ifxOpen.emit({ trigger: this.lastOpenTrigger });
        }
        // Outside click closing disabled by design
    }
    setupTriggerElement() {
        this.cleanupTriggerListeners();
        const slotElements = Array.from(this.el.children);
        this.triggerEl = slotElements[0] || this.el;
        this.triggerEl.addEventListener('click', this.onClick);
    }
    disconnectedCallback() {
        this.cleanupTriggerListeners();
    }
    cleanupTriggerListeners() {
        if (!this.triggerEl)
            return;
        this.triggerEl.removeEventListener('click', this.onClick);
    }
    getViewportSpace(triggerRect) {
        return {
            above: triggerRect.top,
            below: window.innerHeight - triggerRect.bottom,
            left: triggerRect.left,
            right: window.innerWidth - triggerRect.right
        };
    }
    resetPositioningStyles() {
        if (!this.popoverEl)
            return;
        this.popoverEl.style.top = '';
        this.popoverEl.style.bottom = '';
        this.popoverEl.style.left = '';
        this.popoverEl.style.right = '';
        this.popoverEl.style.transform = '';
        this.popoverEl.style.visibility = '';
    }
    positionPopover() {
        if (!this.popoverEl || !this.triggerEl)
            return;
        const triggerRect = this.triggerEl.getBoundingClientRect();
        const popoverRect = this.popoverEl.getBoundingClientRect();
        const space = this.getViewportSpace(triggerRect);
        let position = this.position;
        if (position === 'auto') {
            position = this.getBestPosition(popoverRect, space);
        }
        else {
            position = this.validateAndAdjustPosition(position, popoverRect, space);
        }
        this.resetPositioningStyles();
        const { popoverStyle, arrowStyle } = this.calculatePosition(triggerRect, popoverRect, position);
        Object.assign(this.popoverEl.style, popoverStyle);
        this.computedArrowPosition = arrowStyle;
        this.popoverEl.setAttribute('data-placement', position);
    }
    getBestPosition(popoverRect, space) {
        const gap = Popover.GAP;
        if (space.above >= popoverRect.height + gap) {
            return 'top';
        }
        else if (space.below >= popoverRect.height + gap) {
            return 'bottom';
        }
        else if (space.right >= popoverRect.width + gap) {
            return 'right';
        }
        else if (space.left >= popoverRect.width + gap) {
            return 'left';
        }
        return 'bottom';
    }
    validateAndAdjustPosition(desiredPosition, popoverRect, space) {
        const gap = Popover.GAP;
        switch (desiredPosition) {
            case 'top':
            case 'top-start':
            case 'top-end':
                if (space.above >= popoverRect.height + gap)
                    return desiredPosition;
                if (space.below >= popoverRect.height + gap)
                    return 'bottom';
                if (space.left >= popoverRect.width + gap)
                    return 'left';
                if (space.right >= popoverRect.width + gap)
                    return 'right';
                return 'bottom';
            case 'bottom':
            case 'bottom-start':
            case 'bottom-end':
                if (space.below >= popoverRect.height + gap)
                    return desiredPosition;
                if (space.above >= popoverRect.height + gap)
                    return 'top';
                if (space.left >= popoverRect.width + gap)
                    return 'left';
                if (space.right >= popoverRect.width + gap)
                    return 'right';
                return 'top';
            case 'left':
                if (space.left >= popoverRect.width + gap)
                    return 'left';
                if (space.right >= popoverRect.width + gap)
                    return 'right';
                if (space.below >= popoverRect.height + gap)
                    return 'bottom';
                if (space.above >= popoverRect.height + gap)
                    return 'top';
                return 'right';
            case 'right':
                if (space.right >= popoverRect.width + gap)
                    return 'right';
                if (space.left >= popoverRect.width + gap)
                    return 'left';
                if (space.below >= popoverRect.height + gap)
                    return 'bottom';
                if (space.above >= popoverRect.height + gap)
                    return 'top';
                return 'left';
            default:
                return 'bottom';
        }
    }
    calculatePosition(triggerRect, popoverRect, position) {
        const gap = Popover.GAP;
        let popoverStyle = {
            position: 'absolute',
            zIndex: '1000'
        };
        let arrowStyle = {};
        switch (position) {
            case 'top-start':
                popoverStyle.left = `0px`;
                popoverStyle.bottom = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    top: `100%`,
                    left: '12px'
                };
                break;
            case 'top-end':
                popoverStyle.right = `0px`;
                popoverStyle.bottom = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    top: `100%`,
                    right: '12px'
                };
                break;
            case 'top':
                popoverStyle.left = `${(triggerRect.width / 2) - (popoverRect.width / 2)}px`;
                popoverStyle.bottom = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    top: `100%`,
                    left: '50%',
                    transform: 'translateX(-50%)'
                };
                break;
            case 'bottom-start':
                popoverStyle.left = `0px`;
                popoverStyle.top = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    bottom: `100%`,
                    left: '12px',
                    transform: 'rotate(180deg)'
                };
                break;
            case 'bottom-end':
                popoverStyle.right = `0px`;
                popoverStyle.top = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    bottom: `100%`,
                    right: '12px',
                    transform: 'rotate(180deg)'
                };
                break;
            case 'bottom':
                popoverStyle.left = `${(triggerRect.width / 2) - (popoverRect.width / 2)}px`;
                popoverStyle.top = `${triggerRect.height + gap}px`;
                arrowStyle = {
                    bottom: `100%`,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(180deg)'
                };
                break;
            case 'left':
                popoverStyle.right = `${triggerRect.width + gap}px`;
                popoverStyle.top = `${(triggerRect.height / 2) - (popoverRect.height / 2)}px`;
                arrowStyle = {
                    top: '50%',
                    right: '-10px',
                    transform: 'translateY(-50%) rotate(-90deg)'
                };
                break;
            case 'right':
                popoverStyle.left = `${triggerRect.width + gap}px`;
                popoverStyle.top = `${(triggerRect.height / 2) - (popoverRect.height / 2)}px`;
                arrowStyle = {
                    top: '50%',
                    left: '-10px',
                    transform: 'translateY(-50%) rotate(90deg)'
                };
                break;
        }
        return { popoverStyle, arrowStyle };
    }
    positionChanged() {
        if (this.popoverVisible) {
            setTimeout(() => this.positionPopover(), 0);
        }
    }
    /** Programmatically show the popover */
    async show() {
        if (this.disabled)
            return;
        this.open = true;
        this.popoverEl.style.visibility = 'hidden';
        this.popoverEl.style.display = 'flex';
        this.positionPopover();
        this.popoverEl.style.visibility = 'visible';
        this.popoverVisible = true;
        this.lastOpenTrigger = this.triggerEl || null;
        this.ifxOpen.emit({ trigger: this.lastOpenTrigger });
    }
    /** Programmatically hide the popover */
    async hide() {
        this.open = false;
        this.popoverVisible = false;
        if (this.popoverEl) {
            this.popoverEl.style.display = 'none';
            this.popoverEl.style.visibility = '';
        }
        this.ifxClose.emit();
    }
    /** Programmatically toggle the popover visibility */
    async toggle() {
        if (this.popoverVisible) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    onClick = (event) => {
        event.stopPropagation();
        this.lastOpenTrigger = this.triggerEl || event.currentTarget || null;
        this.toggle();
    };
    onCloseClick = (event) => {
        event.stopPropagation();
        this.hide();
    };
    render() {
        const popoverClass = {
            'popover': true,
            'visible': this.popoverVisible,
            'popover--disabled': this.disabled
        };
        const arrowStyles = {
            position: 'absolute',
            ...this.computedArrowPosition
        };
        return (h("div", { key: '1099e84c972aa386ccecb006f2b7c584ea9b2150', class: "popover__container", "aria-label": this.ariaLabel }, h("slot", { key: '17fbf7bd6096c3978479bfb9671507e23c939c27' }), h("div", { key: '75e0a84d2e8a4aa0714c7101be0c3d7670f18d3a', class: popoverClass, role: "dialog", "aria-modal": "false" }, h("button", { key: 'd3511c1624466c65350214998bb0a853c2acad56', "aria-label": "Close Popover", class: "popover-close", onClick: this.onCloseClick }, h("ifx-icon", { key: 'e068bd7d599ca59b36ea32941455d3bf6b508330', icon: "cross16" })), h("div", { key: 'fab40f54e162be44db69fc74104cbf7e6313f64f', class: "popover-content" }, this.popoverTitle && h("div", { key: 'eb762ff5ab6f1103e4702c2b7f7b718761bbfbee', class: "popover-title" }, this.popoverTitle), this.text && h("div", { key: 'c5c6ca0bdbd47cce3c1cae942a1e81c0a8eaf4a5', class: "popover-text" }, this.text), h("slot", { key: '533789c1b492b0b019fb2896225dee6e961dfe7c', name: "content" })), h("svg", { key: '06a4580f9e6362ff8e5fa911d352466138d5c98a', class: "popover-arrow-svg", xmlns: "http://www.w3.org/2000/svg", width: "12", height: "8", viewBox: "0 0 12 8", fill: "none", style: arrowStyles }, h("path", { key: '704caa4a4c7874b04018c278ec5c2e0bcaf9e6b8', d: "M6 8L0 0L12 0L6 8Z", fill: "currentColor" })))));
    }
    static get is() { return "ifx-popover"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["popover.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["popover.css"]
        };
    }
    static get properties() {
        return {
            "popoverTitle": {
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
                    "text": "Title text displayed in the popover header"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "popover-title",
                "defaultValue": "''"
            },
            "text": {
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
                    "text": "Body text displayed in the popover content"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "text",
                "defaultValue": "''"
            },
            "position": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'bottom-start' | 'top-start' | 'left' | 'bottom-end' | 'top-end' | 'right' | 'bottom' | 'top' | 'auto'",
                    "resolved": "\"auto\" | \"bottom\" | \"bottom-end\" | \"bottom-start\" | \"left\" | \"right\" | \"top\" | \"top-end\" | \"top-start\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Position of the popover relative to the trigger element"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "position",
                "defaultValue": "'auto'"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Whether the popover is disabled"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "open": {
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
                    "text": "Whether the popover is initially open"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "open",
                "defaultValue": "false"
            },
            "ariaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Accessible label for the popover"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "aria-label",
                "defaultValue": "null"
            }
        };
    }
    static get states() {
        return {
            "popoverVisible": {},
            "computedArrowPosition": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxOpen",
                "name": "ifxOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the popover is opened"
                },
                "complexType": {
                    "original": "{ trigger: HTMLElement | null }",
                    "resolved": "{ trigger: HTMLElement; }",
                    "references": {
                        "HTMLElement": {
                            "location": "global",
                            "id": "global::HTMLElement"
                        }
                    }
                }
            }, {
                "method": "ifxClose",
                "name": "ifxClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "show": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically show the popover",
                    "tags": []
                }
            },
            "hide": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically hide the popover",
                    "tags": []
                }
            },
            "toggle": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Programmatically toggle the popover visibility",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "open",
                "methodName": "openChanged"
            }, {
                "propName": "position",
                "methodName": "positionChanged"
            }];
    }
}
//# sourceMappingURL=popover.js.map
