import { h, } from "@stencil/core";
import classNames from "classnames";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
export class SearchField {
    el;
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
        const index = lowerText.indexOf(lowerQuery);
        if (index === -1) {
            return text;
        }
        const before = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const after = text.substring(index + query.length);
        return [before, h("strong", null, match), after];
    }
    componentWillLoad() {
        this.loadSearchHistory();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-search-field", await framework);
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
        return (h("div", { key: '66c476bf3422fcbd9635cc915f04899df42662bd', "aria-disabled": this.disabled, "aria-value": this.value, class: "search-field" }, h("div", { key: '3187e061b558cfdd03fdef7fbf70149d77280cca', class: this.getWrapperClassNames(), tabindex: 1, onClick: () => this.focusInput() }, h("ifx-icon", { key: '0ed0693f1bf7221e4cb5871adf539f2ceeb16eac', icon: "search-16", class: "search-icon" }), h("input", { key: 'b7d3ddb78f427826d71e1df1f3f32eab6029775d', ref: (el) => (this.inputElement = el), type: "text", autocomplete: this.autocomplete, onInput: () => this.handleInput(), onFocus: () => this.focusInput(), onBlur: () => this.blurInput(), placeholder: this.placeholder, disabled: this.disabled, maxlength: this.maxlength, value: this.value, role: "combobox", "aria-controls": this.showDropdown ? "suggestions-dropdown" : undefined, "aria-expanded": this.showDropdown, "aria-autocomplete": "list", "aria-haspopup": "listbox", "aria-label": this.ariaLabel, "aria-labelledby": this.ariaLabelledBy, "aria-describedby": this.ariaDescribedBy, "aria-owns": this.showDropdown ? "suggestions-dropdown" : undefined, "aria-activedescendant": this.selectedSuggestionIndex >= 0
                ? `suggestion-${this.selectedSuggestionIndex}`
                : undefined }), this.showDeleteIcon && this.showDeleteIconInternalState ? (h("ifx-icon", { icon: "cRemove16", class: "delete-icon", onClick: this.handleDelete, role: "button", tabindex: "0", "aria-label": this.deleteIconAriaLabel, onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.handleDelete();
                }
            } })) : null), this.showDropdown && this.filteredSuggestions.length > 0 && (h("div", { key: 'fedbb257a482a8a9ad688d963dfce2e3c8dfa2ec', ref: (el) => (this.dropdownElement = el), id: "suggestions-dropdown", class: "suggestions-dropdown", role: "listbox", "aria-label": this.dropdownAriaLabel }, this.isShowingOnlyHistory() && (h("div", { key: '5cc34117bc963dbf35fe7b7c4b4e7883081c6754', class: "suggestions-header" }, this.historyHeaderText)), this.filteredSuggestions.map((suggestion, index) => (h("div", { key: suggestion.id, id: `suggestion-${index}`, class: this.getSuggestionClassNames(index), role: "option", "aria-selected": index === this.selectedSuggestionIndex, "aria-label": `${suggestion.type === "history" ? this.historyItemAriaLabel : this.suggestionAriaLabel}: ${suggestion.text}${suggestion.scope ? `, ${suggestion.scope}` : ""}${suggestion.resultCount ? `, ${suggestion.resultCount} results` : ""}`, onClick: () => this.selectSuggestion(suggestion), onMouseEnter: () => (this.selectedSuggestionIndex = index) }, h("div", { class: "suggestion-content" }, suggestion.type === "history" && (h("ifx-icon", { icon: "history-16", class: "suggestion-icon suggestion-icon--history" })), suggestion.type === "suggestion" && (h("ifx-icon", { icon: "search-16", class: "suggestion-icon suggestion-icon--suggestion" })), h("span", { class: "suggestion-text" }, h("span", { class: "suggestion-main-text" }, this.renderHighlightedText(suggestion.text, this.value)), suggestion.scope && (h("span", { class: "suggestion-scope" }, "\u2013 ", suggestion.scope))), suggestion.resultCount !== undefined && suggestion.scope && (h("span", { class: "suggestion-count" }, suggestion.resultCount)), suggestion.type === "history" && (h("ifx-icon", { icon: "cross16", class: "suggestion-delete-icon", role: "button", tabindex: "0", "aria-label": `${this.historyDeleteAriaLabel}: ${suggestion.text}`, onClick: (event) => this.handleHistoryDelete(event, suggestion.text), onKeyDown: (event) => {
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
        return classNames(`search-field__wrapper`, `search-field__wrapper ${this.getSizeClass()}`, `${this.isFocused ? "focused" : ""}`, `${this.showDropdown ? "dropdown-open" : ""}`, `${this.disabled ? "disabled" : ""}`);
    }
    getSuggestionClassNames(index) {
        return classNames("suggestion-item", {
            "suggestion-item--selected": index === this.selectedSuggestionIndex,
            "suggestion-item--history": this.filteredSuggestions[index]?.type === "history",
        });
    }
    static get is() { return "ifx-search-field"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["search-field.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["search-field.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "\"\""
            },
            "suggestions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "SuggestionItem[]",
                    "resolved": "SuggestionItem[]",
                    "references": {
                        "SuggestionItem": {
                            "location": "local",
                            "path": "C:/Users/Aditya/Documents/GitHub/quests-main/custom-templates/ui/components/src/components/search-field/search-field.tsx",
                            "id": "src/components/search-field/search-field.tsx::SuggestionItem"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "showSuggestions": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-suggestions",
                "defaultValue": "false"
            },
            "maxSuggestions": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "max-suggestions",
                "defaultValue": "10"
            },
            "maxHistoryItems": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "max-history-items",
                "defaultValue": "5"
            },
            "enableHistory": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "enable-history",
                "defaultValue": "true"
            },
            "historyKey": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "history-key",
                "defaultValue": "\"ifx-search-history\""
            },
            "historyHeaderText": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "history-header-text",
                "defaultValue": "\"Recent Searches\""
            },
            "ariaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "aria-label",
                "defaultValue": "\"Search Field\""
            },
            "ariaLabelledBy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "aria-labelled-by"
            },
            "ariaDescribedBy": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | null",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "aria-described-by"
            },
            "deleteIconAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "delete-icon-aria-label",
                "defaultValue": "\"Clear search\""
            },
            "historyDeleteAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "history-delete-aria-label",
                "defaultValue": "\"Remove from history\""
            },
            "dropdownAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "dropdown-aria-label",
                "defaultValue": "\"Search suggestions and history\""
            },
            "suggestionAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "suggestion-aria-label",
                "defaultValue": "\"Search suggestion\""
            },
            "historyItemAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "history-item-aria-label",
                "defaultValue": "\"Search history item\""
            },
            "showDeleteIcon": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "show-delete-icon",
                "defaultValue": "false"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "size",
                "defaultValue": "\"l\""
            },
            "placeholder": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "placeholder",
                "defaultValue": "\"Search...\""
            },
            "autocomplete": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "autocomplete",
                "defaultValue": "\"off\""
            },
            "maxlength": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "maxlength",
                "defaultValue": "null"
            }
        };
    }
    static get states() {
        return {
            "showDropdown": {},
            "filteredSuggestions": {},
            "selectedSuggestionIndex": {},
            "searchHistory": {},
            "showDeleteIconInternalState": {},
            "isFocused": {}
        };
    }
    static get events() {
        return [{
                "method": "ifxInput",
                "name": "ifxInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "ifxSuggestionRequested",
                "name": "ifxSuggestionRequested",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "ifxSuggestionSelected",
                "name": "ifxSuggestionSelected",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "SuggestionItem",
                    "resolved": "SuggestionItem",
                    "references": {
                        "SuggestionItem": {
                            "location": "local",
                            "path": "C:/Users/Aditya/Documents/GitHub/quests-main/custom-templates/ui/components/src/components/search-field/search-field.tsx",
                            "id": "src/components/search-field/search-field.tsx::SuggestionItem"
                        }
                    }
                }
            }, {
                "method": "ifxFocus",
                "name": "ifxFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "ifxBlur",
                "name": "ifxBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueWatcher"
            }, {
                "propName": "suggestions",
                "methodName": "suggestionsWatcher"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "handleOutsideClick",
                "target": "document",
                "capture": false,
                "passive": true
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=search-field.js.map
