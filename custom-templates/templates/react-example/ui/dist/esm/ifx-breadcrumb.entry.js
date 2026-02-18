import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const breadcrumbCss = () => `:host{display:flex}.breadcrumb{list-style:none;padding:0px;margin:0px;display:flex;flex-direction:row;font-family:var(--ifx-font-family);font-size:0.875rem;align-items:flex-start}`;

const Breadcrumb = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-breadcrumb", await framework);
        }
        const element = this.el.shadowRoot.firstChild;
        this.validateBreadcrumbItemStructure(element);
    }
    validateBreadcrumbItemStructure(element) {
        if (!element) {
            console.error("element not found");
            return;
        }
        const slot = element.querySelector("slot");
        if (slot) {
            const assignedNodes = slot.assignedNodes();
            for (let i = 0; i < assignedNodes.length; i++) {
                const node = assignedNodes[i];
                if (node.nodeName === "IFX-BREADCRUMB-ITEM") {
                    const breadcrumbItem = node;
                    const breadcrumbItemLabel = breadcrumbItem.querySelector("ifx-breadcrumb-item-label");
                    const breadcrumbDropdown = breadcrumbItem.querySelector("ifx-dropdown-menu");
                    if (breadcrumbItemLabel.hasAttribute("href") && breadcrumbDropdown) {
                        throw new Error("ifx-breadcrumb-item cannot have both a href and a dropdown menu.");
                    }
                }
            }
        }
    }
    render() {
        return (h("nav", { key: 'c6111d3d4723ffd9a11b49a4866a6a9b175f41ec', "aria-label": "Page navigation breadcrumb" }, h("ol", { key: '0c479cf4641038ae6caece71274c02d88b092764', class: "breadcrumb" }, h("slot", { key: '7a6e4dadb75bd82157b02159c975db4404a79b1f' }))));
    }
};
Breadcrumb.style = breadcrumbCss();

export { Breadcrumb as ifx_breadcrumb };
//# sourceMappingURL=ifx-breadcrumb.entry.js.map

//# sourceMappingURL=ifx-breadcrumb.entry.js.map