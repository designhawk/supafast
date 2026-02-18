import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const datePickerCss = () => `.date__picker-container{display:flex;flex-direction:column}.date__picker-container .label__wrapper{color:#1D1D1D;font:400 1rem/1.5rem "Source Sans 3"}.date__picker-container .label__wrapper .asterisk{display:none}.date__picker-container .label__wrapper .asterisk.required{display:inline;margin-left:4px}.date__picker-container .label__wrapper .asterisk.required.error{color:#CD002F}.date__picker-container.disabled .label__wrapper{color:#BFBBBB}.date__picker-container.error .caption__wrapper{color:#CD002F}.date__picker-container.disabled .caption__wrapper{color:#BFBBBB}.date__picker-container .caption__wrapper{margin-top:4px;color:#1D1D1D;font:400 0.75rem/1rem "Source Sans 3"}.date__picker-input{box-sizing:border-box;font-family:"Source Sans 3";outline:none;width:100%;cursor:pointer;border-radius:1px;border:1px solid #8D8786;height:100%}.date__picker-input.firefox__classes{padding:0px 14px;box-sizing:border-box;color:#8D8786;font-size:16px;text-transform:uppercase;font-style:normal;font-weight:400;line-height:24px;cursor:pointer}.date__picker-input.firefox__classes:disabled{color:#FFFFFF}.date__picker-input:focus:not(.error,.success){border-color:#0A8276}.date__picker-input:hover:not(:disabled,:focus,.error,.success){border-color:#575352}.date__picker-input:disabled{border-color:#BFBBBB;background-color:#BFBBBB;cursor:default}.date__picker-input.error{border-color:#CD002F}.date__picker-input.success:not(.error){border-color:#4CA460}.date__picker-input::-webkit-datetime-edit-text{color:#8D8786;font-size:16px;font-style:normal;font-weight:400;line-height:24px}.date__picker-input:disabled::-webkit-datetime-edit,.date__picker-input:disabled::-webkit-datetime-edit-text{color:#FFFFFF}.date__picker-input.has-value::-webkit-datetime-edit-text{color:#1D1D1D}.date__picker-input.has-value::-webkit-datetime-edit{color:#1D1D1D}::-webkit-datetime-edit{color:#8D8786;font-size:16px;text-transform:uppercase;font-style:normal;font-weight:400;line-height:24px}::-webkit-datetime-edit-fields-wrapper{padding:8px 16px;padding-bottom:9px;transform:translateY(1px)}::-webkit-inner-spin-button{display:none}::-webkit-calendar-picker-indicator{position:absolute;right:15px;font-size:19px;cursor:pointer;border-radius:1px}::-webkit-calendar-picker-indicator:focus-within{outline:2px solid #0A8276;outline-offset:2px}.input__wrapper{display:flex;justify-content:space-between;align-items:center;align-self:stretch;background:#FFFFFF;position:relative}.input__wrapper.large{height:40px}.input__wrapper.small{height:36px}.input__wrapper.disabled .icon__wrapper{background:none;color:#FFFFFF}.input__wrapper.disabled .icon__wrapper.firefox__classes{display:none}.input__wrapper.disabled .icon__wrapper{background-color:#BFBBBB;color:#FFFFFF}.icon__wrapper{position:absolute;right:17px;padding:2px;display:flex;justify-content:flex-end;align-items:center;pointer-events:none;z-index:100;background-color:#FFFFFF;line-height:16px}.icon__wrapper ifx-icon{vertical-align:middle;z-index:1}.icon__wrapper.firefox__classes:focus-visible::after{content:"";position:absolute;top:-4px;left:-4px;right:-4px;bottom:-4px;border:2px solid #0A8276;border-radius:15%}.icon__wrapper.firefox__classes::before{content:"";position:absolute;inset:-4px;background-color:#FFFFFF}`;

const DatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxDate = createEvent(this, "ifxDate", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    inputId = `ifx-date-picker-${++datePickerId}`;
    get el() { return getElement(this); }
    size = "s";
    error = false;
    success = false;
    disabled = false;
    ariaLabel;
    value;
    type = "date";
    max;
    min;
    required = false;
    label;
    caption;
    autocomplete = "on";
    internals;
    ifxDate;
    getInput() {
        const input = this.el.shadowRoot.querySelector(".date__picker-input");
        return input;
    }
    getDate(e) {
        const inputValue = e.target.value;
        const selectedDate = new Date(inputValue);
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        if (!inputValue) {
            //this.internals.setFormValue(null);
            if (this.type === "datetime-local") {
                const hours = selectedDate.getHours();
                const minutes = selectedDate.getMinutes();
                this.ifxDate.emit({ day, month, year, hours, minutes });
            }
            else {
                this.ifxDate.emit({ day, month, year });
            }
            return;
        }
        const input = this.getInput();
        input.classList.add("has-value");
        //this.internals.setFormValue(selectedDate.toISOString().substring(0,10))
        if (this.type === "datetime-local") {
            const hours = selectedDate.getHours();
            const minutes = selectedDate.getMinutes();
            this.ifxDate.emit({ day, month, year, hours, minutes });
        }
        else {
            this.ifxDate.emit({ day, month, year });
        }
    }
    handleIconKeyDown(e) {
        if (this.disabled)
            return;
        const browserIsFirefox = this.isFirefox();
        const input = this.getInput();
        if (e.key === "Enter" && browserIsFirefox) {
            e.preventDefault();
            if (input.showPicker) {
                input.showPicker();
            }
        }
    }
    isFirefox() {
        const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
        return isFirefox;
    }
    setFireFoxClasses() {
        const browserIsFirefox = this.isFirefox();
        const input = this.getInput();
        const iconWrapper = this.el.shadowRoot.querySelector(".icon__wrapper");
        if (browserIsFirefox) {
            input.classList.add("firefox__classes");
            iconWrapper.classList.add("firefox__classes");
        }
        else if (input.classList.contains("firefox__classes")) {
            input.classList.remove("firefox__classes");
            iconWrapper.classList.remove("firefox__classes");
        }
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-date-picker", await framework);
        }
        this.setFireFoxClasses();
    }
    componentWillUpdate() {
        if (this.value) {
            this.getDate({ target: { value: this.value } });
        }
    }
    // formResetCallback() {
    //   this.internals.setFormValue(null);
    // }
    render() {
        return (h("div", { key: 'c012b90fdbb54a2fceb919c65a4c1703a140cfe6', class: `date__picker-container ${this.error ? "error" : ""} ${this.disabled ? "disabled" : ""}` }, h("label", { key: 'edc1c275125e427b4dac448507d6dfcf12a8c123', class: "label__wrapper", htmlFor: this.inputId }, this.label?.trim(), h("span", { key: 'd84ba225c6c3c5281dd896758d7c22a308a921b6', class: `asterisk ${this.required ? "required" : ""} ${this.error ? "error" : ""}` }, "*")), h("div", { key: '2b20b0c19aee685303a823b23b81b179c43200f3', class: `input__wrapper ${this.size === "l" ? "large" : "small"} ${this.disabled ? "disabled" : ""}` }, h("input", { key: '34dfea85e5f7e8e5dff738344781b84ef487568f', type: this.type, autocomplete: this.autocomplete, class: `date__picker-input ${this.error ? "error" : ""} ${this.success ? "success" : ""}`, disabled: this.disabled ? true : undefined, "aria-invalid": this.error ? true : undefined, "aria-label": this.ariaLabel, max: this.max, min: this.min, value: this.value, required: this.required, onChange: (e) => this.getDate(e) }), h("div", { key: '4907fb288f5a285afd87b49f4e262f3856bc30b8', class: "icon__wrapper", tabIndex: this.isFirefox() ? 0 : undefined, onKeyDown: (e) => this.handleIconKeyDown(e) }, h("ifx-icon", { key: '6f1673724fd9f2fbafa06ffbbe9077e20af57ea6', icon: "calendar16", "aria-hidden": "true" }))), this.caption?.trim() && (h("div", { key: 'c31292b72751311d5d05b274c020d6af71c67b2c', class: "caption__wrapper" }, this.caption.trim()))));
    }
};
let datePickerId = 0;
DatePicker.style = datePickerCss();

export { DatePicker as ifx_date_picker };
//# sourceMappingURL=ifx-date-picker.entry.js.map

//# sourceMappingURL=ifx-date-picker.entry.js.map