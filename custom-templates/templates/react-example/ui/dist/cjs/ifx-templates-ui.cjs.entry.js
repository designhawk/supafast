'use strict';

var index = require('./index-BfM4jcLt.js');

const templatesUiCss = () => `*{padding:0;margin:0}.templates__container{display:flex;flex-direction:column;align-items:center}.templates__container .back__btn-wrapper{display:none}.templates__container .back__btn-wrapper.show{display:flex;justify-content:space-between;width:100%}.templates__container .back__btn-wrapper .alert__wrapper{display:none}.templates__container .back__btn-wrapper .alert__wrapper.show{display:block}.templates__container .templates__wrapper{display:flex;padding:20px 0px;gap:20px;flex-wrap:wrap}.templates__container .templates__title.hide{display:none}`;

const TemplatesUI = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    tableTemplate = index.getAssetPath(`https://raw.githubusercontent.com/Infineon/public-assets/refs/heads/main/table_template.png`);
    wizardTemplate = index.getAssetPath(`https://raw.githubusercontent.com/Infineon/public-assets/refs/heads/main/wizard_template.png`);
    toggleTemplate(currTemp) {
        const templates = this.el.shadowRoot
            .querySelector(".templates__wrapper")
            .querySelectorAll("ifx-template");
        templates.forEach((template) => {
            template.toggleTemplate(currTemp);
        });
    }
    handleError(e) {
        const alertWrapper = this.el.shadowRoot.querySelector(".alert__wrapper");
        if (e.detail) {
            alertWrapper.classList.add("show");
        }
        else {
            alertWrapper.classList.remove("show");
        }
    }
    filterTemplates(e) {
        const title = this.el.shadowRoot.querySelector(".templates__title");
        const backBtn = this.el.shadowRoot.querySelector(".back__btn-wrapper");
        if (e.detail) {
            title.classList.add("hide");
            if (e.detail !== "details") {
                backBtn.classList.add("show");
            }
            this.toggleTemplate(e.detail);
        }
        else {
            title.classList.remove("hide");
            backBtn.classList.remove("show");
            this.toggleTemplate(null);
        }
    }
    closeAlert() {
        const alertWrapper = this.el.shadowRoot.querySelector(".alert__wrapper");
        alertWrapper.classList.remove("show");
    }
    render() {
        return (index.h("div", { key: '18630753fff2e75580821000b2cbe0cae1da5cf7', class: "templates__container" }, index.h("div", { key: '068cc32f6321cad4028d4aa2e9a276493dbcd6e0', class: "back__btn-wrapper" }, index.h("ifx-icon-button", { key: '5165d1c90dc79c27ed5a13ce22f0d821d75cf4ad', onClick: () => this.filterTemplates(false), shape: "round", variant: "tertiary", icon: "arrow-left-16", target: "_blank", size: "m" }), index.h("div", { key: '7ef1a0efc8bbae179e45d731dba21fb7f7a68f35', class: "alert__wrapper" }, index.h("ifx-alert", { key: '5f637b48e9d69f1bf938ee72da416ce364447455', onClick: () => this.closeAlert(), "aria-live": "assertive", variant: "danger", icon: "c-info-16" }, "All fields are mandatory"))), index.h("h2", { key: '71afdadc9192444a18f96bdd36eb362d1e391db3', class: "templates__title" }, "Choose your template"), index.h("div", { key: 'ea2ca75ff294e36e110a5640455665e1a40ce138', class: "templates__wrapper" }, index.h("ifx-template", { key: 'aa1d96bb4c8868481e0a49374b8efc6ad327c047', name: "template-01", thumbnail: this.tableTemplate }), index.h("ifx-template", { key: '1823a7c8a86e463e871253e6d5012ccddc579424', name: "template-02", thumbnail: this.wizardTemplate }))));
    }
    static get assetsDirs() { return ["assets"]; }
};
TemplatesUI.style = templatesUiCss();

exports.ifx_templates_ui = TemplatesUI;
//# sourceMappingURL=ifx-templates-ui.entry.cjs.js.map

//# sourceMappingURL=ifx-templates-ui.cjs.entry.js.map