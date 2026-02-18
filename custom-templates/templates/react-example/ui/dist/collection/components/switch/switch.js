import { h, } from "@stencil/core";
import { isNestedInIfxComponent } from "../..//shared/utils/dom-utils";
import { detectFramework } from "../..//shared/utils/framework-detection";
import { trackComponent } from "../../shared/utils/tracking";
/**
 * A toggle switch component for binary on/off states.
 *
 * This component is form-associated, meaning it can participate in HTML forms
 * just like native form controls. It supports form validation, form reset,
 * and browser autofill/restore functionality.
 *
 *
 * Code organization follows the Stencil Style Guide:
 * https://stenciljs.com/docs/style-guide
 *
 * 1. Own Properties (internal, not exposed)
 * 2. @Element (reference to host)
 * 3. @State (internal reactive state)
 * 4. @Prop (public API properties)
 * 5. @Event (emitted events)
 * 6. Lifecycle methods
 * 7. @Listen decorators
 * 8. @Method (public methods)
 * 9. Private methods
 * 10. render()
 *
 * Framework Integration:
 * - Vue: Supports v-model binding on the 'checked' property
 * - Angular: Supports [(ngModel)] and reactive forms (formControl)
 * - React: Standard prop binding and event handling
 *
 * Configuration in stencil.config.ts enables framework-specific bindings.
 */
export class Switch {
    // 1. Own Properties - internal only, not exposed on host element
    initialChecked;
    // 2. Reference to Host Element - used for shadow DOM queries and nesting checks
    el;
    // 3. State Variables - internal reactive state
    // (none - this component uses @Prop instead)
    // 4. Public Properties - exposed as both properties and attributes
    /**
     * Sets the checked state of the switch.
     * @default false
     */
    checked = false;
    // @Watch goes right after the @Prop it monitors - keeps related code together
    onCheckedChange(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.checked = newValue;
            this.updateFormValue();
        }
    }
    /**
     * Disables user interaction when true.
     * @default false
     */
    disabled = false;
    /**
     * Form field name.
     * @default ""
     */
    name = "";
    /**
     * Form field value when checked.
     * If not set, defaults to "on" (standard checkbox behavior).
     * @default "on"
     */
    value = "on";
    // ElementInternals for form association - enables participation in HTML forms
    internals;
    // 5. Events - custom events emitted by the component
    /**
     * Emitted when checked state changes.
     */
    ifxChange;
    // 6. Lifecycle Methods - ordered by execution flow
    componentWillLoad() {
        // Remember initial state for form reset
        this.initialChecked = this.checked;
        // Set initial form value when component loads
        this.updateFormValue();
    }
    async componentDidLoad() {
        // Only track top-level components to avoid duplicate analytics
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-switch", await framework);
        }
        this.toggleLabelGap();
    }
    /**
     * Form-Associated Lifecycle Callbacks
     * ------------------------------------
     * These are called by the browser to integrate with native form behavior.
     * See: https://stenciljs.com/docs/form-associated
     *
     * Note: formAssociatedCallback and formDisabledCallback are not implemented
     * as they're not needed for this component. They would only be useful if we
     * needed to react to form association changes or support fieldset-level disabling.
     */
    /**
     * Called when the form is reset.
     * Resets the switch to its initial state and clears form value.
     */
    formResetCallback() {
        this.checked = this.initialChecked;
        this.updateFormValue();
    }
    /**
     * Called when the browser restores form state (e.g., browser autofill or back button).
     * @param state - The saved state to restore
     * @param mode - "restore" (browser restart/navigation) or "autocomplete" (autofill)
     */
    formStateRestoreCallback(state, _mode) {
        if (state) {
            this.checked = true;
            this.updateFormValue();
        }
        else {
            this.checked = false;
            this.internals.setFormValue(null);
        }
    }
    // 7. Listeners
    // (none - this component handles events inline in render)
    // 8. Public Methods - MUST be async, exposed on host element
    /**
     * Returns the current checked state.
     */
    async isChecked() {
        return this.checked;
    }
    /**
     * Sets the checked state.
     * @param checked - New checked state.
     */
    async setChecked(checked) {
        this.checked = checked;
        return Promise.resolve();
    }
    /**
     * Toggles the checked state.
     * @returns Resolves when the toggle is complete.
     */
    async toggle() {
        return Promise.resolve(this.toggleSwitch());
    }
    // 9. Private Methods - internal helpers, not callable externally
    handleKeyDown(event) {
        if (this.disabled)
            return;
        if (event.key === "Enter" || event.key === " ") {
            this.toggleSwitch();
        }
    }
    toggleSwitch() {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.updateFormValue();
        this.ifxChange.emit(this.checked);
        return this.checked;
    }
    /**
     * Updates the form value based on the current checked state.
     * Called whenever checked state changes to keep form data in sync.
     */
    updateFormValue() {
        if (this.checked) {
            this.internals.setFormValue(this.value);
        }
        else {
            this.internals.setFormValue(null);
        }
    }
    toggleLabelGap() {
        const slot = this.el.shadowRoot.querySelector("slot");
        const container = this.el.shadowRoot.querySelector(".container");
        if (slot.assignedNodes().length) {
            container.classList.add("gap");
        }
        else {
            container.classList.remove("gap");
        }
    }
    // 10. render() - always last, called when state/props change
    render() {
        return (h("div", { key: 'e7fca418018b3852de480b7dd76d9a5b0255e33c', class: "container", role: "switch", "aria-checked": this.checked ? "true" : "false", "aria-disabled": this.disabled ? "true" : "false", "aria-labelledby": "switch-label", tabIndex: this.disabled ? -1 : 0, onClick: () => this.toggleSwitch(), onKeyDown: (event) => this.handleKeyDown(event) }, h("div", { key: 'd656f05fd9ab19a5807c7591212f6a1e312dc036', class: `switch__checkbox-container ${this.checked ? "checked" : ""} ${this.disabled ? "disabled" : ""}` }, h("div", { key: '3bfd7296ddf13db84b34fc0ea5697904eebb94e7', class: "switch__checkbox-wrapper" }, h("input", { key: 'ca6ac50abd325b006651dd22205822911ce3b350', type: "checkbox", hidden: true, name: this.name, disabled: this.disabled, checked: this.checked, value: this.value }), h("div", { key: '783f4a62a811f37f01b5a2eb522854bb6db5c41d', class: `switch ${this.checked ? "checked" : ""} ${this.disabled ? "disabled" : ""}` }))), h("div", { key: '34518eec5f0eda6cc109a4c73895da01d4ae26fc', class: `switch__label-wrapper ${this.disabled ? "disabled" : ""}` }, h("label", { key: 'd196c0c4fb7188571ea3890520f6221b3791822e', htmlFor: "switch" }, h("slot", { key: '574daab8938c8f2221b93e5514e9d86d559645a2', onSlotchange: () => this.toggleLabelGap() })))));
    }
    static get is() { return "ifx-switch"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get originalStyleUrls() {
        return {
            "$": ["switch.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["switch.css"]
        };
    }
    static get properties() {
        return {
            "checked": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Sets the checked state of the switch."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "checked",
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
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Disables user interaction when true."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            },
            "name": {
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
                    "tags": [{
                            "name": "default",
                            "text": "\"\""
                        }],
                    "text": "Form field name."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "name",
                "defaultValue": "\"\""
            },
            "value": {
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
                    "tags": [{
                            "name": "default",
                            "text": "\"on\""
                        }],
                    "text": "Form field value when checked.\nIf not set, defaults to \"on\" (standard checkbox behavior)."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "value",
                "defaultValue": "\"on\""
            }
        };
    }
    static get events() {
        return [{
                "method": "ifxChange",
                "name": "ifxChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when checked state changes."
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "isChecked": {
                "complexType": {
                    "signature": "() => Promise<boolean>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "Returns the current checked state.",
                    "tags": []
                }
            },
            "setChecked": {
                "complexType": {
                    "signature": "(checked: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "checked",
                            "type": "boolean",
                            "docs": "- New checked state."
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Sets the checked state.",
                    "tags": [{
                            "name": "param",
                            "text": "checked - New checked state."
                        }]
                }
            },
            "toggle": {
                "complexType": {
                    "signature": "() => Promise<boolean>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "Toggles the checked state.",
                    "tags": [{
                            "name": "returns",
                            "text": "Resolves when the toggle is complete."
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "checked",
                "methodName": "onCheckedChange"
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=switch.js.map
