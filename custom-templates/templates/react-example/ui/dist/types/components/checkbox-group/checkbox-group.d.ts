export declare class CheckboxGroup {
    private errorStates;
    el: HTMLElement;
    alignment: "horizontal" | "vertical";
    size: string;
    showGroupLabel: boolean;
    groupLabelText: string;
    showCaption: boolean;
    captionText: string;
    showCaptionIcon: boolean;
    required: boolean;
    hasErrors: boolean;
    handleCheckboxError(event: CustomEvent): void;
    setGroupError(error: boolean): Promise<void>;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    handleSlotChange: () => void;
    private initializeState;
    private updateHasErrors;
    render(): any;
}
