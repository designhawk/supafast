import { r as registerInstance, c as createEvent, a as getElement, h, d as Host } from './index-CA_siwAQ.js';
import { g as getIcon } from './icons-e2ZcgK7p.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const infineonIconStencilCss = () => `ifx-icon{display:inline-flex;justify-content:center}ifx-icon:empty{display:none}`;

const InfineonIconStencil = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.consoleError = createEvent(this, "consoleError", 7);
    }
    get el() { return getElement(this); }
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
    static get watchers() { return {
        "icon": [{
                "updateIcon": 0
            }]
    }; }
};
InfineonIconStencil.style = infineonIconStencilCss();

export { InfineonIconStencil as ifx_icon };
//# sourceMappingURL=ifx-icon.entry.js.map

//# sourceMappingURL=ifx-icon.entry.js.map