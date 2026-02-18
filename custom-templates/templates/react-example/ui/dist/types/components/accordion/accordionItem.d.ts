import { type EventEmitter } from "../../stencil-public-runtime";
export declare class AccordionItem {
    el: any;
    caption: string;
    open: boolean;
    AriaLevel: number;
    internalOpen: boolean;
    ifxOpen: EventEmitter;
    ifxClose: EventEmitter;
    private contentEl;
    private titleEl;
    private resizeObserver;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    openChanged(newValue: boolean): void;
    toggleOpen(): void;
    openAccordionItem(): void;
    getInnerContentWrapper(): any;
    attachResizeObserver(): void;
    handleKeydown(ev: KeyboardEvent): void;
    checkSlotContent(): void;
    render(): any;
}
