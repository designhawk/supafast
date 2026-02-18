import { type EventEmitter } from "../../stencil-public-runtime";
export interface ActionListItemClickEvent {
    value?: string;
    href?: string;
    target?: string;
    component?: ActionListItem;
}
export declare class ActionListItem {
    host: HTMLElement;
    /**
     * The title text displayed in the item
     */
    itemTitle: string;
    /**
     * The description text displayed below the title
     */
    description?: string;
    /**
     * Value associated with this item
     */
    value?: string;
    /**
     * URL to navigate to when item is clicked
     */
    href?: string;
    /**
     * Target for the link navigation
     * @default '_self'
     */
    target: string;
    /**
     * Controls whether the item is disabled
     * @default false
     */
    disabled: boolean;
    /**
     * Aria label for accessibility support
     */
    itemAriaLabel?: string;
    /**
     * Event emitted when the main item area is clicked
     */
    ifxActionListItemClick: EventEmitter<ActionListItemClickEvent>;
    onDisabledChange(): void;
    private handleMainClick;
    private handleLeadingClick;
    private handleTrailingClick;
    private isInteractiveElement;
    private handleMainKeyDown;
    private handleLeadingKeyDown;
    private handleTrailingKeyDown;
    private hasSlotContent;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    private updateSlotElementsDisabledState;
    private setElementDisabledState;
    render(): any;
}
