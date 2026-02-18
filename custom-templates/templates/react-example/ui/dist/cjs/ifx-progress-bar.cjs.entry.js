'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const progressBarCss = () => `:host{display:flex;width:100%}.progress-bar{height:16px;bottom:0;right:0;top:0;left:0;display:flex;height:20px;border-radius:1px;width:100%;overflow:hidden;background-color:#EEEDED;font-family:var(--ifx-font-family)}.progress-bar.s{height:4px}.progress-bar .label{font-style:normal;font-size:0.875rem;font-weight:400;line-height:1.25rem;color:#FFFFFF}.progress-bar .progress{display:flex;align-items:center;justify-content:center;min-width:fit-content;height:100%;background-color:#0A8276;transition:width 0.2s ease}`;

const ProgressBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
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
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-progress-bar", await framework);
        }
    }
    render() {
        return (index.h("div", { key: '4859e8bf3b9e56120453678fce0081d9710a17f0', role: "progressbar", "aria-valuenow": this.internalValue, "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": `Progress: ${this.internalValue}%`, class: `progress-bar ${this.size}` }, index.h("div", { key: '9c009ebc9e8f465faefdb6c4f5d8c4315db43329', class: "progress", style: { width: `${this.internalValue}%` } }, this.showLabel && this.size !== "s" && this.internalValue !== 0 && (index.h("span", { key: '3b425746affc25e6c758aeb42b9d8bb6cc7e317d', class: "label" }, `${this.internalValue}%`)))));
    }
    static get watchers() { return {
        "value": [{
                "valueChanged": 0
            }]
    }; }
};
ProgressBar.style = progressBarCss();

exports.ifx_progress_bar = ProgressBar;
//# sourceMappingURL=ifx-progress-bar.entry.cjs.js.map

//# sourceMappingURL=ifx-progress-bar.cjs.entry.js.map