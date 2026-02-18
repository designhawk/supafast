import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const progressBarCss = () => `:host{display:flex;width:100%}.progress-bar{height:16px;bottom:0;right:0;top:0;left:0;display:flex;height:20px;border-radius:1px;width:100%;overflow:hidden;background-color:#EEEDED;font-family:var(--ifx-font-family)}.progress-bar.s{height:4px}.progress-bar .label{font-style:normal;font-size:0.875rem;font-weight:400;line-height:1.25rem;color:#FFFFFF}.progress-bar .progress{display:flex;align-items:center;justify-content:center;min-width:fit-content;height:100%;background-color:#0A8276;transition:width 0.2s ease}`;

const ProgressBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    value = 0;
    size;
    showLabel = false;
    internalValue;
    valueChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalValue = newValue;
        }
    }
    componentWillLoad() {
        this.internalValue = this.value;
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-progress-bar", await framework);
        }
    }
    render() {
        return (h("div", { key: '4859e8bf3b9e56120453678fce0081d9710a17f0', role: "progressbar", "aria-valuenow": this.internalValue, "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": `Progress: ${this.internalValue}%`, class: `progress-bar ${this.size}` }, h("div", { key: '9c009ebc9e8f465faefdb6c4f5d8c4315db43329', class: "progress", style: { width: `${this.internalValue}%` } }, this.showLabel && this.size !== "s" && this.internalValue !== 0 && (h("span", { key: '3b425746affc25e6c758aeb42b9d8bb6cc7e317d', class: "label" }, `${this.internalValue}%`)))));
    }
    static get watchers() { return {
        "value": [{
                "valueChanged": 0
            }]
    }; }
};
ProgressBar.style = progressBarCss();

export { ProgressBar as ifx_progress_bar };
//# sourceMappingURL=ifx-progress-bar.entry.js.map

//# sourceMappingURL=ifx-progress-bar.entry.js.map