'use strict';

var index = require('./index-BfM4jcLt.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const actionListCss = () => `.action-list{background:#FFFFFF;border-radius:0;border:1px solid #EEEDED;overflow:hidden;display:flex;flex-direction:column}`;

const ActionList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /**
     * Aria label for accessibility support
     */
    listAriaLabel;
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-action-list", await framework);
        }
    }
    render() {
        return (index.h("div", { key: '65f1a9439f9d7c3465d657eefcea947e177f6c2a', class: "action-list", role: "list", "aria-label": this.listAriaLabel }, index.h("slot", { key: '53b65f0e8f9b727de1ff0bf06140b60e4ba85928' })));
    }
};
ActionList.style = actionListCss();

exports.ifx_action_list = ActionList;
//# sourceMappingURL=ifx-action-list.entry.cjs.js.map

//# sourceMappingURL=ifx-action-list.cjs.entry.js.map