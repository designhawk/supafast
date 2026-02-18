export declare class Tooltip {
    el: HTMLElement;
    tooltipVisible: boolean;
    header: string;
    text: string;
    position: 'bottom-start' | 'top-start' | 'left' | 'bottom-end' | 'top-end' | 'right' | 'bottom' | 'top' | 'auto';
    internalPosition: 'bottom-start' | 'top-start' | 'left' | 'bottom-end' | 'top-end' | 'right' | 'bottom' | 'top' | 'auto';
    ariaLabel: string | null;
    variant: 'compact' | 'dismissible' | 'extended';
    icon: string;
    appendToBody: boolean;
    private tooltipContainer;
    tooltipEl: HTMLElement;
    referenceEl: HTMLElement;
    popperInstance: any;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    initializePopper(): void;
    determineBestPosition(): "top-start" | "top-end" | "bottom-start" | "bottom-end";
    positionChanged(newVal: any): void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    disconnectedCallback(): void;
    onClick: () => void;
    onDismissClick: () => void;
    render(): any;
}
