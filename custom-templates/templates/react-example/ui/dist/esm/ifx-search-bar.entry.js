import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const searchBarCss = () => `:host{width:100%;display:flex}.search-bar{box-sizing:border-box;height:40px;background-color:#FFFFFF;display:flex;flex-direction:row;align-items:center;width:100%;font-family:var(--ifx-font-family)}.search-bar.closed{display:flex;width:auto;justify-content:flex-start}.search-bar .search-bar-wrapper{display:flex;align-items:center;gap:16px;width:100%}.search-bar .search-bar-wrapper a{text-decoration:none;font-size:1rem;font-style:normal;font-weight:600;line-height:1.5rem;color:#0A8276;cursor:pointer}.search-bar .search-bar-wrapper a:focus{outline:none;box-shadow:0 0 0 2px #FFFFFF, 0 0 0 4px #0A8276}.search-bar .search-bar-wrapper ifx-search-field{width:100%}.search-bar .search-bar__icon-wrapper{display:none;flex-direction:row;align-items:center}.search-bar .search-bar__icon-wrapper ifx-icon:hover{cursor:pointer}.search-bar.closed .search-bar__icon-wrapper{display:flex}.search-bar.closed .search-bar-wrapper{display:none}`;

const SearchBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxInput = createEvent(this, "ifxInput", 7);
        this.ifxOpen = createEvent(this, "ifxOpen", 7);
    }
    isOpen = true;
    disabled = false;
    internalState;
    value;
    maxlength;
    ifxInput;
    ifxOpen;
    autocomplete = "on";
    get el() { return getElement(this); }
    async onNavbarMobile() {
        this.ifxOpen.emit(false);
        this.internalState = false;
    }
    handlePropChange() {
        this.internalState = this.isOpen;
    }
    handleCloseButton = () => {
        this.internalState = !this.internalState;
        this.ifxOpen.emit(this.internalState);
    };
    setInitialState() {
        this.internalState = this.isOpen;
    }
    componentWillLoad() {
        this.setInitialState();
        this.ifxOpen.emit(this.internalState);
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-search-bar", await framework);
        }
    }
    handleInput(event) {
        this.value = event.detail;
    }
    handleFocus = () => {
        this.internalState = true;
    };
    render() {
        return (h("div", { key: '26b0a7ad01f87e1e1c425fec07c71dbf1c9faacf', role: "search", "aria-label": "a search field for user input", "aria-value": this.value, "aria-disabled": this.disabled, class: `search-bar ${this.internalState ? "open" : "closed"}` }, this.internalState ? (h("div", { class: "search-bar-wrapper" }, h("ifx-search-field", { autocomplete: this.autocomplete, disabled: this.disabled, value: this.value, maxlength: this.maxlength, onIfxInput: this.handleInput.bind(this) }, h("ifx-icon", { icon: "search-16", slot: "search-icon" })), h("a", { "aria-label": "Close button", href: "javascript:void(0)", onClick: this.handleCloseButton }, "Close"))) : (h("div", { class: "search-bar_icon-wrapper", onClick: this.handleCloseButton }, h("ifx-icon", { icon: "search-16" })))));
    }
    static get watchers() { return {
        "isOpen": [{
                "handlePropChange": 0
            }]
    }; }
};
SearchBar.style = searchBarCss();

export { SearchBar as ifx_search_bar };
//# sourceMappingURL=ifx-search-bar.entry.js.map

//# sourceMappingURL=ifx-search-bar.entry.js.map