import { h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Breadcrumb {
    el;
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
    static get is() { return "ifx-breadcrumb"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["breadcrumb.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["breadcrumb.css"]
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=breadcrumb.js.map
