'use strict';

const isNestedInIfxComponent = (el) => {
    let parent = el.parentNode;
    while (parent) {
        if (parent instanceof ShadowRoot) {
            parent = parent.host;
            continue;
        }
        if (parent instanceof HTMLElement &&
            parent.tagName.toLowerCase().startsWith("ifx")) {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
};

exports.isNestedInIfxComponent = isNestedInIfxComponent;
//# sourceMappingURL=dom-utils-BdvOgC2b.js.map

//# sourceMappingURL=dom-utils-BdvOgC2b.js.map