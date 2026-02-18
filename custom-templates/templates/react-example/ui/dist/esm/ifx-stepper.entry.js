import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CA_siwAQ.js';
import { i as isNestedInIfxComponent } from './dom-utils-CtINY9El.js';
import { d as detectFramework, t as trackComponent } from './tracking-DNHOWgWh.js';

const stepperCss = () => `.stepper{display:flex;align-items:center}.stepper.compact{align-items:center;gap:8px}.stepper.compact.compact-right{flex-direction:row-reverse;text-align:left}.stepper.compact .stepper-wrapper{width:unset;flex-direction:column}.stepper.vertical{height:100%}.stepper.vertical .stepper-wrapper{flex-direction:column;width:unset;height:100%}.stepper-wrapper{display:flex;flex-direction:row;width:100%}.stepper-wrapper ::slotted(*){display:flex;flex:1;justify-content:flex-start}.stepper-progress{display:flex;justify-content:center;align-items:center;font:600 0.875rem/1.25rem "Source Sans 3";min-width:56px;height:56px;border-radius:9999px;background:conic-gradient(#0A8276 var(--pb, 0%), #BFBBBB 0)}.stepper-progress .progress-detail{display:flex;justify-content:center;align-items:center;text-align:center;width:48px;height:48px;border-radius:9999px;background:white}`;

const Stepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ifxChange = createEvent(this, "ifxChange", 7);
    }
    get el() { return getElement(this); }
    ifxChange;
    activeStep = 1;
    indicatorPosition = "left";
    showStepNumber = false;
    variant = "default";
    ariaLabel;
    ariaCurrent;
    stepsCount;
    shouldEmitEvent = true;
    emittedByClick = false;
    onStepChange(event) {
        const steps = this.getSteps();
        const previousActiveStep = steps[event.detail.previousActiveStep - 1];
        if (previousActiveStep && !previousActiveStep.complete) {
            previousActiveStep.setAttribute("error", "true");
        }
    }
    handleActiveStep(newStep, oldStep) {
        const steps = this.getSteps();
        if (!this.shouldEmitEvent) {
            this.shouldEmitEvent = true;
            return;
        }
        // Skipping until the enabled step is found
        if (steps[newStep - 1]) {
            if (!steps[newStep - 1].disabled) {
                this.emitIfxChange(newStep, oldStep);
            }
            else {
                // If coming from higher step number to the lower step number
                if (newStep < oldStep) {
                    let i = newStep;
                    this.shouldEmitEvent = false;
                    while (i >= 1 && steps[i - 1].disabled)
                        i--;
                    // if all the steps are disabled no change.
                    if (i < 1) {
                        this.activeStep = oldStep;
                    }
                    else {
                        this.emitIfxChange(i, oldStep);
                        this.activeStep = i;
                    }
                }
                // If coming from lower step number to the higher step number
                else {
                    let i = newStep;
                    this.shouldEmitEvent = false;
                    while (i <= this.stepsCount && steps[i - 1].disabled)
                        i++;
                    if (i > this.stepsCount) {
                        this.activeStep = oldStep;
                    }
                    else {
                        this.emitIfxChange(i, oldStep);
                        this.activeStep = i;
                    }
                }
            }
        }
    }
    emitIfxChange(activeStep, previousActiveStep) {
        this.ifxChange.emit({
            activeStep: activeStep,
            previousActiveStep: previousActiveStep,
            totalSteps: this.stepsCount,
            emittedByClick: this.emittedByClick,
        });
        this.emittedByClick = false;
    }
    getSteps() {
        const steps = this.el.querySelectorAll("ifx-step");
        return steps;
    }
    addStepIdsToStepsAndCountSteps() {
        const steps = this.getSteps();
        steps[steps.length - 1].lastStep = true;
        for (let i = 0; i < steps.length; i++) {
            steps[i].stepId = i + 1;
        }
        this.stepsCount = steps.length;
    }
    setActiveStep(stepId, setByClick = false) {
        this.emittedByClick = setByClick;
        this.activeStep = stepId;
    }
    setStepsBeforeActiveToComplete() {
        const steps = this.getSteps();
        steps.forEach((step, stepId) => {
            if (stepId + 1 < this.activeStep)
                step.complete = true;
        });
    }
    syncIfxSteps() {
        const steps = this.getSteps();
        for (let i = 0; i < steps.length; i++) {
            const stepperState = {
                activeStep: this.activeStep,
                indicatorPosition: this.indicatorPosition !== "right" ? "left" : "right",
                showStepNumber: this.showStepNumber,
                variant: this.variant !== "compact" && this.variant !== "vertical"
                    ? "default"
                    : this.variant,
                setActiveStep: this.setActiveStep.bind(this),
            };
            steps[i].stepperState = stepperState;
        }
    }
    setInitialActiveStep() {
        this.activeStep = Math.max(1, Math.min(this.stepsCount + (this.variant !== "compact" ? 1 : 0), this.activeStep));
    }
    componentWillLoad() {
        this.addStepIdsToStepsAndCountSteps();
        this.setInitialActiveStep();
        this.setStepsBeforeActiveToComplete();
    }
    async componentDidLoad() {
        if (!isNestedInIfxComponent(this.el)) {
            const framework = detectFramework();
            trackComponent("ifx-stepper", await framework);
        }
        this.syncIfxSteps();
    }
    componentWillUpdate() {
        this.syncIfxSteps();
    }
    render() {
        return (h("div", { key: '44ed5caa2171653734e0002277ce1547920e13a1', "aria-label": this.ariaLabel, "aria-current": this.ariaCurrent, role: "navigation", class: `stepper ${this.variant !== "compact" && this.variant !== "vertical" ? "default" : this.variant} ${this.variant === "compact" ? "compact-" + this.indicatorPosition : ""}` }, 
        /* Progress bar for compact variant. */
        this.variant === "compact" && (h("div", { key: 'dab9f18560d96efecc559f654e49b2632af4c855', class: "stepper-progress" }, h("div", { key: '6e5e672b305997c57375340d20f9de4de1b51cc1', class: "progress-detail" }, `${Math.min(this.activeStep, this.stepsCount)} of ${this.stepsCount}`))), h("div", { key: '65e2c9f82785df44fc06aeb0f7ac5d151f02ff52', class: `stepper-wrapper` }, h("slot", { key: 'bf6563894f9d5ff00ca86bd2fe3286d523d6ab02' }))));
    }
    componentDidRender() {
        /* Updating progress bar in compact version. */
        if (this.variant == "compact") {
            const progressBar = this.el.shadowRoot.querySelector(".stepper-progress");
            progressBar.style.setProperty("--pb", `${(this.activeStep / this.stepsCount) * 100}%`);
        }
    }
    static get watchers() { return {
        "activeStep": [{
                "handleActiveStep": 0
            }]
    }; }
};
Stepper.style = stepperCss();

export { Stepper as ifx_stepper };
//# sourceMappingURL=ifx-stepper.entry.js.map

//# sourceMappingURL=ifx-stepper.entry.js.map