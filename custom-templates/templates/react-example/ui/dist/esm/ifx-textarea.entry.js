import { r as registerInstance, c as createEvent, a as getElement, h, d as Host } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const textareaCss = () => `:host{display:flex;flex-direction:column;width:100%}.wrapper__label{color:#1D1D1D;font:400 1rem/1.5rem "Source Sans 3"}.wrapper__label .required{margin-left:4px}.wrapper__label .required.error{color:#CD002F}:host(.wrapper--disabled) .wrapper__label{color:#BFBBBB}.wrapper__textarea{width:100%}.wrapper__textarea.fullWidth{width:100%}.wrapper__textarea.fullWidth textarea{width:100%;box-sizing:border-box}.wrapper__textarea textarea{border:1px solid #8D8786;border-radius:1px;padding:8px 16px;background-color:#FFFFFF;color:#1D1D1D;font:400 1rem/1.5rem "Source Sans 3";transition:all 100ms ease;transition-property:border-color}.wrapper__textarea textarea:hover{border:1px solid #575352}.wrapper__textarea textarea:focus-within{outline:2px solid #0A8276;outline-offset:0}:host(.wrapper--error) .wrapper__textarea textarea{border:1px solid #CD002F}:host(.wrapper--disabled) .wrapper__textarea textarea{border:1px solid #BFBBBB;background-color:#BFBBBB}:host(.wrapper--disabled) .wrapper__textarea textarea::placeholder{color:#FFFFFF}.wrapper__caption{color:#1D1D1D;font:400 0.75rem/1rem "Source Sans 3"}:host(.wrapper--error) .wrapper__caption{color:#CD002F}:host(.wrapper--disabled) .wrapper__caption{color:#BFBBBB}`;

const TextArea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxInput = createEvent(this, "ifxInput", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    inputId = `ifx-textarea-${++textareaId}`;
    internals;
    ifxInput;
    get el() { return getElement(this); }
    caption;
    cols;
    disabled = false;
    error = false;
    label;
    maxlength;
    name;
    placeholder;
    required = false;
    readOnly = false;
    resize = "both";
    rows;
    value;
    wrap = "soft";
    fullWidth = "false";
    async reset() {
        this.resetTextarea();
    }
    handleComponentWidth() {
        const textareaWrapper = this.el.shadowRoot.querySelector(".wrapper__textarea");
        const isFullWidth = this.fullWidth.toLowerCase() === "true";
        if (isFullWidth) {
            textareaWrapper.classList.add("fullWidth");
        }
        else if (textareaWrapper.classList.contains("fullWidth")) {
            textareaWrapper.classList.remove("fullWidth");
        }
    }
    componentDidRender() {
        this.handleComponentWidth();
    }
    formResetCallback() {
        this.resetTextarea();
        //this.internals.setFormValue("");
    }
    handleOnInput(e) {
        this.value = e.target.value;
        //this.internals.setFormValue(this.value);
        this.ifxInput.emit(this.value);
    }
    resetTextarea() {
        this.value = "";
        //this.internals.setValidity({});
        //this.internals.setFormValue('');
    }
    // componentWillLoad() {
    // 	this.internals.setFormValue(this.value);
    // }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-textarea", await framework);
        }
    }
    render() {
        return (h(Host, { key: '263a7e49f07c0424d9dbb915218ffc2391fdb922', class: `wrapper--${this.error ? "error" : ""} wrapper--${this.disabled && !this.error ? "disabled" : ""}` }, h("label", { key: 'aeecebe5a14512c8340ae3422524692538bc2882', class: "wrapper__label", htmlFor: this.inputId }, this.label?.trim(), this.required && (h("span", { key: '159a84ca943d5506b45c34d415a01abc2bf8ad7b', class: `required ${this.error ? "error" : ""}` }, "*"))), h("div", { key: '65ad541848a381a3b802160cd3017a384a04d913', class: "wrapper__textarea" }, h("textarea", { key: '6a54256bbd90894cb38f6ed2522cdcf27a9615bc', "aria-label": "a textarea", "aria-value": this.value, "aria-disabled": this.disabled && !this.error, id: this.inputId, style: { resize: this.resize }, name: this.name ? this.name : this.inputId, cols: this.cols, rows: this.rows, maxlength: this.maxlength, wrap: this.wrap, disabled: this.disabled && !this.error, readonly: this.readOnly, placeholder: this.placeholder, value: this.value, onInput: (e) => this.handleOnInput(e) })), this.caption?.trim() && (h("div", { key: '637289ccc1ab074d1431f04aba4f25eeb97a69c6', class: "wrapper__caption" }, this.caption.trim()))));
    }
};
let textareaId = 0;
TextArea.style = textareaCss();

export { TextArea as ifx_textarea };
//# sourceMappingURL=ifx-textarea.entry.js.map

//# sourceMappingURL=ifx-textarea.entry.js.map