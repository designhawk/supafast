'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const segmentedControlCss = () => `.group{display:flex;flex-direction:column;justify-content:space-between}.group__label{font-size:1rem;color:#1D1D1D;line-height:1.5rem;font-weight:400}.group__label:empty{display:none}.group__label .required{color:#575352;margin-left:4px}.group__label .required.error{color:#CD002F}.group__controls{display:flex;flex-wrap:wrap}.group__controls ::slotted(*){margin-left:-1px;margin-top:-1px}.group__caption{margin-top:4px;display:flex;align-items:center;gap:8px;font-weight:400;font-size:0.75rem;line-height:1rem}.group__caption.error{color:#CD002F}`;

const SegmentedControl = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxChange = index.createEvent(this, "ifxChange", 7);
    }
    get el() { return index.getElement(this); }
    ifxChange;
    caption = "";
    label = "";
    size = "regular";
    required = false;
    error = false;
    onSegmentSelect(event) {
        const { previousValue, selectedValue } = this.unselectPreviousSegment(event.detail);
        this.selectedValue = selectedValue;
        this.ifxChange.emit({ previousValue, selectedValue });
    }
    selectedValue = "";
    unselectPreviousSegment(newSelectedIndex) {
        let previousValue;
        let selectedValue;
        const segments = this.getSegments();
        segments.forEach((control) => {
            if (control.selected) {
                if (control.segmentIndex !== newSelectedIndex) {
                    control.selected = false;
                    previousValue = control.value;
                }
                else {
                    selectedValue = control.value;
                }
            }
        });
        return { previousValue, selectedValue };
    }
    getSegments() {
        return this.el.querySelectorAll("ifx-segment");
    }
    setActiveSegment() {
        const segments = this.getSegments();
        let activeSegmentedControlFound = false;
        segments.forEach((control, idx) => {
            control.segmentIndex = idx;
            if (activeSegmentedControlFound) {
                if (control.selected)
                    control.selected = false;
            }
            else {
                if (control.selected) {
                    activeSegmentedControlFound = true;
                    this.selectedValue = control.value;
                }
            }
        });
    }
    setSegmentSize() {
        const segments = this.getSegments();
        segments.forEach((control) => {
            control.shadowRoot
                .querySelector(".segment")
                .classList.add(`segment--${this.size}`);
        });
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-segmented-control", await framework);
        }
        this.setActiveSegment();
    }
    render() {
        return (index.h("div", { key: '5466c7bf1c6ef935003381c990e75413d6ef69b9', "aria-value": this.selectedValue, "aria-label": "segmented control", class: "group" }, index.h("div", { key: '3fa88fda68195d24bcba578d4f9ceecbdd194e11', class: "group__label" }, this.label.trim(), this.required && this.label.trim().toLowerCase() !== "" && (index.h("span", { key: '2203d425ecd1acd4b619daa577c927750d9c3947', class: `required ${this.error ? "error" : ""}` }, "*"))), index.h("div", { key: 'ab88f096ad2bb01a4c3037f970f321e0bf4e77cc', class: "group__controls" }, index.h("slot", { key: '735db5075de201d44b83fb045c5251068d0707ad' })), this.caption.trim() && (index.h("div", { key: '5941c235ce8922c2e58c27b6efde142f83c87629', class: `group__caption ${this.error ? "error" : ""}` }, index.h("ifx-icon", { key: 'd6fe454eb047a81503789599f251f541f8d5f3f9', icon: "c-info-16" }), " ", this.caption.trim()))));
    }
    componentDidRender() {
        this.setSegmentSize();
    }
};
SegmentedControl.style = segmentedControlCss();

exports.ifx_segmented_control = SegmentedControl;
//# sourceMappingURL=ifx-segmented-control.entry.cjs.js.map

//# sourceMappingURL=ifx-segmented-control.cjs.entry.js.map