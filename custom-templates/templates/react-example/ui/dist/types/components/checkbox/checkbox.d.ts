import { type EventEmitter } from "../../stencil-public-runtime";
export declare class Checkbox {
    private inputElement;
    el: any;
    disabled: boolean;
    checked: boolean;
    error: boolean;
    size: string;
    indeterminate: boolean;
    value: string;
    internalChecked: boolean;
    internalIndeterminate: boolean;
    internals: ElementInternals;
    ifxChange: EventEmitter;
    ifxError: EventEmitter;
    handleCheckbox(): void;
    isChecked(): Promise<boolean>;
    toggleCheckedState(newVal: boolean): Promise<void>;
    valueChanged(newValue: boolean, oldValue: boolean): void;
    errorChanged(newValue: boolean, oldValue: boolean): void;
    indeterminateChanged(newValue: boolean, oldValue: boolean): void;
    handleKeydown(event: any): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    componentDidRender(): void;
    /**
     * Callback for form association.
     * Called whenever the form is reset.
     */
    getCheckedClassName(): "" | "error" | "checked" | "checked error";
    render(): any;
}
