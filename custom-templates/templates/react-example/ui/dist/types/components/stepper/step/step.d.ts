import type { StepperState } from "../interfaces";
export declare class Step {
    complete?: boolean;
    disabled?: boolean;
    error?: boolean;
    lastStep: boolean;
    stepId: number;
    stepperState: StepperState;
    active: boolean;
    clickable: boolean;
    onStepChange(event: CustomEvent): void;
    updateCurrentStep(newStepperState: any): void;
    updateErrorState(): void;
    handleStepClick(): void;
    handleStepKeyDown(event: KeyboardEvent): void;
    stopOnClickPropogation(event: Event): void;
    render(): any;
}
