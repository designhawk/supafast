import { icons } from "@infineon/infineon-icons";
import { h } from "@stencil/core";
export class IconsPreview {
    iconsArray = [];
    isCopied = false;
    copiedIndex;
    copiedIcon = null;
    htmlTag = '<ifx-icon icon="calendar-16"></ifx-icon>';
    iconName = `""`;
    searchTerm = "";
    el;
    handleCopiedText() {
        this.isCopied = true;
        setTimeout(() => {
            this.isCopied = false;
        }, 2000);
    }
    copyIconText(icon) {
        this.htmlTag = `<ifx-icon icon="${icon}"></ifx-icon>`;
        this.iconName = `"${icon}"`;
        this.copiedIcon = icon;
    }
    copyHtmlString() {
        const copiedTag = `<ifx-icon icon=${this.iconName}></ifx-icon>`;
        navigator.clipboard.writeText(copiedTag);
        this.handleCopiedText();
    }
    get filteredIcons() {
        const term = this.searchTerm.toLowerCase().trim();
        if (!term)
            return this.iconsArray;
        return this.iconsArray.filter((icon) => icon.toLowerCase().includes(term));
    }
    getIconIndex(icon) {
        return this.iconsArray.indexOf(icon);
    }
    handleIconFilter() {
        const searchField = this.el.shadowRoot.querySelector("#search__field");
        searchField.addEventListener("ifxInput", (e) => {
            this.searchTerm = e.detail;
        });
    }
    componentWillLoad() {
        this.iconsArray = Object.keys(icons);
    }
    componentDidLoad() {
        this.handleIconFilter();
    }
    render() {
        return (h("div", { key: 'ca5d80b6693e2557eed2324d5aee6df460959c1f', class: "container" }, h("div", { key: 'b704cf3de231d50825d71d2725d9eaa318da6968', class: "alert__wrapper" }, h("ifx-notification", { key: '8a5ea1626ddaa074e9ee87f12cd042317625e348', icon: "c-check-16", variant: "neutral", "link-text": "Figma icon library", "link-href": "https://www.figma.com/design/yWwaLoqsWLWygDxXfvdym9/Infineon-DDS-%7C-UI-icon-library?node-id=13284-1289&p=f&t=SD6EdmXaSufsjPCv-0", "link-target": "_blank" }, "You can also find the UI icons in Figma for use in mockups.")), h("div", { key: '5aa7effdb80f8b9fb4528d486fd193968e2ccc02', class: "snippet__wrapper" }, h("div", { key: '93a8356d4c6559b62e3878a969c3d0758b07857f', class: "search__wrapper" }, h("ifx-search-field", { key: 'ba7be2afcd7e45dcaea54c73bded60cb87dfc020', id: "search__field", size: "m", "show-delete-icon": "true", value: "", autocomplete: "on", placeholder: "Search icon" })), h("div", { key: '7e5a3a476b00c9dd4150a7fa2112843f1a7ea9e6', class: "html-wrapper" }, h("span", { key: '67b2ed074fb7659297829fc9bb045f59507c8cd5', class: "html-tag" }, "<"), h("span", { key: '6cfae81935bc09f832d954ecab6b8442e00091ae', class: "component-name" }, "ifx-icon"), h("span", { key: 'a5d3c4fd99f85908c27a7ed289278360ed48aaa1', class: "attribute-name" }, " icon"), "=", h("span", { key: '36035c68df5db62fa8aed394ff9ca70f7980df90', class: "attribute-value" }, this.iconName), h("span", { key: '7be3842c04971c50047bb715ca4940f9b2898963', class: "html-tag" }, ">"), h("span", { key: '52bf77ed9dbd96f34961984bccbed510decf23cb', class: "html-tag" }, "</"), h("span", { key: 'f502eab4a5e4e4b068b97f74360622d8fd33aea1', class: "component-name" }, "ifx-icon"), h("span", { key: '1784e8d693a9051da2eb1ca170128d5a4c3b4766', class: "html-tag" }, ">"), h("button", { key: '123aaf5e5378405aaf5d4cdbddec4e60128745ba', onClick: () => this.copyHtmlString() }, this.isCopied ? "Copied" : "Copy"))), h("div", { key: '131e92a3dceff91c5418e585fdd916ed0f3c3ac5', class: "preview__container" }, this.filteredIcons.map((icon) => (h("div", { key: icon, class: `preview__container-item ${this.isCopied && this.copiedIcon === icon ? "copied" : ""}`, onClick: () => this.copyIconText(icon) }, h("ifx-icon", { icon: icon })))), this.filteredIcons.length === 0 && (h("div", { key: '53e48fac834cc40af2f967d9cd08bc20fdbe5bb7', class: "no-results" }, "No icons found matching \"", this.searchTerm, "\"")))));
    }
    static get is() { return "ifx-icons-preview"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["./icons-preview.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["icons-preview.css"]
        };
    }
    static get states() {
        return {
            "iconsArray": {},
            "isCopied": {},
            "copiedIndex": {},
            "copiedIcon": {},
            "htmlTag": {},
            "iconName": {},
            "searchTerm": {}
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=icons-preview.js.map
