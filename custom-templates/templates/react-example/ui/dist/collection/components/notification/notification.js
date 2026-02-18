import { Host, h } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class Notification {
    el;
    icon;
    variant = "success";
    linkText;
    linkHref;
    linkTarget = "_blank";
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-notification", await framework);
        }
    }
    getClassName() {
        switch (this.variant) {
            case "success":
                return "ifx-notification__wrapper--success";
            case "locked":
                return "ifx-notification__wrapper--locked";
            case "error":
                return "ifx-notification__wrapper--error";
            case "neutral":
                return "ifx-notification__wrapper--neutral";
            default:
                return "ifx-notification__wrapper--success";
        }
    }
    render() {
        return (h(Host, { key: '8efc9cdc52c267e66f8261dea355291e8e82fbc4' }, h("div", { key: '938784ac3ac238dd96baba2d92d8a227b607f658', class: "ifx-notification__wrapper " + this.getClassName() }, h("div", { key: 'c369fc1751a330bb3aee5ae82e0e17263dede85b', class: "ifx-notification__icon" }, h("ifx-icon", { key: '9c8f069846f21996b781eac0e1184fd6b8180ace', icon: this.icon })), h("div", { key: '0979e74ae0491376dc807082d80ee636eebed324', class: "ifx-notification__body" }, h("div", { key: '2b0ab021b3f0ad77f84beb30cb124a9930fad93f', class: "ifx-notification__slot" }, h("slot", { key: '32772af9b57735a974ec8d7a5341aeeaf0dd2905' })), this.linkText && this.linkHref && (h("div", { key: '92342a2e38b70a3422b3518c737b2afca7ddbd09', class: "ifx-notification__link" }, h("ifx-link", { key: 'c2b0235e2a535e2c62b69508b2dd35481c78fcc3', href: this.linkHref, target: this.linkTarget }, this.linkText, h("ifx-icon", { key: 'fb51ff7cfd2dde7e64e5b4b8050b1876444aaf7f', icon: "arrow-right-16" }))))))));
    }
    static get is() { return "ifx-notification"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["notification.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["notification.css"]
        };
    }
    static get properties() {
        return {
            "icon": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "icon"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "NotificationVariant",
                    "resolved": "\"error\" | \"locked\" | \"neutral\" | \"success\"",
                    "references": {
                        "NotificationVariant": {
                            "location": "local",
                            "path": "C:/Users/Aditya/Documents/GitHub/quests-main/custom-templates/ui/components/src/components/notification/notification.tsx",
                            "id": "src/components/notification/notification.tsx::NotificationVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "variant",
                "defaultValue": "\"success\""
            },
            "linkText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "link-text"
            },
            "linkHref": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "link-href"
            },
            "linkTarget": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "link-target",
                "defaultValue": "\"_blank\""
            }
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=notification.js.map
