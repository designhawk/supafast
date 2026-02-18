import { type EventEmitter } from "../../stencil-public-runtime";
export declare class RadioButton {
    el: HTMLElement;
    disabled: boolean;
    value: string;
    error: boolean;
    size: "s" | "m";
    name: string;
    checked: boolean;
    internalChecked: boolean;
    hasSlot: boolean;
    isChecked(): Promise<boolean>;
    private inputElement;
    private fallbackInput;
    ifxChange: EventEmitter;
    ifxError: EventEmitter;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    handleCheckedChange(newValue: boolean): void;
    updateFormValue(): void;
    errorChanged(newValue: boolean, oldValue: boolean): void;
    handleRadioButtonClick(event: Event): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleExternalChange(event: Event): void;
    render(): any;
}
