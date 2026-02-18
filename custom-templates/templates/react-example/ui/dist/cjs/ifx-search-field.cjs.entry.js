'use strict';

var index = require('./index-BfM4jcLt.js');
var index$1 = require('./index-Bp6Dd2i1.js');
var domUtils = require('./dom-utils-BdvOgC2b.js');
var tracking = require('./tracking-BPjaTlNR.js');

const searchFieldCss = () => `:host{display:flex}.search-field{box-sizing:border-box;background-color:#FFFFFF;width:100%;font-family:var(--ifx-font-family);position:relative}.search-field .search-field__wrapper{box-sizing:border-box;height:40px;display:flex;align-items:center;border:1px solid #8d8786;border-radius:1px;padding:8px 16px;gap:12px;flex:none;order:0;align-self:stretch;flex-grow:0;position:relative;width:100%;outline:none}.search-field .search-field__wrapper:focus-visible:not(.disabled){outline:2px solid #0A8276;outline-offset:2px}.search-field .search-field__wrapper.search-field__wrapper-s{height:36px}.search-field .search-field__wrapper:hover:not(.focused,:focus){border:1px solid #3c3a39}.search-field .search-field__wrapper .delete-icon{outline:1px solid transparent;right:12px;cursor:pointer}.search-field .search-field__wrapper .delete-icon:focus-visible{outline:2px solid #0A8276;outline-offset:1px}.search-field .search-field__wrapper input[type=text]{font-style:normal;font-weight:400;font-size:16px;color:#8d8786;border:none;width:100%;outline:none;height:16px}.search-field .search-field__wrapper input[type=text]:focus{outline:none;color:#1d1d1d}.search-field .search-field__wrapper input[type=text]:disabled{background:#BFBBBB;color:#FFFFFF}.search-field .search-field__wrapper input[type=text]:disabled::placeholder{color:#FFFFFF}.search-field .search-field__wrapper.disabled{background:#BFBBBB;border:none;color:#FFFFFF}.search-field .search-field__wrapper.disabled:hover{border:none;outline:none}.search-field .search-field__wrapper.disabled .delete-icon{cursor:default}.search-field .search-field__wrapper.disabled .delete-icon:focus-visible{outline:1px solid transparent}.search-field .suggestions-dropdown{position:absolute;top:100%;left:0;right:0;background:#FFFFFF;margin-top:4px;border:1px solid #EEEDED;box-shadow:0px 6px 9px 0px rgba(29, 29, 29, 0.1);z-index:1000;max-height:300px;overflow-y:auto;container-type:inline-size}.search-field .suggestions-dropdown .suggestions-header{font-family:Source Sans 3;font-size:0.8125rem;font-weight:600;line-height:1.25rem;letter-spacing:0.25em;text-transform:uppercase;color:#575352;border-bottom:1px solid #EEEDED;padding:12px 16px}.search-field .suggestions-dropdown .suggestion-item{padding:12px 16px;cursor:pointer;transition:background-color 0.2s ease}.search-field .suggestions-dropdown .suggestion-item:last-child{border-bottom:none}.search-field .suggestions-dropdown .suggestion-item:hover,.search-field .suggestions-dropdown .suggestion-item--selected{background-color:#EEEDED}.search-field .suggestions-dropdown .suggestion-item .suggestion-content{display:flex;align-items:center;gap:12px}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-icon{color:#575352;flex-shrink:0}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-icon--history{color:#575352}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text{flex:1;display:flex;align-items:center;min-width:0}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text .suggestion-main-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:1;min-width:0}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text .suggestion-scope{color:#8D8786;flex-shrink:0;white-space:nowrap;margin-left:2px;font-weight:600;font-size:0.75rem}@container (max-width: 320px){.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text{flex-direction:column;align-items:flex-start}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text .suggestion-main-text{width:100%;max-width:100%}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-text .suggestion-scope{margin-left:0;margin-top:0;width:100%;max-width:100%;overflow:hidden;text-overflow:ellipsis;flex-shrink:1}}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-count{color:#8D8786;margin-left:auto;flex-shrink:0}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-delete-icon{opacity:0;visibility:hidden;transition:opacity 0.2s ease, visibility 0.2s ease;cursor:pointer;margin-left:auto;flex-shrink:0;color:#575352}.search-field .suggestions-dropdown .suggestion-item .suggestion-content .suggestion-delete-icon:hover{color:#3C3A39}.search-field .suggestions-dropdown .suggestion-item:hover .suggestion-delete-icon{opacity:1;visibility:visible}.search-field .search-field__wrapper.dropdown-open{border-radius:1px 1px 0 0;border-color:#0A8276}`;

const SearchField = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.ifxInput = index.createEvent(this, "ifxInput", 7);
        this.ifxSuggestionRequested = index.createEvent(this, "ifxSuggestionRequested", 7);
        this.ifxSuggestionSelected = index.createEvent(this, "ifxSuggestionSelected", 7);
        this.ifxFocus = index.createEvent(this, "ifxFocus", 7);
        this.ifxBlur = index.createEvent(this, "ifxBlur", 7);
    }
    get el() { return index.getElement(this); }
    inputElement;
    dropdownElement;
    value = "";
    suggestions = [];
    showSuggestions = false;
    maxSuggestions = 10;
    maxHistoryItems = 5;
    enableHistory = true;
    historyKey = "ifx-search-history";
    historyHeaderText = "Recent Searches";
    // ARIA Labels and Accessibility Props
    ariaLabel = "Search Field";
    ariaLabelledBy;
    ariaDescribedBy;
    deleteIconAriaLabel = "Clear search";
    historyDeleteAriaLabel = "Remove from history";
    dropdownAriaLabel = "Search suggestions and history";
    suggestionAriaLabel = "Search suggestion";
    historyItemAriaLabel = "Search history item";
    ifxInput;
    ifxSuggestionRequested;
    ifxSuggestionSelected;
    ifxFocus;
    ifxBlur;
    showDropdown = false;
    filteredSuggestions = [];
    selectedSuggestionIndex = -1;
    searchHistory = [];
    showDeleteIcon = false;
    showDeleteIconInternalState = false;
    disabled = false;
    size = "l";
    isFocused = false;
    placeholder = "Search...";
    autocomplete = "off";
    maxlength = null;
    focusEmitted = false;
    handleOutsideClick(event) {
        const path = event.composedPath();
        if (!path.includes(this.inputElement) &&
            !path.includes(this.dropdownElement)) {
            this.hideDropdown();
        }
    }
    handleKeyDown(event) {
        if (!this.showDropdown)
            return;
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                this.navigateSuggestions(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                this.navigateSuggestions(-1);
                break;
            case "Enter":
                event.preventDefault();
                if (this.selectedSuggestionIndex >= 0) {
                    this.selectSuggestion(this.filteredSuggestions[this.selectedSuggestionIndex]);
                }
                else {
                    this.handleSearch();
                }
                break;
            case "Escape":
                this.hideDropdown();
                break;
        }
    }
    valueWatcher(newValue) {
        if (this.inputElement && newValue !== this.inputElement.value) {
            this.inputElement.value = newValue;
        }
        this.updateSuggestions();
    }
    suggestionsWatcher() {
        this.updateSuggestions();
    }
    handleInput = () => {
        const query = this.inputElement.value;
        this.value = query;
        this.ifxInput.emit(this.value);
        if (this.showSuggestions) {
            this.showDropdown = true;
            this.selectedSuggestionIndex = -1;
            this.requestSuggestions(query);
        }
    };
    handleDelete = () => {
        if (!this.disabled) {
            this.inputElement.value = "";
            this.value = "";
            this.ifxInput.emit(this.value);
            this.hideDropdown();
        }
    };
    handleSearch = () => {
        if (this.value.trim() && this.enableHistory) {
            // Only add to history if there are actual results
            if (this.filteredSuggestions.length > 0) {
                this.addToHistory(this.value);
            }
        }
        this.hideDropdown();
    };
    focusInput() {
        // Only emit focus event if it hasn't been emitted already
        if (!this.focusEmitted) {
            this.focusEmitted = true;
            this.isFocused = true;
            this.ifxFocus.emit();
        }
        if (this.showSuggestions) {
            // On focus without input: Show only history
            if (this.value.length === 0) {
                this.showHistoryDropdown();
                // Only show dropdown if history is actually present
                this.showDropdown = this.enableHistory && this.searchHistory.length > 0;
            }
            else {
                // With existing input: Normal suggestion logic
                this.updateSuggestions();
                this.showDropdown = this.filteredSuggestions.length > 0;
            }
        }
    }
    blurInput() {
        setTimeout(() => {
            this.isFocused = false;
            this.focusEmitted = false; // Reset focus flag when blur occurs
            this.ifxBlur.emit();
        }, 150);
    }
    // Public method to update history from external sources
    loadSearchHistory() {
        if (this.enableHistory && typeof localStorage !== "undefined") {
            const stored = localStorage.getItem(this.historyKey);
            this.searchHistory = stored ? JSON.parse(stored) : [];
            // Update suggestions when history is loaded
            this.updateSuggestions();
            // If no input and no history left, close dropdown
            if (this.value.length === 0 && this.searchHistory.length === 0) {
                this.showDropdown = false;
            }
        }
    }
    // Public method to completely clear history
    clearSearchHistory() {
        if (this.enableHistory && typeof localStorage !== "undefined") {
            // Clear from localStorage
            localStorage.removeItem(this.historyKey);
            // Clear internal history
            this.searchHistory = [];
            // Reset all dropdown-relevant states
            this.filteredSuggestions = [];
            this.selectedSuggestionIndex = -1;
            this.showDropdown = false;
            // Update suggestions after reset
            this.updateSuggestions();
        }
    }
    // Suggestion Management Methods
    addToHistory(term) {
        if (!this.enableHistory || !term.trim())
            return;
        const history = [...this.searchHistory];
        const existingIndex = history.indexOf(term);
        if (existingIndex > -1) {
            history.splice(existingIndex, 1);
        }
        history.unshift(term);
        // Limit history to maxHistoryItems (default 5)
        this.searchHistory = history.slice(0, this.maxHistoryItems);
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(this.historyKey, JSON.stringify(this.searchHistory));
        }
    }
    // Remove individual history entry
    removeFromHistory(term) {
        if (!this.enableHistory)
            return;
        const history = [...this.searchHistory];
        const index = history.indexOf(term);
        if (index > -1) {
            history.splice(index, 1);
            this.searchHistory = history;
            // Update localStorage
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(this.historyKey, JSON.stringify(this.searchHistory));
            }
            // Update suggestions after removal
            this.updateSuggestions();
            // Close dropdown if no history remains
            if (this.searchHistory.length === 0 && this.value.length === 0) {
                this.showDropdown = false;
            }
        }
    }
    // Handle click on history delete button
    handleHistoryDelete = (event, term) => {
        event.stopPropagation(); // Prevent selection of the entry
        this.removeFromHistory(term);
    };
    requestSuggestions(query) {
        this.ifxSuggestionRequested.emit(query);
        this.updateSuggestions();
    }
    updateSuggestions() {
        const query = this.value.toLowerCase();
        let suggestions = [];
        if (query.length > 0) {
            // For text input: Mix external suggestions and relevant history
            // 1. Filter external suggestions
            if (this.suggestions && this.suggestions.length > 0) {
                const filteredExternal = this.suggestions.filter((s) => s.text.toLowerCase().includes(query));
                suggestions = [...suggestions, ...filteredExternal];
            }
            // 2. Filter relevant history entries
            if (this.enableHistory && this.searchHistory.length > 0) {
                const filteredHistory = this.searchHistory
                    .filter((term) => term.toLowerCase().includes(query))
                    .map((term, index) => ({
                    id: `history-${index}`,
                    text: term,
                    type: "history",
                }));
                suggestions = [...suggestions, ...filteredHistory];
            }
            // 3. Sort by relevance (exact matches first, then prefix matches)
            suggestions.sort((a, b) => {
                const aText = a.text.toLowerCase();
                const bText = b.text.toLowerCase();
                // Exact match has highest priority
                if (aText === query && bText !== query)
                    return -1;
                if (bText === query && aText !== query)
                    return 1;
                // Prefix match has second highest priority
                const aStartsWith = aText.startsWith(query);
                const bStartsWith = bText.startsWith(query);
                if (aStartsWith && !bStartsWith)
                    return -1;
                if (bStartsWith && !aStartsWith)
                    return 1;
                // With equal relevance: external suggestions before history
                if (a.type === "suggestion" && b.type === "history")
                    return -1;
                if (a.type === "history" && b.type === "suggestion")
                    return 1;
                // Alphabetical sorting as last criterion
                return aText.localeCompare(bText);
            });
        }
        else {
            // For empty query: Show only history (no external suggestions)
            if (this.enableHistory && this.searchHistory.length > 0) {
                const historySuggestions = this.searchHistory.map((term, index) => ({
                    id: `history-${index}`,
                    text: term,
                    type: "history",
                }));
                suggestions = historySuggestions;
            }
            // For empty query DO NOT show external suggestions
        }
        // Remove duplicates based on text and scope combination (history takes precedence over external)
        const uniqueSuggestions = suggestions.reduce((unique, current) => {
            const existingIndex = unique.findIndex((item) => item.text.toLowerCase() === current.text.toLowerCase() &&
                item.scope === current.scope);
            if (existingIndex === -1) {
                unique.push(current);
            }
            else {
                // If already exists, prefer history over external suggestions
                if (current.type === "history" &&
                    unique[existingIndex].type !== "history") {
                    unique[existingIndex] = current;
                }
            }
            return unique;
        }, []);
        this.filteredSuggestions = uniqueSuggestions.slice(0, this.maxSuggestions);
        this.selectedSuggestionIndex = -1;
    }
    navigateSuggestions(direction) {
        const maxIndex = this.filteredSuggestions.length - 1;
        if (direction > 0) {
            this.selectedSuggestionIndex =
                this.selectedSuggestionIndex < maxIndex
                    ? this.selectedSuggestionIndex + 1
                    : 0;
        }
        else {
            this.selectedSuggestionIndex =
                this.selectedSuggestionIndex > 0
                    ? this.selectedSuggestionIndex - 1
                    : maxIndex;
        }
    }
    selectSuggestion(suggestion) {
        this.value = suggestion.text;
        this.inputElement.value = suggestion.text;
        this.ifxSuggestionSelected.emit(suggestion);
        this.ifxInput.emit(this.value);
        if (this.enableHistory) {
            // Always add selected suggestions to history since they are valid results
            this.addToHistory(suggestion.text);
        }
        this.hideDropdown();
    }
    hideDropdown() {
        this.showDropdown = false;
        this.selectedSuggestionIndex = -1;
        this.isFocused = false;
    }
    // Show only history in dropdown (e.g. on focus without input)
    showHistoryDropdown() {
        if (this.enableHistory && this.searchHistory.length > 0) {
            // Show only history entries
            const historySuggestions = this.searchHistory.map((term, index) => ({
                id: `history-${index}`,
                text: term,
                type: "history",
            }));
            this.filteredSuggestions = historySuggestions.slice(0, this.maxSuggestions);
            this.selectedSuggestionIndex = -1;
        }
        else {
            this.filteredSuggestions = [];
        }
    }
    // Check if only history entries are displayed (without text input)
    isShowingOnlyHistory() {
        return (this.value.length === 0 &&
            this.filteredSuggestions.length > 0 &&
            this.filteredSuggestions.every((s) => s.type === "history"));
    }
    // Render text with highlighted matches
    renderHighlightedText(text, query) {
        if (!query || query.length === 0) {
            return text;
        }
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index$1 = lowerText.indexOf(lowerQuery);
        if (index$1 === -1) {
            return text;
        }
        const before = text.substring(0, index$1);
        const match = text.substring(index$1, index$1 + query.length);
        const after = text.substring(index$1 + query.length);
        return [before, index.h("strong", null, match), after];
    }
    componentWillLoad() {
        this.loadSearchHistory();
    }
    async componentDidLoad() {
        if (!domUtils.isNestedInIfxComponent(this.el)) {
            const framework = tracking.detectFramework();
            tracking.trackComponent("ifx-search-field", await framework);
        }
    }
    componentWillUpdate() {
        if (this.value !== "") {
            this.showDeleteIconInternalState = true;
        }
        else
            this.showDeleteIconInternalState = false;
    }
    render() {
        return (index.h("div", { key: '66c476bf3422fcbd9635cc915f04899df42662bd', "aria-disabled": this.disabled, "aria-value": this.value, class: "search-field" }, index.h("div", { key: '3187e061b558cfdd03fdef7fbf70149d77280cca', class: this.getWrapperClassNames(), tabindex: 1, onClick: () => this.focusInput() }, index.h("ifx-icon", { key: '0ed0693f1bf7221e4cb5871adf539f2ceeb16eac', icon: "search-16", class: "search-icon" }), index.h("input", { key: 'b7d3ddb78f427826d71e1df1f3f32eab6029775d', ref: (el) => (this.inputElement = el), type: "text", autocomplete: this.autocomplete, onInput: () => this.handleInput(), onFocus: () => this.focusInput(), onBlur: () => this.blurInput(), placeholder: this.placeholder, disabled: this.disabled, maxlength: this.maxlength, value: this.value, role: "combobox", "aria-controls": this.showDropdown ? "suggestions-dropdown" : undefined, "aria-expanded": this.showDropdown, "aria-autocomplete": "list", "aria-haspopup": "listbox", "aria-label": this.ariaLabel, "aria-labelledby": this.ariaLabelledBy, "aria-describedby": this.ariaDescribedBy, "aria-owns": this.showDropdown ? "suggestions-dropdown" : undefined, "aria-activedescendant": this.selectedSuggestionIndex >= 0
                ? `suggestion-${this.selectedSuggestionIndex}`
                : undefined }), this.showDeleteIcon && this.showDeleteIconInternalState ? (index.h("ifx-icon", { icon: "cRemove16", class: "delete-icon", onClick: this.handleDelete, role: "button", tabindex: "0", "aria-label": this.deleteIconAriaLabel, onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.handleDelete();
                }
            } })) : null), this.showDropdown && this.filteredSuggestions.length > 0 && (index.h("div", { key: 'fedbb257a482a8a9ad688d963dfce2e3c8dfa2ec', ref: (el) => (this.dropdownElement = el), id: "suggestions-dropdown", class: "suggestions-dropdown", role: "listbox", "aria-label": this.dropdownAriaLabel }, this.isShowingOnlyHistory() && (index.h("div", { key: '5cc34117bc963dbf35fe7b7c4b4e7883081c6754', class: "suggestions-header" }, this.historyHeaderText)), this.filteredSuggestions.map((suggestion, index$1) => (index.h("div", { key: suggestion.id, id: `suggestion-${index$1}`, class: this.getSuggestionClassNames(index$1), role: "option", "aria-selected": index$1 === this.selectedSuggestionIndex, "aria-label": `${suggestion.type === "history" ? this.historyItemAriaLabel : this.suggestionAriaLabel}: ${suggestion.text}${suggestion.scope ? `, ${suggestion.scope}` : ""}${suggestion.resultCount ? `, ${suggestion.resultCount} results` : ""}`, onClick: () => this.selectSuggestion(suggestion), onMouseEnter: () => (this.selectedSuggestionIndex = index$1) }, index.h("div", { class: "suggestion-content" }, suggestion.type === "history" && (index.h("ifx-icon", { icon: "history-16", class: "suggestion-icon suggestion-icon--history" })), suggestion.type === "suggestion" && (index.h("ifx-icon", { icon: "search-16", class: "suggestion-icon suggestion-icon--suggestion" })), index.h("span", { class: "suggestion-text" }, index.h("span", { class: "suggestion-main-text" }, this.renderHighlightedText(suggestion.text, this.value)), suggestion.scope && (index.h("span", { class: "suggestion-scope" }, "\u2013 ", suggestion.scope))), suggestion.resultCount !== undefined && suggestion.scope && (index.h("span", { class: "suggestion-count" }, suggestion.resultCount)), suggestion.type === "history" && (index.h("ifx-icon", { icon: "cross16", class: "suggestion-delete-icon", role: "button", tabindex: "0", "aria-label": `${this.historyDeleteAriaLabel}: ${suggestion.text}`, onClick: (event) => this.handleHistoryDelete(event, suggestion.text), onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.handleHistoryDelete(event, suggestion.text);
                }
            } }))))))))));
    }
    getSizeClass() {
        return `${this.size}` === "s" ? "search-field__wrapper-s" : "";
    }
    getWrapperClassNames() {
        return index$1.classNames(`search-field__wrapper`, `search-field__wrapper ${this.getSizeClass()}`, `${this.isFocused ? "focused" : ""}`, `${this.showDropdown ? "dropdown-open" : ""}`, `${this.disabled ? "disabled" : ""}`);
    }
    getSuggestionClassNames(index) {
        return index$1.classNames("suggestion-item", {
            "suggestion-item--selected": index === this.selectedSuggestionIndex,
            "suggestion-item--history": this.filteredSuggestions[index]?.type === "history",
        });
    }
    static get watchers() { return {
        "value": [{
                "valueWatcher": 0
            }],
        "suggestions": [{
                "suggestionsWatcher": 0
            }]
    }; }
};
SearchField.style = searchFieldCss();

exports.ifx_search_field = SearchField;
//# sourceMappingURL=ifx-search-field.entry.cjs.js.map

//# sourceMappingURL=ifx-search-field.cjs.entry.js.map