export declare class Indicator {
    el: any;
    filteredNumber: string | number;
    inverted: boolean;
    ariaLabel: string | null;
    variant: string;
    number: number;
    handleNumber(): void;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    componentWillUpdate(): void;
    render(): any;
}
