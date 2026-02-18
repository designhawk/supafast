import { type EventEmitter } from "../../stencil-public-runtime";
export declare class DatePicker {
    private inputId;
    el: HTMLElement;
    size: string;
    error: boolean;
    success: boolean;
    disabled: boolean;
    ariaLabel: string | null;
    value: string;
    type: string;
    max: string;
    min: string;
    required: boolean;
    label: string;
    caption: string;
    autocomplete: string;
    internals: ElementInternals;
    ifxDate: EventEmitter;
    getInput(): HTMLInputElement;
    getDate(e: any): void;
    handleIconKeyDown(e: KeyboardEvent): void;
    isFirefox(): boolean;
    setFireFoxClasses(): void;
    componentDidLoad(): Promise<void>;
    componentWillUpdate(): void;
    render(): any;
}
