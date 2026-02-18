// dropdown-separator.tsx
import { h } from "@stencil/core";
export class DropdownHeader {
    render() {
        return (h("div", { key: 'ad7f59091f6fb31b1941f0948bc61b9707c91fb2', class: "dropdown-header" }, h("span", { key: '71402d91012e90d1c5eca4b92989aae83dc3d16b' }, h("slot", { key: 'eb3394b40cb8cfface86f28e73392656d0c5adc2' }))));
    }
    static get is() { return "ifx-dropdown-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["dropdown-header.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["dropdown-header.css"]
        };
    }
}
//# sourceMappingURL=dropdown-header.js.map
