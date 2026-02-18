'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const alertCss = () => `:host{display:block}.alert__info-wrapper{display:flex;padding:16px 24px;font-family:var(--ifx-font-family);box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1019607843)}.alert__info-wrapper .info__text-wrapper{display:flex;flex-direction:column;gap:8px;width:100%}.alert__info-wrapper .info__text-wrapper .info__headline-wrapper{display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}.alert__info-wrapper .info__text-wrapper .info__headline-wrapper,.alert__info-wrapper .info__text-wrapper .info__description-wrapper{color:#1D1D1D;font-size:16px;font-style:normal;font-weight:600;line-height:24px}.alert__info-wrapper .info__text-wrapper .info__headline-wrapper ::slotted(p),.alert__info-wrapper .info__text-wrapper .info__description-wrapper ::slotted(p){padding:0;margin:0}.alert__info-wrapper .info__text-wrapper .info__description-wrapper{font-weight:400}.alert__info-wrapper .close-icon-wrapper{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start}.alert__info-wrapper .close-icon-wrapper button{all:unset;display:flex;align-items:center;justify-content:center;line-height:0;color:#1D1D1D;height:24px;width:24px}.alert__info-wrapper .close-icon-wrapper button:focus{outline:2px solid #0A8276;outline-offset:2px}.alert{display:flex;border:1px solid #0A8276;border-radius:1px;color:#1D1D1D;background-color:#FFFFFF;font-family:var(--ifx-font-family);box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1019607843)}.alert .close-icon-wrapper{display:flex;align-items:center;justify-content:center;min-width:40px}.alert .close-icon-wrapper button{all:unset;display:flex;align-items:center;justify-content:center;line-height:0;color:#1D1D1D;height:24px;width:24px}.alert .close-icon-wrapper button:focus{outline:2px solid #0A8276;outline-offset:2px}.alert .icon-wrapper{position:relative;min-width:48px;display:flex;justify-content:center;align-items:center;background-color:#0A8276}.alert .alert-text{font-size:16px;width:100%;padding:12px 0px 12px 12px;color:#1D1D1D;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:anywhere;}.alert.primary{border:1px solid #0A8276}.alert.primary .icon-wrapper{background-color:#0A8276;color:#FFFFFF}.alert.success{border:1px solid #4CA460}.alert.success .icon-wrapper{background-color:#4CA460;color:#FFFFFF}.alert.danger{border:1px solid #CD002F}.alert.danger .icon-wrapper{background-color:#CD002F;color:#FFFFFF}.alert.warning{border:1px solid #E16B25}.alert.warning .icon-wrapper{background-color:#E16B25;color:#FFFFFF}.close-icon-wrapper ifx-icon:hover{cursor:pointer}`;

const Alert = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxClose = index.createEvent(this, "ifxClose", 7);
    }
    get el() { return index.getElement(this); }
    variant = "primary";
    icon;
    ifxClose;
    closable = true;
    AriaLive = "assertive";
    uniqueId;
    alertTypeDescription = {
        primary: "Neutral alert",
        success: "Success Alert",
        danger: "Error Alert",
        warning: "Warning Alert",
        info: "Neutral alert",
    };
    handleClose() {
        this.ifxClose.emit();
    }
    renderCloseButton() {
        return (index.h("div", { class: "close-icon-wrapper" }, index.h("button", { onClick: this.handleClose.bind(this), "aria-label": "Dismiss alert" }, index.h("ifx-icon", { icon: "cross-16" }))));
    }
    generateUniqueId(prefix = "id") {
        return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
    }
    componentWillLoad() {
        if (!this.uniqueId) {
            this.uniqueId = this.generateUniqueId("alert");
        }
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = await tracking.detectFramework();
            tracking.trackComponent("ifx-alert", framework);
        }
    }
    render() {
        return this.variant === "info" ? (index.h("div", { class: "alert__info-wrapper", role: "alert", "aria-live": this.AriaLive, "aria-describedby": this.alertTypeDescription[this.variant], "aria-labelledby": "alert-text alert-description" }, index.h("div", { class: "info__text-wrapper" }, index.h("div", { class: "info__headline-wrapper" }, index.h("slot", { name: "headline" })), index.h("div", { id: `alert-description-${this.uniqueId}`, class: "info__description-wrapper" }, index.h("slot", { name: "desc" }))), this.closable ? this.renderCloseButton() : null)) : (index.h("div", { class: `alert ${this.variant}`, role: "alert" }, this.icon && (index.h("div", { class: "icon-wrapper" }, index.h("ifx-icon", { icon: this.icon }))), index.h("div", { class: "alert-text", id: `alert-text-${this.uniqueId}` }, index.h("slot", null)), this.closable ? this.renderCloseButton() : null));
    }
};
Alert.style = alertCss();

const templateCss = () => `.react__template-wrapper{display:flex;width:300px;height:200px;border-radius:3px;border:1px solid #ccc}.react__template-wrapper.hide{display:none}.react__template-wrapper:hover{cursor:pointer}.template__page-wrapper{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.template__page-wrapper .repository__url{text-decoration:none}.input__fields-wrapper{display:flex;flex-direction:column;gap:10px}.details__wrapper{display:flex;flex-direction:column;gap:10px}.selection__buttons-wrapper{display:flex;gap:10px;padding-top:10px;align-items:center}.selection__buttons-wrapper .vue__label{color:#ccc}.selection__buttons-wrapper label:not(.vue__label):hover{cursor:pointer}.selection__buttons-wrapper .selection__input{display:flex;align-items:center;gap:5px}.selection__buttons-wrapper .selection__input input{margin:0;height:20px;width:20px}.selection__buttons-wrapper .selection__input input:hover:not(.vue__input){cursor:pointer}.image__wrapper img{position:relative;width:300px;height:100%;border-radius:3px;object-fit:contain;transition:transform 0.2s}.image__wrapper img:hover{transform:scale(2);top:50px;z-index:100}`;

const Template = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.toggleTemplates = index.createEvent(this, "toggleTemplates", 7);
        this.fieldError = index.createEvent(this, "fieldError", 7);
    }
    get el() { return index.getElement(this); }
    repoDetails = {
        name: "",
        desc: "",
        framework: "",
    };
    repoUrl;
    showDetails = false;
    isTemplatePage = false;
    isLoading = true;
    repoError;
    name;
    toggleTemplates;
    fieldError;
    thumbnail;
    clientId = "Ov23lixmXiNTTNb6V5W6";
    redirectUri = "https://infineon.github.io/infineon-design-system-stencil/?path=/docs/dds-templates--development";
    scope = "repo workflow";
    state = "template123";
    authUser() {
        const authorizationUrl = `https://github.com/login/oauth/authorize?` +
            `client_id=${this.clientId}&` +
            `redirect_uri=${this.redirectUri}&` +
            `scope=${this.scope}&` +
            `state=${this.state}`;
        window.open(authorizationUrl, "_blank");
    }
    componentDidLoad() {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const { templateName } = this.getLocalStorageValues();
        if (code && this.name === templateName) {
            this.isTemplatePage = true;
            this.toggleTemplates.emit("details");
            this.getUserToken(code);
        }
    }
    getLocalStorageValues() {
        const repoName = localStorage.getItem("repo_name");
        const repoDesc = localStorage.getItem("repo_desc");
        const repoFramework = localStorage.getItem("repo_framework");
        const templateName = localStorage.getItem("selectedTemplate");
        return { repoName, repoDesc, repoFramework, templateName };
    }
    async getUserToken(authCode) {
        const { repoName, repoDesc, repoFramework, templateName } = this.getLocalStorageValues();
        fetch(`https://ddstemplate-srv.cfapps.eu10-004.hana.ondemand.com/token/${authCode}/${repoName}/${repoDesc}/${repoFramework}/${templateName}`)
            .then((response) => {
            if (response.ok) {
                return response.text();
            }
            else {
                return response.text().then((errorMessage) => {
                    throw new Error(errorMessage);
                });
            }
        })
            .then((data) => {
            if (data) {
                this.isLoading = false;
                this.repoUrl = data;
                localStorage.clear();
            }
        })
            .catch((error) => {
            this.repoError = error.message;
            console.error("Error:", error.message);
        });
    }
    handleUserInput(e, type) {
        if (type === "name") {
            this.repoDetails = { ...this.repoDetails, name: e.target.value };
        }
        else if (type === "desc") {
            this.repoDetails = { ...this.repoDetails, desc: e.target.value };
        }
        else if (type === "framework") {
            this.repoDetails = { ...this.repoDetails, framework: e.target.value };
        }
    }
    submitUserData() {
        if (this.repoDetails.name &&
            this.repoDetails.desc &&
            this.repoDetails.framework) {
            localStorage.setItem("repo_name", this.repoDetails.name);
            localStorage.setItem("repo_desc", this.repoDetails.desc);
            localStorage.setItem("repo_framework", this.repoDetails.framework);
            localStorage.setItem("selectedTemplate", this.name);
            this.fieldError.emit(false);
            this.authUser();
        }
        else {
            this.fieldError.emit("All fields are mandatory");
        }
    }
    togglePadding(action) {
        let parent = this.el.parentElement;
        if (parent) {
            const rootNode = parent.getRootNode();
            if (rootNode instanceof ShadowRoot) {
                parent = rootNode.host.parentElement;
            }
            else {
                parent = parent.parentElement;
            }
            if (action === "remove") {
                parent.parentElement.style.padding = "0px";
            }
            else if (action === "add") {
                parent.parentElement.style.padding = "4rem 20px";
            }
        }
    }
    handleCurrentTemplate(e) {
        if (e && !this.showDetails) {
            this.togglePadding("remove");
            const targetTemplate = e.currentTarget;
            this.toggleTemplates.emit(targetTemplate);
            this.showDetails = true;
        }
    }
    async toggleTemplate(currTemp) {
        const templateWrapper = this.el.shadowRoot.querySelector(".react__template-wrapper");
        if (templateWrapper) {
            if (!templateWrapper.classList.contains("hide") && currTemp) {
                if (templateWrapper !== currTemp) {
                    templateWrapper.classList.add("hide");
                }
            }
            else {
                if (this.showDetails) {
                    this.showDetails = false;
                }
                this.togglePadding("add");
                templateWrapper.classList.remove("hide");
            }
        }
    }
    render() {
        return (index.h("div", { key: '2c16282d5deef34472e21d600e34e1e03dad022c' }, this.isTemplatePage ? (index.h("div", { class: "template__page-wrapper" }, !this.repoUrl && !this.repoError && (index.h("div", null, index.h("h3", null, "Your repository is getting ready.."), index.h("p", null, "This will only take a minute."))), this.isLoading && !this.repoError && (index.h("div", null, index.h("ifx-spinner", { variant: "default", size: "s" }))), this.repoUrl && (index.h("ifx-link", { href: this.repoUrl, target: "_parent", size: "m", variant: "underlined" }, "Your repository")), this.repoError && index.h("div", null, this.repoError))) : (index.h("div", { class: "react__template-container" }, index.h("div", { class: "react__template-wrapper", onClick: (e) => this.handleCurrentTemplate(e) }, index.h("div", { class: "image__wrapper" }, index.h("img", { src: this.thumbnail }))), this.showDetails && (index.h("div", { class: "details__wrapper" }, index.h("div", { class: "selection__buttons-wrapper" }, index.h("div", { class: "selection__input" }, index.h("input", { type: "radio", id: "react", name: "chosen_framework", value: "react", onInput: (e) => this.handleUserInput(e, "framework") }), index.h("label", { htmlFor: "react" }, "React")), index.h("div", { class: "selection__input vue" }, index.h("input", { class: "vue__input", disabled: true, type: "radio", id: "vue", name: "chosen_framework", value: "vue", onInput: (e) => this.handleUserInput(e, "framework") }), index.h("label", { class: "vue__label", htmlFor: "vue" }, "Vue"), " ", "(Soon)")), index.h("div", { class: "input__fields-wrapper" }, index.h("ifx-text-field", { required: true, onInput: (e) => this.handleUserInput(e, "name"), size: "m", icon: "c-info-16", placeholder: "Your repository name" }, "Repository Name"), index.h("ifx-text-field", { required: true, size: "m", icon: "c-info-16", onInput: (e) => this.handleUserInput(e, "desc"), placeholder: "Your repository description" }, "Repository Description"), index.h("ifx-button", { fullWidth: true, onClick: () => this.submitUserData(), variant: "primary" }, "Generate template"))))))));
    }
};
Template.style = templateCss();

exports.ifx_alert = Alert;
exports.ifx_template = Template;
//# sourceMappingURL=ifx-alert.ifx-template.entry.cjs.js.map

//# sourceMappingURL=ifx-alert_2.cjs.entry.js.map