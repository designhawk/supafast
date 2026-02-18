import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';
import { c as createPopper } from './popper-BfP9ezJQ.js';

const tooltipCss = () => `:host{display:inline-flex}.tooltip__container{display:inline-flex;flex-direction:column;position:relative;font-family:var(--ifx-font-family)}.tooltip-extended,.tooltip-compact,.tooltip-dismissible{background-color:#1D1D1D;border:1px solid black;z-index:1080;display:none;transition:opacity 0.3s;position:absolute;font-size:14px;font-style:normal;font-weight:400;line-height:20px;color:#FFFFFF;width:max-content;box-sizing:border-box;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;}.visible.tooltip-extended,.visible.tooltip-compact,.visible.tooltip-dismissible{display:flex !important;align-items:start}.tooltip-dismissible .close-button{all:unset;cursor:pointer;position:relative;order:2;margin-top:12px;margin-right:12px;line-height:0px}.tooltip-dismissible .tooltip-dismissible-content{display:flex;flex-direction:column;gap:12px;padding:12px;flex-grow:1;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}.tooltip-dismissible .tooltip-dismissible-header,.tooltip-dismissible .tooltip-dismissible-body{font-size:14px;font-style:normal;line-height:20px}.tooltip-dismissible .tooltip-dismissible-header{font-weight:600}.tooltip-dismissible .tooltip-dismissible-body{font-weight:400}.tooltip-compact{padding:4px 8px;text-align:center;flex-grow:1}.tooltip-extended{align-items:center;padding:12px;gap:10px}.tooltip-extended .extended_icon{display:flex;align-self:flex-start;align-items:center;cursor:pointer}.tooltip-extended .tooltip-extended-content{display:flex;flex-direction:column;gap:12px;flex-grow:1;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere}.tooltip-extended .tooltip-extended-header,.tooltip-extended .tooltip-extended-body{font-size:14px;font-style:normal;line-height:20px}.tooltip-extended .tooltip-extended-header{font-weight:600}.tooltip-extended .tooltip-extended-body{font-weight:400}.tooltip__container .tooltip-arrow-svg{position:absolute;width:8px;height:8px}[data-placement=top].tooltip-extended>.tooltip-arrow-svg,[data-placement=top].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=top].tooltip-compact>.tooltip-arrow-svg{bottom:-7px;left:50%;transform:rotate(180deg) translateX(-50%)}[data-placement=top-start].tooltip-extended>.tooltip-arrow-svg,[data-placement=top-start].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=top-start].tooltip-compact>.tooltip-arrow-svg{bottom:-7px;left:10px;transform:rotate(180deg)}[data-placement=top-end].tooltip-extended>.tooltip-arrow-svg,[data-placement=top-end].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=top-end].tooltip-compact>.tooltip-arrow-svg{bottom:-7px;right:10px;transform:rotate(180deg)}[data-placement=bottom].tooltip-extended>.tooltip-arrow-svg,[data-placement=bottom].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=bottom].tooltip-compact>.tooltip-arrow-svg{top:-7px;left:50%;transform:translateX(-50%)}[data-placement=bottom-start].tooltip-extended>.tooltip-arrow-svg,[data-placement=bottom-start].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=bottom-start].tooltip-compact>.tooltip-arrow-svg{top:-7px;left:10px}[data-placement=bottom-end].tooltip-extended>.tooltip-arrow-svg,[data-placement=bottom-end].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=bottom-end].tooltip-compact>.tooltip-arrow-svg{top:-7px;right:10px}[data-placement=left].tooltip-extended>.tooltip-arrow-svg,[data-placement=left].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=left].tooltip-compact>.tooltip-arrow-svg{right:-3px;top:50%;transform:rotate(90deg) translateY(-50%) translateX(-50%)}[data-placement=right].tooltip-extended>.tooltip-arrow-svg,[data-placement=right].tooltip-dismissible>.tooltip-arrow-svg,[data-placement=right].tooltip-compact>.tooltip-arrow-svg{left:-3px;top:50%;transform:rotate(270deg) translateY(-50%) translateX(50%)}.tooltip-compact{min-width:28px !important;max-width:145px !important}.tooltip-dismissible{min-width:145px !important;max-width:310px !important}.tooltip-extended{min-width:145px !important;max-width:310px !important}`;

const Tooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
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
    static get watchers() { return {
        "position": [{
                "positionChanged": 0
            }]
    }; }
};
Tooltip.style = tooltipCss();

export { Tooltip as ifx_tooltip };
//# sourceMappingURL=ifx-tooltip.entry.js.map

//# sourceMappingURL=ifx-tooltip.entry.js.map