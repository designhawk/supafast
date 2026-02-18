export declare class Accordion {
    el: HTMLElement;
    autoCollapse: boolean;
    componentDidLoad(): Promise<void>;
    onItemOpen(event: CustomEvent): Promise<void>;
    render(): any;
}
