'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const checkboxCss = () => `:host{display:inline-flex;vertical-align:top}.checkbox__container{box-sizing:border-box;display:inline-flex;flex-direction:row;align-items:top;padding:0px;gap:8px;font-family:"Source Sans 3";vertical-align:bottom}.checkbox__container .checkbox__wrapper{box-sizing:border-box;display:flex;position:relative;justify-content:center;align-items:center;width:20px;height:20px;background-color:#FFFFFF;border:1px solid #575352;border-radius:1px;flex:none;order:0;flex-grow:0;align-self:flex-start}.checkbox__container .checkbox__wrapper.checkbox-m{height:24px;width:24px}.checkbox__container .checkbox__wrapper.error{border-color:#CD002F}.checkbox__container .checkbox__wrapper:focus-visible{border:1px solid #575352;outline:2px solid #0A8276;outline-offset:2px}.checkbox__container .checkbox__wrapper:hover{background-color:#EEEDED;border:1px solid #575352;border-radius:1px;flex:none;order:0;flex-grow:0}.checkbox__container .checkbox__wrapper.disabled{background-color:#BFBBBB;border-color:#BFBBBB;border-radius:1px;flex:none;order:0;flex-grow:0}.checkbox__container .checkbox__wrapper.checked:not(.indeterminate){background-color:#0A8276;border-radius:1px;border-color:transparent;flex:none;order:0;flex-grow:0;color:#FFFFFF}.checkbox__container .checkbox__wrapper.checked:not(.indeterminate).error{background-color:#CD002F}.checkbox__container .checkbox__wrapper.checked:not(.indeterminate):focus-visible{border:1px solid transparent;outline:2px solid #0A8276;outline-offset:2px}.checkbox__container .checkbox__wrapper.checked:not(.indeterminate):hover{background-color:#0A8276;border-radius:1px;flex:none;order:0;flex-grow:0}.checkbox__container .checkbox__wrapper.checked:not(.indeterminate).disabled{background:#BFBBBB;border-radius:1px;flex:none;order:0;flex-grow:0}.checkbox__container .checkbox__wrapper.indeterminate:before{content:"";display:block;width:70%;height:2px;background-color:#08665C;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.checkbox__container .label{font-style:normal;font-weight:400;font-size:0.875rem;line-height:1.25rem;color:#1D1D1D;overflow-wrap:break-word;word-wrap:break-word;word-break:break-all;max-width:100%}.checkbox__container .label.label-m{font-size:1rem;line-height:1.5rem}.checkbox__container .label.disabled{color:#BFBBBB}.checkbox__container .checkbox__wrapper:hover,.checkbox__container .label:hover{cursor:pointer}`;

const Checkbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxChange = index.createEvent(this, "ifxChange", 7);
        this.ifxError = index.createEvent(this, "ifxError", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    inputElement;
    get el() { return index.getElement(this); }
    disabled = false;
    checked = false;
    error = false;
    size = "m";
    indeterminate = false;
    value;
    internalChecked;
    internalIndeterminate;
    internals;
    ifxChange;
    ifxError;
    handleCheckbox() {
        if (!this.disabled) {
            if (!this.inputElement.indeterminate) {
                this.internalChecked = !this.internalChecked;
            }
            this.ifxChange.emit(this.internalChecked);
        }
    }
    async isChecked() {
        return this.internalChecked;
    }
    async toggleCheckedState(newVal) {
        this.internalChecked = newVal;
    }
    valueChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalChecked = newValue;
            this.inputElement.checked = this.internalChecked; // update the checkbox's checked property
        }
    }
    errorChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.ifxError.emit(newValue);
        }
    }
    indeterminateChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.internalIndeterminate = newValue;
            this.inputElement.indeterminate = this.internalIndeterminate; // update the checkbox's indeterminate property
        }
    }
    handleKeydown(event) {
        // Keycode 32 corresponds to the Space key, 13 corresponds to the Enter key
        if (event.keyCode === 32 || event.keyCode === 13) {
            this.handleCheckbox();
            event.preventDefault(); // prevent the default action when space or enter is pressed
        }
    }
    componentWillLoad() {
        this.internalChecked = this.checked;
        this.internalIndeterminate = this.indeterminate;
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-checkbox", await framework);
        }
    }
    componentDidRender() {
        this.inputElement.indeterminate = this.internalIndeterminate;
    }
    /**
     * Callback for form association.
     * Called whenever the form is reset.
     */
    // formResetCallback() {
    //   this.internals.setFormValue(null);
    // }
    getCheckedClassName() {
        if (this.error) {
            if (this.internalChecked) {
                return "checked error";
            }
            else {
                return "error";
            }
        }
        else if (this.internalChecked) {
            return "checked";
        }
        else
            return "";
    }
    render() {
        const slot = this.el.innerHTML;
        let hasSlot = false;
        if (slot) {
            hasSlot = true;
        }
        return (index.h("div", { key: '66deab9a045801347d7d3922d6b79e776968e346', class: "checkbox__container" }, index.h("input", { key: '0e4cb4faef0961cb49a41f118dc322003af138b8', type: "checkbox", hidden: true, ref: (el) => (this.inputElement = el), checked: this.internalChecked, onChange: this.handleCheckbox.bind(this), id: "checkbox", value: `${this.value}`, disabled: this.disabled ? true : undefined }), index.h("div", { key: 'cfd4ab79dfe2b35a080ae3ef1353517d83d3e59e', tabindex: "0", onClick: this.handleCheckbox.bind(this), onKeyDown: this.handleKeydown.bind(this), role: "checkbox", "aria-checked": this.indeterminate ? "mixed" : this.internalChecked.toString(), "aria-disabled": this.disabled, "aria-labelledby": "label", class: `checkbox__wrapper 
          ${this.getCheckedClassName()}
        ${this.size === "m" ? "checkbox-m" : ""}
        ${this.indeterminate ? "indeterminate" : ""}
        ${this.disabled ? "disabled" : ""}` }, this.internalChecked && !this.internalIndeterminate && (index.h("ifx-icon", { key: '24a05ff0636f28106002d300c036f66ba671090f', icon: "check-16", "aria-hidden": "true" }))), hasSlot && (index.h("div", { key: '02c12362ee3d2d875d9dbbc6d2e2089c11b6ead6', id: "label", class: `label ${this.size === "m" ? "label-m" : ""} ${this.disabled ? "disabled" : ""} `, onClick: this.handleCheckbox.bind(this) }, index.h("slot", { key: '9dcb9bfffb3d46bc14224e60f2602af350ef93fd' })))));
    }
    static get watchers() { return {
        "checked": [{
                "valueChanged": 0
            }],
        "error": [{
                "errorChanged": 0
            }],
        "indeterminate": [{
                "indeterminateChanged": 0
            }]
    }; }
};
Checkbox.style = checkboxCss();

exports.ifx_checkbox = Checkbox;
//# sourceMappingURL=ifx-checkbox.entry.cjs.js.map

//# sourceMappingURL=ifx-checkbox.cjs.entry.js.map