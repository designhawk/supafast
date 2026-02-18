'use strict';

var index = require('./index-BfM4jcLt.js');
var icons = require('./icons-DhiOuGyy.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const infineonIconStencilCss = () => `ifx-icon{display:inline-flex;justify-content:center}ifx-icon:empty{display:none}`;

const InfineonIconStencil = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.consoleError = index.createEvent(this, "consoleError", 7);
    }
    get el() { return index.getElement(this); }
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
        const parentPathToVnode = index.h("path", parentPath);
        svgPaths.push(parentPathToVnode);
        if (htmlPath.firstChild) {
            const paths = htmlPath.querySelectorAll("path");
            const pathLength = htmlPath.querySelectorAll("path").length;
            for (let i = 0; i < pathLength; i++) {
                const pathToObject = this.convertHtmlToObject(paths[i]);
                const objToVnode = index.h("path", pathToObject);
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
        return (index.h("svg", { class: "inline-svg", width: width, height: height, xmlns: "http://www.w3.org/2000/svg", fill: fill, viewBox: viewBox }, ...svgPath));
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
        this.ifxIcon = icons.getIcon(iconName);
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
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            if (!this.isInsideAgGrid(this.el) && !this.isInsideChoices(this.el)) {
                const framework = tracking.detectFramework();
                tracking.trackComponent("ifx-icon", await framework);
            }
        }
    }
    render() {
        return index.h(index.Host, { key: 'f903beb9af4c46c85e57c0fd6454d63d351e0580' }, this.constructIcon());
    }
    static get watchers() { return {
        "icon": [{
                "updateIcon": 0
            }]
    }; }
};
InfineonIconStencil.style = infineonIconStencilCss();

exports.ifx_icon = InfineonIconStencil;
//# sourceMappingURL=ifx-icon.entry.cjs.js.map

//# sourceMappingURL=ifx-icon.cjs.entry.js.map