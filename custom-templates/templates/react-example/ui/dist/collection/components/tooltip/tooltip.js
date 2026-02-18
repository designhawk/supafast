import { createPopper } from "@popperjs/core";
import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Tooltip {
    el;
    tooltipVisible = false;
    header = '';
    text = '';
    position = 'auto';
    internalPosition = 'auto';
    ariaLabel;
    variant = 'compact';
    icon;
    appendToBody = false;
    tooltipContainer;
    tooltipEl;
    referenceEl;
    popperInstance = null;
    componentWillLoad() {
        if (this.variant.toLowerCase().trim() === '') {
            this.variant = 'compact';
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent('ifx-tooltip', await framework);
        }
        const slotElement = this.el.shadowRoot.querySelector('.tooltip__container').firstChild;
        if (this.variant.toLowerCase() === 'compact' || this.variant.toLowerCase() === 'extended') {
            slotElement.addEventListener('mouseenter', this.onMouseEnter);
            slotElement.addEventListener('mouseleave', this.onMouseLeave);
        }
        else {
            slotElement.addEventListener('click', this.onClick);
        }
    }
    initializePopper() {
        if (this.popperInstance)
            return;
        this.referenceEl = this.el;
        let originalTooltipEl;
        if (this.variant.toLowerCase() === 'compact') {
            originalTooltipEl = this.el.shadowRoot.querySelector('.tooltip-compact');
        }
        else if (this.variant.toLowerCase() === 'dismissible') {
            originalTooltipEl = this.el.shadowRoot.querySelector('.tooltip-dismissible');
        }
        else {
            originalTooltipEl = this.el.shadowRoot.querySelector('.tooltip-extended');
        }
        if (this.appendToBody && originalTooltipEl && !this.tooltipContainer) {
            this.tooltipContainer = originalTooltipEl.cloneNode(true);
            const computedStyle = window.getComputedStyle(originalTooltipEl);
            Array.from(computedStyle).forEach(key => {
                this.tooltipContainer.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key));
            });
            document.body.appendChild(this.tooltipContainer);
            originalTooltipEl.style.visibility = 'hidden';
            this.tooltipEl = this.tooltipContainer;
        }
        else if (this.appendToBody && this.tooltipContainer) {
            this.tooltipEl = this.tooltipContainer;
        }
        else {
            this.tooltipEl = originalTooltipEl;
        }
        let effectivePosition;
        if (this.position === 'auto') {
            effectivePosition = this.determineBestPosition();
        }
        else {
            effectivePosition = this.position;
        }
        this.internalPosition = effectivePosition;
        if (this.tooltipEl && this.referenceEl) {
            this.popperInstance = createPopper(this.referenceEl, this.tooltipEl, {
                placement: this.internalPosition,
                strategy: 'fixed',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: 'clippingParents',
                            altBoundary: false,
                            rootBoundary: 'viewport',
                        },
                    },
                    {
                        name: 'flip',
                        enabled: this.position === 'auto',
                        options: {
                            fallbackPlacements: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'],
                            flipVariations: false,
                        },
                    },
                    {
                        name: 'computeStyles',
                        options: {
                            gpuAcceleration: false,
                            adaptive: true,
                        },
                    },
                ],
            });
        }
        if (this.tooltipEl) {
            this.tooltipEl.setAttribute('data-placement', this.internalPosition);
        }
    }
    determineBestPosition() {
        const rect = this.referenceEl.getBoundingClientRect();
        const yOffset = window.scrollY;
        const xOffset = window.scrollX;
        const verticalHalfwayPoint = rect.top + yOffset + rect.height / 2;
        const horizontalHalfwayPoint = rect.left + xOffset + rect.width / 2;
        if (verticalHalfwayPoint > window.innerHeight / 2) {
            if (horizontalHalfwayPoint > window.innerWidth / 2) {
                return 'top-end';
            }
            else {
                return 'top-start';
            }
        }
        else {
            if (horizontalHalfwayPoint > window.innerWidth / 2) {
                return 'bottom-end';
            }
            else {
                return 'bottom-start';
            }
        }
    }
    positionChanged(newVal) {
        this.internalPosition = newVal;
        this.popperInstance?.destroy();
        this.popperInstance = null; // Force re-initialization on next mouse enter
    }
    onMouseEnter = () => {
        this.initializePopper();
        this.tooltipVisible = true;
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'block';
        }
        this.popperInstance?.update();
    };
    onMouseLeave = () => {
        this.tooltipVisible = false;
        if (this.tooltipEl) {
            this.tooltipEl.style.display = 'none';
        }
    };
    disconnectedCallback() {
        const slotElement = this.el.shadowRoot?.querySelector('.tooltip__container')?.firstChild;
        if (slotElement) {
            slotElement.removeEventListener('mouseenter', this.onMouseEnter);
            slotElement.removeEventListener('mouseleave', this.onMouseLeave);
            slotElement.removeEventListener('click', this.onClick);
        }
        this.popperInstance?.destroy();
        if (this.tooltipContainer && this.tooltipContainer.parentNode) {
            document.body.removeChild(this.tooltipContainer);
        }
    }
    onClick = () => {
        if (this.variant.toLowerCase() === 'dismissible') {
            this.initializePopper();
            this.tooltipVisible = !this.tooltipVisible;
            this.tooltipEl.style.display = this.tooltipVisible ? 'block' : 'none';
            this.popperInstance?.update();
        }
    };
    onDismissClick = () => {
        this.tooltipVisible = false;
        this.tooltipEl.style.display = 'none';
    };
    render() {
        const tooltipDismissible = {
            "tooltip-dismissible": true,
            visible: this.tooltipVisible,
        };
        const tooltipCompact = {
            "tooltip-compact": true,
            visible: this.tooltipVisible,
        };
        const tooltipExtended = {
            "tooltip-extended": true,
            visible: this.tooltipVisible,
        };
        return (h("div", { key: '857679919e4a9ac383618e74ae8671c44aa22213', "aria-label": this.ariaLabel, "aria-value": this.header, class: "tooltip__container" }, h("slot", { key: '80d8bcbce65be64947a8319c5df20e164494f0e0' }), this.variant.toLowerCase() === 'dismissible' && (h("div", { key: 'eed17d0f5af88f4a314737151d1f66e5b5b89910', class: tooltipDismissible }, h("button", { key: '88d1dd9548f442471e910970d58934d064402983', "aria-label": "Close Tooltip", class: "close-button", onClick: this.onDismissClick }, h("ifx-icon", { key: 'ecb8fd718aa90778ef56d3c83815857346d749b9', icon: "cross16" })), h("div", { key: 'e6e348faa65e6a9417337ca012530fc17d9c69bf', class: "tooltip-dismissible-content" }, this.header && h("div", { key: '86419e99d2bd5c25d93f3f0b965ca0b170607c52', class: "tooltip-dismissible-header" }, this.header), h("div", { key: '29597095f47134b995dc8ede174d58a3469efa22', class: "tooltip-dismissible-body" }, this.text)), h("svg", { key: 'f1062e1df92f206e8648e78fe0ea0c2bfd2b8a95', class: "tooltip-arrow-svg", width: "12", height: "8", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '10be7ccf853883f2d90463a16a8d0855d012ffac', id: "Indicator", d: "M6 0L12 8L0 8L6 0Z", fill: "#1D1D1D" })))), this.variant.toLowerCase() === 'compact' && (h("div", { key: '80f1817d9729e2ede5316c6745c198611acd5326', class: tooltipCompact }, this.text, h("svg", { key: 'f5a3d611c5c7c2ad60d248500f578426d26712f2', class: "tooltip-arrow-svg", width: "12", height: "8", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '0094f0823900ccc836ffc2b171f1f1f19da601b2', id: "Indicator", d: "M6 0L12 8L0 8L6 0Z", fill: "#1D1D1D" })))), this.variant.toLowerCase() === 'extended' && (h("div", { key: '973a980aefbe155c4ee50fd7a72aff7a4c575a3e', class: tooltipExtended }, h("slot", { key: '8945f0ce71cce4e8a474379e5846cc9f0638db97', name: "icon" }, this.icon ? (h("div", { class: "extended_icon" }, h("ifx-icon", { icon: this.icon }))) : (h("svg", { class: "extended_icon", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24" }, h("path", { stroke: "#fff", "stroke-linecap": "round", "stroke-linejoin": "round", d: "M20.5 2.5h-16a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-16a2 2 0 0 0-2-2Z" }), h("path", { stroke: "#fff", d: "M19 17H6l2.5-4 2.097 2.516.405.486.379-.506 4.118-5.49.003-.002L19 17Z" }), h("path", { fill: "#fff", d: "M10 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" })))), h("div", { key: '8d30da405aac05032a88b338ba93156aad6a5776', class: "tooltip-extended-content" }, this.header && h("div", { key: 'f84f33cdc814d8ff08b17b6f3d89c475d49a1215', class: "tooltip-extended-header" }, this.header), h("div", { key: '77cdbb29479131c7b8c1edafd6dfd62f488af8c7', class: "tooltip-extended-body" }, this.text)), h("svg", { key: 'e3b59d4a52949225f6aaba578ebe1498fda2c48e', class: "tooltip-arrow-svg", width: "12", height: "8", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '05f7c7d0436300f390e0e48f3a7bf47e1abff4dd', id: "Indicator", d: "M6 0L12 8L0 8L6 0Z", fill: "#1D1D1D" }))))));
    }
    static get is() { return "ifx-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["tooltip.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["tooltip.css"]
        };
    }
    static get properties() {
        return {
            "header": {
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
                "attribute": "header",
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
                    "text": ""
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "position",
                "defaultValue": "'auto'"
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "aria-label"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'compact' | 'dismissible' | 'extended'",
                    "resolved": "\"compact\" | \"dismissible\" | \"extended\"",
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
                "attribute": "variant",
                "defaultValue": "'compact'"
            },
            "icon": {
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
                "attribute": "icon"
            },
            "appendToBody": {
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "append-to-body",
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "tooltipVisible": {},
            "internalPosition": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "position",
                "methodName": "positionChanged"
            }];
    }
}
//# sourceMappingURL=tooltip.js.map
