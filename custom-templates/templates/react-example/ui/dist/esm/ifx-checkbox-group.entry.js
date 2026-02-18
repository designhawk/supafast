import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const checkboxGroupCss = () => `.checkbox-group-container{display:flex;flex-direction:column}.checkbox-group{display:flex;gap:8px}.checkbox-group.horizontal{flex-direction:row;column-gap:12px}.checkbox-group.vertical{flex-direction:column;row-gap:12px}.group-label{font-size:1rem;color:#1D1D1D;line-height:1.5rem;font-weight:400;margin-bottom:8px;text-align:left;text-underline-position:from-font;text-decoration-skip-ink:none}.group-label .required{color:#575352;margin-left:4px}.group-label .required.error{color:#CD002F}.caption{margin-top:8px;align-self:flex-start;display:flex;width:100%;column-gap:8px;justify-content:space-between;align-items:center}.caption.default{color:#1D1D1D}.caption.error{color:#CD002F}.caption-text{font-weight:400;font-size:0.75rem;line-height:1rem;flex:1;text-align:left;text-underline-position:from-font;text-decoration-skip-ink:none}.caption-icon{flex:0;display:flex}`;

const CheckboxGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    errorStates = new Map();
    get el() { return getElement(this); }
    alignment = "vertical";
    size;
    showGroupLabel;
    groupLabelText = "Group Label Text";
    showCaption;
    captionText;
    showCaptionIcon;
    required = false;
    hasErrors = false;
    handleCheckboxError(event) {
        const checkbox = event.target;
        if (checkbox.tagName.toLowerCase() === "ifx-checkbox") {
            this.errorStates.set(checkbox, event.detail);
            this.updateHasErrors();
        }
    }
    // Method to set the error state of all checkboxes in the group
    async setGroupError(error) {
        const checkboxes = Array.from(this.el.querySelectorAll("ifx-checkbox"));
        checkboxes.forEach((checkbox) => {
            checkbox.error = error;
        });
    }
    componentWillLoad() {
        this.initializeState();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-checkbox-group", await framework);
        }
    }
    handleSlotChange = () => {
        this.initializeState();
    };
    initializeState() {
        this.errorStates.clear();
        const checkboxes = Array.from(this.el.querySelectorAll("ifx-checkbox"));
        checkboxes.forEach((checkbox) => {
            if (!this.errorStates.has(checkbox)) {
                this.errorStates.set(checkbox, checkbox.error || false);
            }
        });
        this.updateHasErrors();
    }
    updateHasErrors() {
        this.hasErrors = Array.from(this.errorStates.values()).some((error) => error);
    }
    render() {
        return (h("div", { key: '51bfdc2bee2636245ce0aba5e7ae257aed441673', class: "checkbox-group-container" }, this.showGroupLabel && (h("div", { key: 'd8287707f4e16d7ea086d7782ce7e12d14240748', class: "group-label" }, this.groupLabelText, this.required && (h("span", { key: '9addf6e22c654e66cca934ae8e4404d9c3f1ee0f', class: `required ${this.hasErrors ? "error" : ""}` }, "*")))), h("div", { key: 'd143613a5ffa4bb4e88f83fa9c3e4e9f8303f738', class: `checkbox-group ${this.alignment} ${this.size}` }, h("slot", { key: '34f3a93c0be772f4ba675eb16e4210a281b12a61', onSlotchange: this.handleSlotChange })), this.showCaption ? (h("div", { class: `caption ${this.hasErrors ? "error" : "default"}` }, this.showCaptionIcon ? (h("div", { class: "caption-icon" }, h("ifx-icon", { icon: "c-info-16" }))) : (""), h("div", { class: "caption-text" }, this.captionText))) : ("")));
    }
};
CheckboxGroup.style = checkboxGroupCss();

export { CheckboxGroup as ifx_checkbox_group };
//# sourceMappingURL=ifx-checkbox-group.entry.js.map

//# sourceMappingURL=ifx-checkbox-group.entry.js.map