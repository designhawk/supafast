import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const indicatorCss = () => `:host{display:inline-flex}.indicator__container .dot__wrapper{display:flex;width:8px;height:8px;justify-content:center;align-items:center;flex-shrink:0;border-radius:50%;background-color:#0A8276}.indicator__container .number__container{height:16px;display:inline-flex;padding:0;min-width:16px;justify-content:center;align-items:center;border-radius:100px;background-color:#0A8276}.indicator__container .number__container .number__wrapper{padding:0 4px;color:#FFFFFF;text-align:center;font-size:0.875rem;font-style:normal;font-weight:600;line-height:16px}.indicator__container .number__container.inverted{background-color:#FFFFFF}.indicator__container .number__container.inverted .number__wrapper{color:#0A8276}`;

const Indicator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    filteredNumber;
    inverted = false;
    ariaLabel;
    variant = "number";
    number = 0;
    handleNumber() {
        this.filteredNumber =
            !isNaN(this.number) && this.number > 99 ? "99+" : this.number;
    }
    componentWillLoad() {
        this.handleNumber();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-indicator", await framework);
        }
    }
    componentWillUpdate() {
        this.handleNumber();
    }
    render() {
        return (h("div", { key: '897dbea43ffd2fb4d15cc1c6b109f8835e838237', "aria-label": this.ariaLabel, class: "indicator__container" }, this.variant === "number" && (h("div", { key: '0fbea4c3ab0db12c0e18fa206bc2404664497787', class: `number__container ${this.inverted ? "inverted" : ""}` }, h("div", { key: '77faab8eb00a1e3f0112fc8e107f5b48f20cef88', class: "number__wrapper" }, this.filteredNumber))), this.variant === "dot" && h("div", { key: 'd6019acf06f6e9e3120a03a6ea7307c02ce2851a', class: "dot__wrapper" })));
    }
};
Indicator.style = indicatorCss();

export { Indicator as ifx_indicator };
//# sourceMappingURL=ifx-indicator.entry.js.map

//# sourceMappingURL=ifx-indicator.entry.js.map