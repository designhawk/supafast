export declare class ProgressBar {
    el: HTMLElement;
    value: number;
    size: string;
    showLabel: boolean;
    internalValue: number;
    valueChanged(newValue: number, oldValue: number): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    render(): any;
}
