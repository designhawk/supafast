import { h } from "@stencil/core";
export class Step {
    complete = false;
    disabled = false;
    error = false;
    lastStep = false;
    stepId = 1;
    stepperState = {
        activeStep: 1,
        showStepNumber: false,
        variant: "default",
        indicatorPosition: "left",
    };
    active;
    clickable = false;
    onStepChange(event) {
        const previousActiveStep = event.detail.previousActiveStep;
        if (previousActiveStep === this.stepId && this.error) {
            this.clickable = true;
        }
    }
    updateCurrentStep(newStepperState) {
        this.active = newStepperState.activeStep === this.stepId;
    }
    updateErrorState() {
        if (this.active) {
            this.error = false;
        }
    }
    handleStepClick() {
        if (!this.disabled &&
            this.stepperState.variant !== "compact" &&
            (this.clickable || this.complete)) {
            this.stepperState.setActiveStep(this.stepId, true);
        }
    }
    handleStepKeyDown(event) {
        if (!this.disabled &&
            this.stepperState.variant !== "compact" &&
            (this.clickable || this.complete) &&
            event.key === "Enter") {
            this.stepperState.setActiveStep(this.stepId, true);
        }
    }
    stopOnClickPropogation(event) {
        if (this.disabled) {
            event.stopPropagation();
        }
    }
    render() {
        return (h("div", { key: '6eb47b6c6eb18914bb43303de02932b181a723ab', "aria-current": this.active ? "step" : false, "aria-disabled": this.active || this.complete ? false : true, onClick: (e) => this.stopOnClickPropogation(e), class: `step-wrapper ${this.stepId === 1 ? "first-step" : ""} 
                        ${this.error ? "error" : ""}
                        ${this.stepperState.variant}
                        ${this.complete ? "complete" : ""}
                        ${this.lastStep ? "last-step" : ""}
                        indicator-${this.stepperState.indicatorPosition}
                        ${this.active ? "active" : ""}
                        ${this.clickable ? "clickable" : ""}
                        ${this.disabled ? "disabled" : ""}` }, h("div", { key: '967cc762254a0830dfde1646a9fbaaad17a2f0e3', class: "step-icon-wrapper" }, this.stepperState.variant !== "compact" && (h("span", { key: '487c6304e23d1c6b72c25c199730830547a86d32', class: "step-connector-l" })), this.stepperState.variant !== "compact" &&
            (!this.error || (this.error && this.active)) && (h("div", { key: '4bc537571aca9f2cbd946dfcb993ac0c5ba3e509', class: "step-icon" }, this.stepperState.showStepNumber &&
            !this.complete &&
            !this.active
            ? this.stepId
            : "", this.complete && !this.active && (h("ifx-icon", { key: 'a84eeec2b999ea30712b60b71b56de1bdad84f65', icon: "check16" })), this.active && h("span", { key: '5b5a077d73cfd63a79c887133f4911cb3338c172', class: "active-indic" }))), this.stepperState.variant !== "compact" &&
            this.error &&
            !this.active && (h("ifx-icon", { key: 'ffe3e588b8312917e244e7ab3a77453e1f448fea', class: "error-icon", icon: "warningF16" })), this.stepperState.variant !== "compact" && (h("span", { key: '4306f9d8aff16d2a8e87e3d4b59c93bd6b1ca3ab', class: `step-connector-r ${this.active ? "active" : ""}` }))), 
        /* Step labels */
        (this.stepperState.variant !== "compact" ||
            (this.stepperState.variant === "compact" &&
                (this.active ||
                    this.stepId === this.stepperState.activeStep + 1))) && (h("div", { key: '71d82ed109b8f5f0f63d6bfeee80ad39cec0a052', tabIndex: !this.disabled && this.complete && !this.active ? 0 : -1, class: `step-label ${this.stepperState.variant === "compact" ? (this.active ? "curr-label" : "next-label") : ""}`, onClick: () => {
                this.handleStepClick();
            }, onKeyDown: (e) => {
                this.handleStepKeyDown(e);
            } }, this.stepperState.variant !== "compact" && h("slot", { key: '908f81da6852610cfe79afc325ff7baff40e46e7' }), this.stepperState.variant === "compact" && !this.active
            ? "Next: "
            : "", this.stepperState.variant === "compact" && h("slot", { key: '9df00263f4142f060e4d311b4f90cb8ad6ad58dd' })))));
    }
    static get is() { return "ifx-step"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["step.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["step.css"]
        };
    }
    static get properties() {
        return {
            "complete": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
                "attribute": "complete",
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
                "optional": true,
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
            "error": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
                "attribute": "error",
                "defaultValue": "false"
            },
            "lastStep": {
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
                "attribute": "last-step",
                "defaultValue": "false"
            },
            "stepId": {
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
                "attribute": "step-id",
                "defaultValue": "1"
            },
            "stepperState": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "StepperState",
                    "resolved": "StepperState",
                    "references": {
                        "StepperState": {
                            "location": "import",
                            "path": "../interfaces",
                            "id": "src/components/stepper/interfaces.tsx::StepperState",
                            "referenceLocation": "StepperState"
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
                "defaultValue": "{\n\t\tactiveStep: 1,\n\t\tshowStepNumber: false,\n\t\tvariant: \"default\",\n\t\tindicatorPosition: \"left\",\n\t}"
            }
        };
    }
    static get states() {
        return {
            "active": {},
            "clickable": {}
        };
    }
    static get watchers() {
        return [{
                "propName": "stepperState",
                "methodName": "updateCurrentStep"
            }, {
                "propName": "active",
                "methodName": "updateErrorState"
            }];
    }
    static get listeners() {
        return [{
                "name": "ifxChange",
                "method": "onStepChange",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=step.js.map
