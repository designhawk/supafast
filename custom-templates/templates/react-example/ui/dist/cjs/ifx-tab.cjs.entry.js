'use strict';

var index = require('./index-BfM4jcLt.js');

const tabCss = () => `:host{display:block}`;

const IfxTab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.tabHeaderChange = index.createEvent(this, "tabHeaderChange", 7);
    }
    get el() { return index.getElement(this); }
    header;
    disabled;
    icon = "";
    iconPosition = "left";
    tabHeaderChange;
    componentWillUpdate() {
        this.tabHeaderChange.emit(this.header);
    }
    render() {
        return index.h("slot", { key: '52881ff0f68688076dc05e78386a96780d5af603' });
    }
};
IfxTab.style = tabCss();

exports.ifx_tab = IfxTab;
//# sourceMappingURL=ifx-tab.entry.cjs.js.map

//# sourceMappingURL=ifx-tab.cjs.entry.js.map