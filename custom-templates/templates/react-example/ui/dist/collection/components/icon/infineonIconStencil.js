import { getIcon } from "@infineon/infineon-icons";
import { Host, h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class InfineonIconStencil {
    el;
    icon = "";
    ifxIcon;
    internalIcon;
    consoleError;
    updateIcon(newIcon) {
        this.internalIcon = newIcon;
        this.setIcon();
    }
    convertStringToHtml(htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.firstChild;
    }
    F;
    convertHtmlToObject(htmlElement) {
        const pathToObject = Array.from(htmlElement.attributes, ({ name, value }) => ({ name, value })).reduce((acc, current) => {
            acc[current.name] = current.value;
            return acc;
        }, {});
        return pathToObject;
    }
    convertPathsToVnode(htmlPath) {
        const svgPaths = [];
        const parentPath = this.convertHtmlToObject(htmlPath);
        const parentPathToVnode = h("path", parentPath);
        svgPaths.push(parentPathToVnode);
        if (htmlPath.firstChild) {
            const paths = htmlPath.querySelectorAll("path");
            const pathLength = htmlPath.querySelectorAll("path").length;
            for (let i = 0; i < pathLength; i++) {
                const pathToObject = this.convertHtmlToObject(paths[i]);
                const objToVnode = h("path", pathToObject);
                svgPaths.push(objToVnode);
            }
        }
        return svgPaths;
    }
    getSVG(svgPath) {
        const htmlPath = this.convertStringToHtml(this.ifxIcon);
        const width = htmlPath.getAttribute("width");
        const height = htmlPath.getAttribute("height");
        const fill = htmlPath.getAttribute("fill");
        const viewBox = htmlPath.getAttribute("viewBox");
        return (h("svg", { class: "inline-svg", width: width, height: height, xmlns: "http://www.w3.org/2000/svg", fill: fill, viewBox: viewBox }, ...svgPath));
    }
    constructIcon() {
        if (this.ifxIcon) {
            const htmlPath = this.convertStringToHtml(this.ifxIcon);
            const svgPath = this.convertPathsToVnode(htmlPath);
            const SVG = this.getSVG(svgPath);
            return SVG;
        }
        else if (this.icon !== "") {
            this.consoleError.emit(true);
            return;
        }
        else {
            return;
        }
    }
    setIcon() {
        const toCamelCase = (str) => str
            .replace(/[-_]+(.)/g, (_, chr) => chr.toUpperCase()) // handle - and _ to uppercase
            .replace(/^(.)/, (m) => m.toLowerCase()); // ensure first letter is lowercase
        const iconName = toCamelCase(this.internalIcon);
        this.ifxIcon = getIcon(iconName);
    }
    isInsideAgGrid(el) {
        let current = el;
        while (current) {
            if (current.className?.toLowerCase().startsWith("ag-")) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }
    isInsideChoices(el) {
        let current = el;
        while (current) {
            if (current.className?.toLowerCase().startsWith("choices__")) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }
    componentWillLoad() {
        this.internalIcon = this.icon;
        this.setIcon();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            if (!this.isInsideAgGrid(this.el) && !this.isInsideChoices(this.el)) {
                const framework = detectFramework();
                trackComponent("ifx-icon", await framework);
            }
        }
    }
    render() {
        return h(Host, { key: 'f903beb9af4c46c85e57c0fd6454d63d351e0580' }, this.constructIcon());
    }
    static get is() { return "ifx-icon"; }
    static get originalStyleUrls() {
        return {
            "$": ["./infineonIconStencil.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["infineonIconStencil.css"]
        };
    }
    static get properties() {
        return {
            "icon": {
                "type": "string",
                "mutable": true,
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
                "attribute": "icon",
                "defaultValue": "\"\""
            },
            "ifxIcon": {
                "type": "any",
                "mutable": true,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
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
                "attribute": "ifx-icon"
            }
        };
    }
    static get states() {
        return {
            "internalIcon": {}
        };
    }
    static get events() {
        return [{
                "method": "consoleError",
                "name": "consoleError",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "icon",
                "methodName": "updateIcon"
            }];
    }
}
//# sourceMappingURL=infineonIconStencil.js.map
