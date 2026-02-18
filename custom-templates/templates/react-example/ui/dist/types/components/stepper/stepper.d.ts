import { type EventEmitter } from "../../stencil-public-runtime";
export declare class Stepper {
    el: HTMLElement;
    ifxChange: EventEmitter;
    activeStep: number;
    indicatorPosition?: "left" | "right";
    showStepNumber?: boolean;
    variant?: "default" | "compact" | "vertical";
    ariaLabel: string | null;
    ariaCurrent: string | null;
    stepsCount: number;
    shouldEmitEvent: boolean;
    emittedByClick: boolean;
    onStepChange(event: CustomEvent): void;
    handleActiveStep(newStep: number, oldStep: number): void;
    emitIfxChange(activeStep: number, previousActiveStep: number): void;
    getSteps(): NodeListOf<HTMLIfxStepElement>;
    addStepIdsToStepsAndCountSteps(): void;
    setActiveStep(stepId: number, setByClick?: boolean): void;
    setStepsBeforeActiveToComplete(): void;
    syncIfxSteps(): void;
    setInitialActiveStep(): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    componentWillUpdate(): void;
    render(): any;
    componentDidRender(): void;
}
