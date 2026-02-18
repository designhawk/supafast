import { r as registerInstance, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const actionListCss = () => `.action-list{background:#FFFFFF;border-radius:0;border:1px solid #EEEDED;overflow:hidden;display:flex;flex-direction:column}`;

const ActionList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * Aria label for accessibility support
     */
    listAriaLabel;
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-action-list", await framework);
        }
    }
    render() {
        return (h("div", { key: '65f1a9439f9d7c3465d657eefcea947e177f6c2a', class: "action-list", role: "list", "aria-label": this.listAriaLabel }, h("slot", { key: '53b65f0e8f9b727de1ff0bf06140b60e4ba85928' })));
    }
};
ActionList.style = actionListCss();

export { ActionList as ifx_action_list };
//# sourceMappingURL=ifx-action-list.entry.js.map

//# sourceMappingURL=ifx-action-list.entry.js.map