import { type EventEmitter } from "../../stencil-public-runtime";
type CloseEventTrigger = "CLOSE_BUTTON" | "ESCAPE_KEY" | "BACKDROP";
export interface BeforeCloseEventDetail {
    trigger: CloseEventTrigger;
}
export declare class IfxModal {
    opened?: boolean;
    showModal: boolean;
    caption: string;
    captionAriaLabel: string | null;
    closeOnOverlayClick: boolean;
    ifxOpen: EventEmitter;
    ifxClose: EventEmitter;
    variant: "default" | "alert-brand" | "alert-danger";
    size: "s" | "m" | "l";
    alertIcon: string;
    okButtonLabel: string;
    cancelButtonLabel: string;
    closeButtonAriaLabel: string | null;
    hostElement: HTMLElement;
    slotButtonsPresent: boolean;
    showCloseButton: boolean;
    private modalContainer;
    private focusableElements;
    private closeButton;
    private resizeTimeout;
    handleResize: () => void;
    componentDidLoad(): Promise<void>;
    disconnectedCallback(): void;
    componentWillRender(): void;
    handleComponentOverflow(): Promise<void>;
    getFirstFocusableElement(): HTMLElement | null;
    getLastFocusableElement(): HTMLElement | null;
    handleTopFocus: () => void;
    handleBottomFocus: () => void;
    attemptFocus(element: HTMLElement | null): void;
    open(): void;
    close(): void;
    handleKeypress: (event: KeyboardEvent) => void;
    doBeforeClose(trigger: CloseEventTrigger): void;
    openedChanged(newValue: any): void;
    handleOverlayClick(): void;
    handleContentUpdate(e: any): void;
    handleButtonsSlotChange(e: any): void;
    isModalContentContainerHeightReachedViewport(): Promise<unknown>;
    render(): any;
}
export {};
