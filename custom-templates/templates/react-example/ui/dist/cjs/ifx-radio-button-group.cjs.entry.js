'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const radioButtonGroupCss = () => `.radio-button-group-container{display:flex;flex-direction:column}.radio-button-group{display:flex;gap:8px}.radio-button-group.horizontal{flex-direction:row;column-gap:12px}.radio-button-group.vertical{flex-direction:column;row-gap:12px}.group-label{font-size:1rem;color:#1D1D1D;line-height:1.5rem;font-weight:400;margin-bottom:8px;text-align:left;text-underline-position:from-font;text-decoration-skip-ink:none}.group-label .required{color:#575352;margin-left:4px}.group-label .required.error{color:#CD002F}.caption{margin-top:8px;align-self:flex-start;display:flex;width:100%;column-gap:8px;justify-content:space-between;align-items:center}.caption.default{color:#1D1D1D}.caption.error{color:#CD002F}.caption-text{font-size:0.75rem;line-height:1rem;flex:1;text-align:left;text-underline-position:from-font;text-decoration-skip-ink:none}.caption-icon{flex:0;display:flex}`;

const RadioButtonGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    errorStates = new Map();
    get el() { return index.getElement(this); }
    alignment = "vertical";
    size;
    showGroupLabel;
    groupLabelText = "Group Label Text";
    showCaption;
    captionText;
    showCaptionIcon;
    required = false;
    hasErrors = false;
    handleRadioButtonError(event) {
        const radioButton = event.target;
        if (radioButton.tagName.toLowerCase() === "ifx-radio-button") {
            this.errorStates.set(radioButton, event.detail);
            this.updateHasErrors();
        }
    }
    // Method to set the error state of all radio-butttons in the group
    async setGroupError(error) {
        const radioButtons = Array.from(this.el.querySelectorAll("ifx-radio-button"));
        radioButtons.forEach((radioButton) => {
            radioButton.error = error;
        });
    }
    componentWillLoad() {
        this.initializeState();
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-radio-button-group", await framework);
        }
    }
    handleSlotChange = () => {
        this.initializeState();
    };
    initializeState() {
        this.errorStates.clear();
        const radioButtons = Array.from(this.el.querySelectorAll("ifx-radio-button"));
        radioButtons.forEach((radioButton) => {
            if (!this.errorStates.has(radioButton)) {
                this.errorStates.set(radioButton, radioButton.error || false);
            }
        });
        this.updateHasErrors();
    }
    updateHasErrors() {
        console.log("here");
        this.hasErrors = Array.from(this.errorStates.values()).some((error) => error);
    }
    render() {
        return (index.h("div", { key: '7cbbca7c5cb1553c4e8a60074ef3d910351d1809', class: "radio-button-group-container" }, this.showGroupLabel && (index.h("div", { key: '8639379ff19abfb650bca7111d3bf0d9860d54fb', class: "group-label" }, this.groupLabelText, this.required && (index.h("span", { key: '26f529030297a0ab8becef74c66a86f9633b31cb', class: `required ${this.hasErrors ? "error" : ""}` }, "*")))), index.h("div", { key: 'ea9ec7e428a9e962af4f495218aa6a6738f45da5', class: `radio-button-group ${this.alignment} ${this.size}` }, index.h("slot", { key: '0e16b32c71a5b69f2797d52451c24403d66aac36', onSlotchange: this.handleSlotChange })), this.showCaption ? (index.h("div", { class: `caption ${this.hasErrors ? "error" : "default"}` }, this.showCaptionIcon ? (index.h("div", { class: "caption-icon" }, index.h("ifx-icon", { icon: "c-info-16" }))) : (""), index.h("div", { class: "caption-text" }, this.captionText))) : ("")));
    }
};
RadioButtonGroup.style = radioButtonGroupCss();

exports.ifx_radio_button_group = RadioButtonGroup;
//# sourceMappingURL=ifx-radio-button-group.entry.cjs.js.map

//# sourceMappingURL=ifx-radio-button-group.cjs.entry.js.map