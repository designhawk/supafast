import { type EventEmitter } from "../../stencil-public-runtime";
export type ChangeEvent = {
    oldValue: string;
    newValue: string;
};
export declare class ContentSwitcher {
    el: HTMLElement;
    items: Element[];
    activeIndex: number;
    hoverIndex: number;
    focusIndex: number;
    dividers: Element[];
    ifxChange: EventEmitter<ChangeEvent>;
    private eventHandlers;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    disconnectedCallback(): void;
    /**
     * Initialize the dividers between items.
     */
    initializeDividers(): void;
    /**
     * Add event listeners for each item.
     */
    addEventListeners(): void;
    /**
     * Remove all event listeners.
     */
    removeEventListeners(): void;
    ensureSingleSelectedItem(): void;
    /**
     * Handle hover events on an item.
     * @param index - Index of the item.
     * @param isActive - Whether the item is hovered.
     */
    handleHover(index: number, isActive: boolean): void;
    /**
     * Handle hover events on an item.
     * @param index - Index of the item.
     * @param isActive - Whether the item is focused.
     */
    handleFocus(index: number, isActive: boolean): void;
    /**
     * Update visibility of dividers adjacent to a specific item.
     * @param itemIndex - Index of the item.
     */
    updateDividersOfItem(itemIndex: number): void;
    /**
     * Update visibility of a specific divider.
     * @param dividerIndex - Index of the divider.
     */
    updateDividerVisibility(dividerIndex: number): void;
    /**
     * Set the visibility of a specific divider.
     * @param dividerIndex - Index of the divider.
     * @param hidden - Whether the divider should be hidden.
     */
    setDividerVisibility(dividerIndex: number, hidden: boolean): void;
    /**
     * Select a specific item.
     * @param itemIndex - Index of the item to be selected.
     */
    selectItem(itemIndex: number): void;
    /**
     * Get the value property of the item at a specific index.
     * Falls back to the index if no value is set.
     *
     * @param index - Index of the item.
     * @returns The value of the item.
     */
    getValueOfItem(index: number): string;
    render(): any;
}
