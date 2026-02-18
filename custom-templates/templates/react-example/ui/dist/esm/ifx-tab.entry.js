import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';

const tabCss = () => `:host{display:block}`;

const IfxTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tabHeaderChange = createEvent(this, "tabHeaderChange", 7);
    }
    get el() { return getElement(this); }
    header;
    disabled;
    icon = "";
    iconPosition = "left";
    tabHeaderChange;
    componentWillUpdate() {
        this.tabHeaderChange.emit(this.header);
    }
    render() {
        return h("slot", { key: '52881ff0f68688076dc05e78386a96780d5af603' });
    }
};
IfxTab.style = tabCss();

export { IfxTab as ifx_tab };
//# sourceMappingURL=ifx-tab.entry.js.map

//# sourceMappingURL=ifx-tab.entry.js.map