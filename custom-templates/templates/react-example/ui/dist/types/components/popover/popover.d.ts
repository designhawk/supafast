import { EventEmitter } from '../../stencil-public-runtime';
export declare class Popover {
    el: HTMLElement;
    popoverVisible: boolean;
    computedArrowPosition: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
        transform?: string;
    };
    /** Title text displayed in the popover header */
    popoverTitle: string;
    /** Body text displayed in the popover content */
    text: string;
    /** Position of the popover relative to the trigger element */
    position: 'bottom-start' | 'top-start' | 'left' | 'bottom-end' | 'top-end' | 'right' | 'bottom' | 'top' | 'auto';
    /** Whether the popover is disabled */
    disabled: boolean;
    /** Whether the popover is initially open */
    open: boolean;
    /** Accessible label for the popover */
    ariaLabel: string | null;
    /** Emitted when the popover is opened */
    ifxOpen: EventEmitter<{
        trigger: HTMLElement | null;
    }>;
    ifxClose: EventEmitter;
    private static readonly GAP;
    popoverEl: HTMLElement;
    triggerEl: HTMLElement;
    private lastOpenTrigger;
    openChanged(newValue: boolean): void;
    componentDidLoad(): Promise<void>;
    setupTriggerElement(): void;
    disconnectedCallback(): void;
    cleanupTriggerListeners(): void;
    getViewportSpace(triggerRect: DOMRect): {
        above: number;
        below: number;
        left: number;
        right: number;
    };
    resetPositioningStyles(): void;
    positionPopover(): void;
    getBestPosition(popoverRect: DOMRect, space: any): 'top' | 'bottom' | 'left' | 'right';
    validateAndAdjustPosition(desiredPosition: string, popoverRect: DOMRect, space: any): 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    calculatePosition(triggerRect: DOMRect, popoverRect: DOMRect, position: string): {
        popoverStyle: any;
        arrowStyle: any;
    };
    positionChanged(): void;
    /** Programmatically show the popover */
    show(): Promise<void>;
    /** Programmatically hide the popover */
    hide(): Promise<void>;
    /** Programmatically toggle the popover visibility */
    toggle(): Promise<void>;
    onClick: (event: Event) => void;
    onCloseClick: (event: Event) => void;
    render(): any;
}
